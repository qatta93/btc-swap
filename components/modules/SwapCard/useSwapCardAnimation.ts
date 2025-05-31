import { delay } from "framer-motion";
import { useState, useCallback } from "react";
import { SWAP_ANIMATION_DURATION } from "./config";

export const useSwapCardAnimation = (toggleSwapDirection: () => void) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);

  const handleSwapAnimation = useCallback(() => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setIsFlipped((prev) => !prev);
    
    toggleSwapDirection();

    delay(() => {
      setIconRotation((prev) => (prev === 0 ? 180 : 0));
      setIsFlipping(false);
    }, SWAP_ANIMATION_DURATION * 1000);
  }, [isFlipping, toggleSwapDirection]);

  return {
    isFlipped,
    isFlipping,
    iconRotation,
    handleSwapAnimation,
  };
};
