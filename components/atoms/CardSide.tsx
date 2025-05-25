"use client";

import React from "react";
import { CurrencyInput } from "@/components/modules/CurrencyInput";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import type { CryptoOption } from "@/types/crypto";
import {useExchangeRate} from "@/hooks/useExchangeRate";

interface CardSideProps {
    isFront: boolean;
    sellAmount: string;
    buyAmount: string;
    sellValue: number;
    buyValue: number;
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

    const handleTopChange = (value: string) => {
        if (isFront) {
            setSellAmount(value);
        } else {
            setBuyAmount(value);
        }
    };

    const handleBottomChange = (value: string) => {
        if (isFront) {
            setBuyAmount(value);
        } else {
            setSellAmount(value);
        }
    };

    const { rate } = useExchangeRate(sellCrypto.id, buyCrypto.id);

    const conversionRate = rate ?? undefined;

    return (
        <div className="absolute w-full h-full p-5 backface-hidden">
            <CurrencyInput
                crypto={topCrypto}
                label="Sell"
                value={topAmount}
                onChange={handleTopChange}
                conversionRate={conversionRate}
                targetCurrencySymbol={bottomCrypto.symbol}
            />

            <div className="flex justify-center -my-2 relative z-10">
                <motion.button
                    onClick={handleSwap}
                    className="bg-white border border-gray-200 rounded-full p-2 shadow-sm"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                    disabled={isFlipping}
                >
                    <motion.div animate={{ rotate: iconRotation }} transition={{ duration: 0.3 }}>
                        <ArrowUpDown className="h-5 w-5 text-gray-400" />
                    </motion.div>
                </motion.button>
            </div>

            <CurrencyInput
                crypto={bottomCrypto}
                label="Buy"
                value={bottomAmount}
                onChange={handleBottomChange}
                conversionRate={conversionRate ? 1 / conversionRate : undefined}
                targetCurrencySymbol={topCrypto.symbol}
            />
        </div>
    );
};

export default CardSide;
