'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import CardSide from '@/components/atoms/CardSide'
import { Button } from '@/components/atoms/Button'
import { cryptoOptions } from '@/data/cryptoOptions'
import { useSwapLogic } from '@/hooks/useSwapLogic'

export default function SwapCard() {

    const {
        sellAmount,
        buyAmount,
        handleSellChange,
        handleBuyChange,
        isReversed,
        toggleSwapDirection,
        rate,
        error
    } = useSwapLogic()

    const [isFlipped, setIsFlipped] = useState(false)
    const [isFlipping, setIsFlipping] = useState(false)
    const [iconRotation, setIconRotation] = useState(0)

    const handleSwap = () => {
        if (isFlipping) return
        setIsFlipping(true)

        setIsFlipped(!isFlipped)
        toggleSwapDirection()

        setTimeout(() => {
            setIconRotation(isFlipped ? 0 : 180)
            setIsFlipping(false)
        }, 600)
    }

    const sellCrypto = isReversed ? cryptoOptions[1] : cryptoOptions[0]
    const buyCrypto = isReversed ? cryptoOptions[0] : cryptoOptions[1]

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative perspective-1000">
                <motion.div
                    className="relative preserve-3d"
                    animate={{ rotateX: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ height: '280px' }}
                >
                    <CardSide
                        isFront={true}
                        sellAmount={sellAmount}
                        buyAmount={buyAmount}
                        sellCrypto={sellCrypto}
                        buyCrypto={buyCrypto}
                        handleSwap={handleSwap}
                        isFlipping={isFlipping}
                        iconRotation={iconRotation}
                        setSellAmount={handleSellChange}
                        setBuyAmount={handleBuyChange}
                        sellValue={rate ?? 0}
                        buyValue={rate ? 1 / rate : 0}
                    />
                    <div className="absolute w-full h-full rotateX-180 backface-hidden">
                        <CardSide
                            isFront={false}
                            sellAmount={sellAmount}
                            buyAmount={buyAmount}
                            sellCrypto={sellCrypto}
                            buyCrypto={buyCrypto}
                            handleSwap={handleSwap}
                            isFlipping={isFlipping}
                            iconRotation={iconRotation}
                            setSellAmount={handleSellChange}
                            setBuyAmount={handleBuyChange}
                            sellValue={rate ?? 0}
                            buyValue={rate ? 1 / rate : 0}
                        />
                    </div>
                </motion.div>
            </div>
            <div className="p-5 pt-0">
                <Button className="w-full py-6 text-lg font-medium bg-pink-500 hover:bg-pink-600 text-white rounded-xl">
                    Get started
                </Button>
                {error && (
                    <p className="text-xs text-red-500 text-center mt-2">
                        Error fetching rate: {error}
                    </p>
                )}
            </div>
        </div>
    )
}
