"use client";

import React from "react";
import { CurrencyInput } from "@/components/modules/CurrencyInput/CurrencyInput";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import type { CryptoOption } from "@/types/crypto";
import { useCardSide } from "./useCardSide";
import { useCryptoStore } from "@/stores/useCryptoStore";

interface CardSideProps {
  isFront: boolean;
  sellAmount: string;
  buyAmount: string;
  rateSell: number;
  rateBuy: number;
  sellCryptoOption: CryptoOption;
  buyCryptoOption: CryptoOption;
  isFlipping: boolean;
  iconRotation: number;
  setSellAmount: (val: string) => void;
  setBuyAmount: (val: string) => void;
  handleSwap: () => void;
}

export const CardSide = ({
  isFront,
  sellAmount,
  buyAmount,
  sellCryptoOption,
  buyCryptoOption,
  rateSell,
  rateBuy,
  isFlipping,
  iconRotation,
  setSellAmount,
  setBuyAmount,
  handleSwap,
}: CardSideProps) => {
  const { handleTopChange, handleBottomChange } = useCardSide({
    isFront,
    setSellAmount,
    setBuyAmount,
  });

  const swapLabels = useCryptoStore((state) => state.content?.swapCard);

  return (
    <div className="absolute w-full h-full p-5 backface-hidden">
      <CurrencyInput
        crypto={sellCryptoOption}
        label={swapLabels?.sell as string}
        value={sellAmount}
        onChange={handleTopChange}
        conversionRate={rateSell}
        targetCurrencySymbol={buyCryptoOption.symbol}
        isFlipping={isFlipping}
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
        value={buyAmount}
        onChange={handleBottomChange}
        conversionRate={rateBuy}
        targetCurrencySymbol={sellCryptoOption.symbol}
        isFlipping={isFlipping}
      />
    </div>
  );
};

export default CardSide;
