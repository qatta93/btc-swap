import { useCallback } from "react";

interface UseCardSideProps {
    isFront: boolean;
    setSellAmount: (value: string) => void;
    setBuyAmount: (value: string) => void;
}

export const useCardSide = ({ isFront, setSellAmount, setBuyAmount }: UseCardSideProps) => {
    const handleTopChange = useCallback((value: string) => {
        if (isFront) {
            setSellAmount(value);
        } else {
            setBuyAmount(value);
        }
    }, [isFront, setSellAmount, setBuyAmount]);

    const handleBottomChange = useCallback((value: string) => {
        if (isFront) {
            setBuyAmount(value);
        } else {
            setSellAmount(value);
        }
    }, [isFront, setSellAmount, setBuyAmount]);

    return {
        handleTopChange,
        handleBottomChange,
    };
};
