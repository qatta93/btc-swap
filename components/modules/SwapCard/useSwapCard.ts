import { useState } from "react"

export const useSwapCard = (toggleSwapDirection: () => void) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [iconRotation, setIconRotation] = useState(0)

  const handleSwap = () => {
    if (isFlipping) return
    setIsFlipping(true)

    setIsFlipped(!isFlipped)
    toggleSwapDirection() // This function needs to be passed or defined here

    setTimeout(() => {
      setIconRotation(isFlipped ? 0 : 180)
      setIsFlipping(false)
    }, 600)
  }

  return {
    isFlipped,
    isFlipping,
    iconRotation,
    handleSwap,
  }
}
