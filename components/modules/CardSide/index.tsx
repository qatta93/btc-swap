"use client";

import React, { memo } from "react";
import { CurrencyInput } from "@/components/modules/CurrencyInput/CurrencyInput";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import type { CryptoOption } from "@/types/crypto";
import { useCryptoStore } from "@/stores/useCryptoStore";
import { useSwapLogic } from "@/hooks/useSwapLogic";

interface CardSideProps {
  isFront: boolean;
  sellCryptoOption: CryptoOption;
  buyCryptoOption: CryptoOption;
  isFlipping: boolean;
  iconRotation: number;
  handleSwap: () => void;
}

export const CardSide = memo(function CardSide({
  isFront,
  sellCryptoOption,
  buyCryptoOption,
  isFlipping,
  iconRotation,
  handleSwap,
}: CardSideProps) {
  const {
    sellAmount,
    buyAmount,
    handleSellChange,
    handleBuyChange,
    rate,
    isRateLoading,
  } = useSwapLogic();

  const swapLabels = useCryptoStore((state) => state.content?.swapCard);

  const rateSell = isFront 
    ? (rate ? 1 / rate : 0) 
    : rate ?? 0;
  
  const rateBuy = isFront 
    ? rate ?? 0 
    : (rate ? 1 / rate : 0);

  const handleTopChange = (value: string) => {
    if (isFront) {
      handleSellChange(value);
    } else {
      handleBuyChange(value);
    }
  };

  const handleBottomChange = (value: string) => {
    if (isFront) {
      handleBuyChange(value);
    } else {
      handleSellChange(value);
    }
  };

  return (
    <div className="absolute w-full h-full p-5 backface-hidden">
      <CurrencyInput
        crypto={sellCryptoOption}
        label={swapLabels?.sell as string}
        value={isFront ? sellAmount : buyAmount}
        onChange={handleTopChange}
        conversionRate={rateSell}
        targetCurrencySymbol={buyCryptoOption.symbol}
        isFlipping={isFlipping}
        isRateLoading={isRateLoading}
      />

      <div className="flex justify-center relative z-10 my-[4px]">
        <motion.button
          onClick={handleSwap}
          className="bg-white border border-gray-200 rounded-full p-2 shadow-sm dark:bg-dark"
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          disabled={isFlipping}>
          <motion.div
            animate={{ rotate: iconRotation }}
            transition={{ duration: 0.3 }}>
            <ArrowUpDown className="h-5 w-5 text-gray-400" />
          </motion.div>
        </motion.button>
      </div>

      <CurrencyInput
        crypto={buyCryptoOption}
        label={swapLabels?.buy as string}
        value={isFront ? buyAmount : sellAmount}
        onChange={handleBottomChange}
        conversionRate={rateBuy}
        targetCurrencySymbol={sellCryptoOption.symbol}
        isFlipping={isFlipping}
        isRateLoading={isRateLoading}
      />
    </div>
  );
});

export default CardSide;
