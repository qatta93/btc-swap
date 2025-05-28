"use client";

import { useCallback, useState } from "react";
import { useExchangeRate } from "@/hooks/useExchangeRate";

export const useSwapLogic = () => {
    const [sellAmount, setSellAmount] = useState("");
    const [buyAmount, setBuyAmount] = useState("");
    const [isReversed, setIsReversed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                setBuyAmount(result.toFixed(8).replace(/\.?0+$/, ''));
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
                setSellAmount(result.toFixed(8).replace(/\.?0+$/, ''));
            } else {
                setSellAmount("");
            }
        },
        [exchangeRate]
    );

    const toggleSwapDirection = useCallback(() => {
        setIsReversed((prev) => !prev);
        setSellAmount(buyAmount);
        setBuyAmount(sellAmount);
    }, [sellAmount, buyAmount]);

    const confirmSwap = () => {
        console.log("Swapping", sellAmount, isReversed ? "USD → BTC" : "BTC → USD");
    };

    const handleConfirm = () => {
        confirmSwap()
    }

    return {
        sellAmount,
        buyAmount,
        isReversed,
        handleSellChange,
        handleBuyChange,
        toggleSwapDirection,
        confirmSwap,
        rate,
        error,
        handleConfirm,
        isModalOpen,
        setIsModalOpen,
    };
};
