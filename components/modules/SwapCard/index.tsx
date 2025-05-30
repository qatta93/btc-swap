"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import CardSide from "@/components/modules/CardSide";
import { Button } from "@/components/atoms/Button";
import { cryptoOptions } from "@/data/cryptoOptions";
import { useSwapLogic } from "@/hooks/useSwapLogic";
import { useSwapCardAnimation } from "./useSwapCardAnimation";
import SwapConfirmationModal from "@/components/modules/ConfirmationModal";
import SwapSuccessModal from "@/components/modules/SuccessModal";
import { SWAP_ANIMATION_DURATION } from "./config";

export default function SwapCard() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    sellAmount,
    buyAmount,
    handleSellChange,
    handleBuyChange,
    isReversed,
    toggleSwapDirection,
    rate,
    error,
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    isSuccessConfirmationModalOpen,
    setIsSuccessConfirmationModalOpen,
  } = useSwapLogic();

  const { isFlipped, isFlipping, iconRotation, handleSwapAnimation } =
    useSwapCardAnimation(toggleSwapDirection);

  const sellCrypto = cryptoOptions[1];
  const buyCrypto = cryptoOptions[0];

  const rateUsdToBtc = isReversed ? rate ?? 0 : rate ? 1 / rate : 0;
  const rateBtcToUsd = isReversed ? (rate ? 1 / rate : 0) : rate ?? 0;

  const numericSellAmount = parseFloat(sellAmount);
  const isValidTrade = !isNaN(numericSellAmount) && numericSellAmount > 0;

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 1000);
  };

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
            sellAmount={sellAmount}
            buyAmount={buyAmount}
            sellCryptoOption={cryptoOptions[1]}
            buyCryptoOption={cryptoOptions[0]}
            handleSwap={handleSwapAnimation}
            isFlipping={isFlipping}
            iconRotation={iconRotation}
            setSellAmount={handleSellChange}
            setBuyAmount={handleBuyChange}
            rateSell={rateUsdToBtc}
            rateBuy={rateBtcToUsd}
          />
          <div className="absolute w-full h-full rotateX-180 backface-hidden">
            <CardSide
              isFront={false}
              sellAmount={sellAmount}
              buyAmount={buyAmount}
              sellCryptoOption={cryptoOptions[0]}
              buyCryptoOption={cryptoOptions[1]}
              handleSwap={handleSwapAnimation}
              isFlipping={isFlipping}
              iconRotation={iconRotation}
              setSellAmount={handleBuyChange}
              setBuyAmount={handleSellChange}
              rateSell={rateBtcToUsd}
              rateBuy={rateUsdToBtc}
            />
          </div>
        </motion.div>
      </div>

      <div className="p-5 relative">
        <Button
          onClick={handleButtonClick}
          disabled={!isValidTrade || isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
              Loading...
            </span>
          ) : (
            "Get started"
          )}
        </Button>
        {error && (
          <p className="absolute bottom-[2px] w-full left-1/2 transform -translate-x-1/2 text-xs text-error-500 dark:text-error-400 text-center mt-2">
            Error fetching rate. Please try later.
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
