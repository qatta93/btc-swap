import { create } from "zustand";
import {
  trackExchangeRateFetch,
  trackApiError,
  trackAmountInput,
  trackSwapDirectionToggle,
} from "@/lib/analytics";
import type { CryptoId } from "@/types/crypto";

interface RateCache {
  [key: string]: {
    rate: number;
    timestamp: number;
    error?: string;
  };
}

const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes
const globalRateCache: RateCache = {};

interface SwapState {
  sellAmount: string;
  buyAmount: string;
  isReversed: boolean;

  rate: number | null;
  error: string | null;
  isRateLoading: boolean;

  isModalOpen: boolean;
  isSuccessModalOpen: boolean;

  setSellAmount: (value: string) => void;
  setBuyAmount: (value: string) => void;
  toggleDirection: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsSuccessModalOpen: (isOpen: boolean) => void;
  handleConfirm: () => void;
  
  getFromId: () => CryptoId;
  getToId: () => CryptoId;
  fetchExchangeRate: () => Promise<void>;
}

export const useSwapStore = create<SwapState>((set, get) => ({
  sellAmount: "",
  buyAmount: "",
  isReversed: false,
  rate: null,
  error: null,
  isRateLoading: false,
  isModalOpen: false,
  isSuccessModalOpen: false,

  getFromId: () => {
    return get().isReversed ? "usd" : "btc";
  },

  getToId: () => {
    return get().isReversed ? "btc" : "usd";
  },

  setSellAmount: (value: string) => {
    set({ sellAmount: value });

    const { rate, isReversed } = get();
    const val = parseFloat(value);

    if (!isNaN(val) && rate) {
      const result = val / rate;
      const roundedTo = result > 1 ? 3 : 6;
      const formattedResult = result.toFixed(roundedTo).replace(/\.?0+$/, "");

      set({ buyAmount: formattedResult });

      const currencyId = isReversed ? "usd" : "btc";
      trackAmountInput(currencyId, value, true);
    } else {
      set({ buyAmount: "" });
    }
  },

  setBuyAmount: (value: string) => {
    set({ buyAmount: value });

    const { rate, isReversed } = get();
    const val = parseFloat(value);

    if (!isNaN(val) && rate) {
      const result = val * rate;
      const roundedTo = result > 1 ? 3 : 6;
      const formattedResult = result.toFixed(roundedTo).replace(/\.?0+$/, "");

      set({ sellAmount: formattedResult });

      const currencyId = isReversed ? "btc" : "usd";
      trackAmountInput(currencyId, value, false);
    } else {
      set({ sellAmount: "" });
    }
  },

  toggleDirection: () => {
    const { isReversed } = get();

    const fromCurrency = isReversed ? "usd" : "btc";
    const toCurrency = isReversed ? "btc" : "usd";

    set({ isReversed: !isReversed });
    trackSwapDirectionToggle(fromCurrency, toCurrency);
  },

  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),

  setIsSuccessModalOpen: (isOpen: boolean) =>
    set({ isSuccessModalOpen: isOpen }),

  handleConfirm: () => set({ isSuccessModalOpen: true }),
  
  fetchExchangeRate: async () => {
    const state = get();
    const fromId = state.getFromId();
    const toId = state.getToId();
    
    if (!fromId || !toId) return;

    if (fromId === toId) {
      set({ rate: 1, error: null, isRateLoading: false });
      return;
    }

    const cacheKey = `${fromId}-${toId}`;
    const cachedData = globalRateCache[cacheKey];
    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION) {
      if (cachedData.error) {
        set({
          error: cachedData.error,
          rate: null,
          isRateLoading: false,
        });
      } else {
        set({
          rate: cachedData.rate,
          error: null,
          isRateLoading: false,
        });
      }
      return;
    }

    set({ isRateLoading: true });

    try {
      const fromGecko = mapToCoinGeckoId(fromId);
      const toGecko = mapToCoinGeckoSymbol(toId);

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromGecko}&vs_currencies=${toGecko}`
      );

      if (!res.ok) {
        const error = "CoinGecko error";
        trackApiError("coingecko", error);
        throw new Error(error);
      }

      const data = await res.json();
      const directRate = data?.[fromGecko]?.[toGecko];

      if (!directRate) {
        const error = "Invalid CoinGecko response";
        trackApiError("coingecko", error);
        throw new Error(error);
      }

      globalRateCache[cacheKey] = {
        rate: directRate,
        timestamp: Date.now(),
      };

      set({
        rate: directRate,
        error: null,
        isRateLoading: false,
      });
      trackExchangeRateFetch(fromId, toId, true);
    } catch (err: any) {
      console.warn("CoinGecko failed:", err.message);

      try {
        const res = await fetch(
          `https://api.coinbase.com/v2/exchange-rates?currency=${fromId.toUpperCase()}`
        );

        if (!res.ok) {
          const error = "Coinbase error";
          trackApiError("coinbase", error);
          throw new Error(error);
        }

        const data = await res.json();
        const fallbackRate = data?.data?.rates?.[toId.toUpperCase()];

        if (!fallbackRate) {
          const error = "Coinbase missing rate";
          trackApiError("coinbase", error);
          throw new Error(error);
        }

        globalRateCache[cacheKey] = {
          rate: Number(fallbackRate),
          timestamp: Date.now(),
        };

        set({
          rate: Number(fallbackRate),
          error: null,
          isRateLoading: false,
        });
        trackExchangeRateFetch(fromId, toId, true);
      } catch (fallbackErr: any) {
        console.error("Fallback also failed:", fallbackErr.message);

        globalRateCache[cacheKey] = {
          rate: 0,
          timestamp: Date.now(),
          error: fallbackErr.message,
        };

        set({
          error: fallbackErr.message,
          rate: null,
          isRateLoading: false,
        });
        trackExchangeRateFetch(fromId, toId, false, fallbackErr.message);
      }
    }
  }
}));

function mapToCoinGeckoId(id: CryptoId): string {
  const map: Record<CryptoId, string> = {
    btc: "bitcoin",
    usd: "usd",
  };
  return map[id];
}

function mapToCoinGeckoSymbol(id: CryptoId): string {
  const map: Record<CryptoId, string> = {
    btc: "btc",
    usd: "usd",
  };
  return map[id];
}
