"use client";

import { useCallback, useState } from "react";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { delay } from "framer-motion";
import { SWAP_ANIMATION_DURATION } from "@/components/modules/SwapCard/config";
import { trackAmountInput, trackSwapDirectionToggle } from "@/lib/analytics";

export const useSwapLogic = () => {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessConfirmationModalOpen, setIsSuccessConfirmationModalOpen] =
    useState(false);

  const fromId = isReversed ? "usd" : "btc";
  const toId = isReversed ? "btc" : "usd";
  const {
    rate,
    error,
    isLoading: isRateLoading,
  } = useExchangeRate(fromId, toId);
  const exchangeRate = rate as number;

  const handleSellChange = useCallback(
    (value: string) => {
      setSellAmount(value);
      const val = parseFloat(value);
      if (!isNaN(val) && exchangeRate) {
        const result = val / exchangeRate;
        const roundedTo = result > 1 ? 3 : 6;

        setBuyAmount(result.toFixed(roundedTo).replace(/\.?0+$/, ""));

        const currencyId = isReversed ? "usd" : "btc";
        trackAmountInput(currencyId, value, true);
      } else {
        setBuyAmount("");
      }
    },
    [exchangeRate, isReversed]
  );

  const handleBuyChange = useCallback(
    (value: string) => {
      setBuyAmount(value);
      const val = parseFloat(value);
      if (!isNaN(val) && exchangeRate) {
        const result = val * exchangeRate;
        const roundedTo = result > 1 ? 3 : 6;

        setSellAmount(result.toFixed(roundedTo).replace(/\.?0+$/, ""));

        const currencyId = isReversed ? "btc" : "usd";
        trackAmountInput(currencyId, value, false);
      } else {
        setSellAmount("");
      }
    },
    [exchangeRate, isReversed]
  );

  const toggleSwapDirection = useCallback(() => {
    const fromCurrency = isReversed ? "usd" : "btc";
    const toCurrency = isReversed ? "btc" : "usd";

    setIsReversed((prev) => !prev);

    trackSwapDirectionToggle(fromCurrency, toCurrency);

    const cancel = delay(() => {
      setSellAmount(buyAmount);
      setBuyAmount(sellAmount);
    }, SWAP_ANIMATION_DURATION * 1000 - 300);
  }, [sellAmount, buyAmount, isReversed]);

  const handleConfirm = () => {
    setIsSuccessConfirmationModalOpen(true);
  };

  return {
    sellAmount,
    buyAmount,
    isReversed,
    handleSellChange,
    handleBuyChange,
    toggleSwapDirection,
    rate,
    error,
    isRateLoading,
    handleConfirm,
    isModalOpen,
    setIsModalOpen,
    isSuccessConfirmationModalOpen,
    setIsSuccessConfirmationModalOpen,
  };
};
