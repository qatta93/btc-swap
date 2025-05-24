import React from "react";
import { CurrencyInput } from "@/components/modules/CurrencyInput";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";

type Crypto = {
    id: string;
    name: string;
    symbol: string;
    icon: string;
};

interface CardSideProps {
    isFront: boolean;
    sellAmount: string;
    buyAmount: string;
    sellValue: number;
    buyValue: number;
    sellCrypto: Crypto;
    buyCrypto: Crypto;
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
  sellValue,
  buyValue,
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
    const topValue = isFront ? sellValue : buyValue;
    const bottomValue = isFront ? buyValue : sellValue;

    const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFront) {
            setSellAmount(e.target.value);
        } else {
            setBuyAmount(e.target.value);
        }
    };

    const handleBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFront) {
            setBuyAmount(e.target.value);
        } else {
            setSellAmount(e.target.value);
        }
    };

    return (
        <div className="absolute w-full h-full p-5 backface-hidden">
            <CurrencyInput
                amount={topAmount}
                crypto={topCrypto}
                label="Sell"
                value={topValue}
                onChange={handleTopChange}
            />

            {/* Swap Button */}
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
                amount={bottomAmount}
                crypto={bottomCrypto}
                label="Buy"
                value={bottomValue}
                onChange={handleBottomChange}
            />
        </div>
    );
};

export default CardSide;
