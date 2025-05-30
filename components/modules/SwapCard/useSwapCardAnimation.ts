import { delay } from "framer-motion";
import { useState } from "react";
import { SWAP_ANIMATION_DURATION } from "./config";

export const useSwapCardAnimation = (toggleSwapDirection: () => void) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);

  const handleSwapAnimation = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    setIsFlipped(!isFlipped);
    toggleSwapDirection();

    delay(() => {
      setIconRotation(isFlipped ? 0 : 180);
      setIsFlipping(false);
    }, SWAP_ANIMATION_DURATION * 1000);
  };

  return {
    isFlipped,
    isFlipping,
    iconRotation,
    handleSwapAnimation,
  };
};
