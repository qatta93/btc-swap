"use client";

import { useCallback, useState } from "react";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { delay } from "framer-motion";
import { SWAP_ANIMATION_DURATION } from "@/components/modules/SwapCard/config";

export const useSwapLogic = () => {
    const [sellAmount, setSellAmount] = useState("");
    const [buyAmount, setBuyAmount] = useState("");
    const [isReversed, setIsReversed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessConfirmationModalOpen, setIsSuccessConfirmationModalOpen] = useState(false);

    const fromId = isReversed ? "usd" : "btc";
    const toId = isReversed ? "btc" : "usd";
    const { rate, error } = useExchangeRate(fromId, toId);
    const exchangeRate = rate as number;

    const handleSellChange = useCallback(
      (value: string) => {
        setSellAmount(value);
        const val = parseFloat(value);
        if (!isNaN(val) && exchangeRate) {
          const result = val / exchangeRate;
          const roundedTo = result > 1 ? 3 : 6;

          setBuyAmount(result.toFixed(roundedTo).replace(/\.?0+$/, ""));
        } else {
          setBuyAmount("");
        }
      },
      [exchangeRate]
    );

    const handleBuyChange = useCallback(
      (value: string) => {
        setBuyAmount(value);
        const val = parseFloat(value);
        if (!isNaN(val) && exchangeRate) {
          const result = val * exchangeRate;
          const roundedTo = result > 1 ? 3 : 6;

          setSellAmount(result.toFixed(roundedTo).replace(/\.?0+$/, ""));
        } else {
          setSellAmount("");
        }
      },
      [exchangeRate]
    );

    const toggleSwapDirection = useCallback(() => {
      setIsReversed((prev) => !prev);
      const cancel = delay(() => {
        setSellAmount(buyAmount);
        setBuyAmount(sellAmount);
      }, SWAP_ANIMATION_DURATION * 1000 - 300);
    }, [sellAmount, buyAmount]);

    const handleConfirm = () => {
        setIsSuccessConfirmationModalOpen(true);
    }

    return {
      sellAmount,
      buyAmount,
      isReversed,
      handleSellChange,
      handleBuyChange,
      toggleSwapDirection,
      rate,
      error,
      handleConfirm,
      isModalOpen,
      setIsModalOpen,
      isSuccessConfirmationModalOpen,
      setIsSuccessConfirmationModalOpen,
    };
};
