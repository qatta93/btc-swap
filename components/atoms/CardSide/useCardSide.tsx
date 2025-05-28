import { useState } from "react";

interface UseCardSideProps {
    isFront: boolean;
    setSellAmount: (value: string) => void;
    setBuyAmount: (value: string) => void;
}

export const useCardSide = ({ isFront, setSellAmount, setBuyAmount }: UseCardSideProps) => {
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

    return {
        handleTopChange,
        handleBottomChange,
    };
};
