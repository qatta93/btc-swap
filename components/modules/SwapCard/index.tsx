"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import CardSide from "@/components/modules/CardSide";
import { Button } from "@/components/atoms/Button";
import { cryptoOptions } from "@/data/cryptoOptions";
import { useSwapLogic } from "@/hooks/useSwapLogic";
import { useSwapCardAnimation } from "./useSwapCardAnimation";
import SwapConfirmationModal from "@/components/modules/ConfirmationModal";
import SwapSuccessModal from "@/components/modules/SuccessModal";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { trackSwapConfirmationOpen, trackPageView } from "@/lib/analytics";

export default function SwapCard() {
  useEffect(() => {
    trackPageView('/', 'BTC Swap');
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    sellAmount,
    buyAmount,
    isReversed,
    toggleSwapDirection,
    rate,
    error,
    isRateLoading,
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    isSuccessConfirmationModalOpen,
    setIsSuccessConfirmationModalOpen,
    fromId,
    toId
  } = useSwapLogic();

  const { isFlipped, isFlipping, iconRotation, handleSwapAnimation } =
    useSwapCardAnimation(toggleSwapDirection);

  const numericSellAmount = parseFloat(sellAmount);
  const isValidTrade = !isNaN(numericSellAmount) && numericSellAmount > 0 && !isRateLoading;

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
      trackSwapConfirmationOpen(fromId, toId, sellAmount, buyAmount);
    }, 1000);
  };

  const content = useCryptoStore((state) => state.content);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-dark mob:min-h-[380px] flex flex-col justify-between">
      <div className="relative perspective-1000">
        <motion.div
          className="relative preserve-3d"
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ height: "280px" }}>
          <CardSide
            isFront={true}
            sellCryptoOption={cryptoOptions[1]}
            buyCryptoOption={cryptoOptions[0]}
            handleSwap={handleSwapAnimation}
            isFlipping={isFlipping}
            iconRotation={iconRotation}
          />
          <div className="absolute w-full h-full rotateX-180 backface-hidden">
            <CardSide
              isFront={false}
              sellCryptoOption={cryptoOptions[0]}
              buyCryptoOption={cryptoOptions[1]}
              handleSwap={handleSwapAnimation}
              isFlipping={isFlipping}
              iconRotation={iconRotation}
            />
          </div>
        </motion.div>
      </div>

      <div className="p-5 relative">
        <Button
          onClick={handleButtonClick}
          disabled={!isValidTrade || isLoading || isRateLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
              {content?.general.loading}
            </span>
          ) : isRateLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
              {"Loading rates..."}
            </span>
          ) : (
            content?.swapCard.button
          )}
        </Button>
        {error && (
          <p className="absolute bottom-[2px] w-full left-1/2 transform -translate-x-1/2 text-xs text-error-500 dark:text-error-400 text-center mt-2">
            {content?.general.errors.fetchError}
          </p>
        )}
      </div>

      <SwapConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        sellAmount={sellAmount}
        buyAmount={buyAmount}
        isReversed={isReversed}
      />

      <SwapSuccessModal
        isOpen={isSuccessConfirmationModalOpen}
        onClose={() => setIsSuccessConfirmationModalOpen(false)}
        sellAmount={sellAmount}
        buyAmount={buyAmount}
        isReversed={isReversed}
      />
    </div>
  );
}
