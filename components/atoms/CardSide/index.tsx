"use client";

import React from "react";
import { CurrencyInput } from "@/components/modules/CurrencyInput/CurrencyInput";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import type { CryptoOption } from "@/types/crypto";
import { useCardSide } from "./useCardSide";

interface CardSideProps {
  isFront: boolean;
  sellAmount: string;
  buyAmount: string;
  rateBaseToQuote: number;
  rateQuoteToBase: number;
  sellCrypto: CryptoOption;
  buyCrypto: CryptoOption;
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
  sellCrypto,
  buyCrypto,
  rateBaseToQuote,
  rateQuoteToBase,
  isFlipping,
  iconRotation,
  setSellAmount,
  setBuyAmount,
  handleSwap,
}: CardSideProps) => {
  const topAmount = isFront ? sellAmount : buyAmount;
  const bottomAmount = isFront ? buyAmount : sellAmount;
  const topCrypto = isFront ? sellCrypto : buyCrypto;
  const bottomCrypto = isFront ? buyCrypto : sellCrypto;

  const { handleTopChange, handleBottomChange } = useCardSide({
    isFront,
    setSellAmount,
    setBuyAmount,
  });

  const actualTopConversionRate = isFront ? rateBaseToQuote : rateQuoteToBase;
  const actualBottomConversionRate = isFront
    ? rateQuoteToBase
    : rateBaseToQuote;

  return (
    <div className="absolute w-full h-full p-5 backface-hidden">
      <CurrencyInput
        crypto={topCrypto}
        label="Sell"
        value={topAmount}
        onChange={handleTopChange}
        conversionRate={actualTopConversionRate}
        targetCurrencySymbol={bottomCrypto.symbol}
      />

      <div className="flex justify-center -my-2 relative z-10">
        <motion.button
          onClick={handleSwap}
          className="bg-white border border-gray-200 rounded-full p-2 shadow-sm dark:bg-[#4b4370]"
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
        crypto={bottomCrypto}
        label="Buy"
        value={bottomAmount}
        onChange={handleBottomChange}
        conversionRate={actualBottomConversionRate}
        targetCurrencySymbol={topCrypto.symbol}
      />
    </div>
  );
};

export default CardSide;
