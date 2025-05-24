"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/atoms/Button"
import CardSide from "@/components/atoms/CardSide";
import {cryptoOptions} from "@/data/cryptoOptions";

export default function SwapCard() {
    const [sellAmount, setSellAmount] = useState("0.16495")
    const [buyAmount, setBuyAmount] = useState("7")
    const [sellCrypto, setSellCrypto] = useState(cryptoOptions[1])
    const [buyCrypto, setBuyCrypto] = useState(cryptoOptions[0])
    const [isFlipped, setIsFlipped] = useState(false)
    const [isFlipping, setIsFlipping] = useState(false)
    const [iconRotation, setIconRotation] = useState(0)

    const sellValue = Number.parseFloat(sellAmount) * 107030
    const buyValue = Number.parseFloat(buyAmount) * 2506

    const handleSwap = () => {
        if (isFlipping) return
        setIsFlipping(true)

        setIsFlipped(!isFlipped)

        setTimeout(() => {
            setIconRotation(isFlipped ? 0 : 180)
            setIsFlipping(false)
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative perspective-1000">
                <motion.div
                    className="relative preserve-3d"
                    animate={{ rotateX: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ height: "280px" }}
                >
                    <CardSide
                        isFront={true}
                        sellAmount={sellAmount}
                        buyAmount={buyAmount}
                        sellValue={sellValue}
                        buyValue={buyValue}
                        sellCrypto={sellCrypto}
                        buyCrypto={buyCrypto}
                        isFlipping={isFlipping}
                        iconRotation={iconRotation}
                        setSellAmount={setSellAmount}
                        setBuyAmount={setBuyAmount}
                        handleSwap={handleSwap}
                    />
                    <div className="absolute w-full h-full rotateX-180 backface-hidden">
                        <CardSide
                            isFront={false}
                            sellAmount={sellAmount}
                            buyAmount={buyAmount}
                            sellValue={sellValue}
                            buyValue={buyValue}
                            sellCrypto={sellCrypto}
                            buyCrypto={buyCrypto}
                            isFlipping={isFlipping}
                            iconRotation={iconRotation}
                            setSellAmount={setSellAmount}
                            setBuyAmount={setBuyAmount}
                            handleSwap={handleSwap}
                        />
                    </div>
                </motion.div>
            </div>
            <div className="p-5 pt-0">
                <Button className="w-full py-6 text-lg font-medium bg-pink-500 hover:bg-pink-600 text-white rounded-xl">
                    Get started
                </Button>
            </div>
        </div>
    )
}
