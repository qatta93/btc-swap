"use client";

import { useEffect } from "react";
import { useSwapStore } from "@/stores/useSwapStore";
import { SWAP_ANIMATION_DURATION } from "@/components/modules/SwapCard/config";
import { delay } from "framer-motion";

export function useSwapLogic() {
  const {
    sellAmount,
    buyAmount,
    isReversed,
    rate,
    error,
    isRateLoading,
    isModalOpen,
    isSuccessModalOpen,
    setSellAmount,
    setBuyAmount,
    toggleDirection,
    setIsModalOpen,
    setIsSuccessModalOpen,
    handleConfirm,
    getFromId,
    getToId,
    fetchExchangeRate
  } = useSwapStore();

  useEffect(() => {
    fetchExchangeRate();
    
    const pollInterval = setInterval(() => {
      fetchExchangeRate();
    }, 60000);
    
    return () => {
      clearInterval(pollInterval);
    };
  }, [isReversed, fetchExchangeRate]);

  const toggleSwapDirection = () => {
    const currentSellAmount = sellAmount;
    const currentBuyAmount = buyAmount;
    
    toggleDirection();
    
    const cancel = delay(() => {
      setSellAmount(currentBuyAmount);
      setBuyAmount(currentSellAmount);
    }, SWAP_ANIMATION_DURATION * 1000 - 300);
  };

  return {
    sellAmount,
    buyAmount,
    isReversed,
    rate,
    error,
    isRateLoading,
    isModalOpen,
    isSuccessConfirmationModalOpen: isSuccessModalOpen,
    
    handleSellChange: setSellAmount,
    handleBuyChange: setBuyAmount,
    toggleSwapDirection,
    setIsModalOpen,
    setIsSuccessConfirmationModalOpen: setIsSuccessModalOpen,
    handleConfirm,
    
    fromId: getFromId(),
    toId: getToId()
  };
}
