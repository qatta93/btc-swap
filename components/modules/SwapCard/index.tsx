'use client'

import { motion } from 'framer-motion'
import CardSide from '@/components/atoms/CardSide'
import { Button } from '@/components/atoms/Button'
import { cryptoOptions } from '@/data/cryptoOptions'
import { useSwapLogic } from '@/hooks/useSwapLogic'
import { useSwapCard } from './useSwapCard'

export default function SwapCard() {
  const {
    sellAmount,
    buyAmount,
    handleSellChange,
    handleBuyChange,
    isReversed,
    toggleSwapDirection,
    rate,
    error,
  } = useSwapLogic()

  const { isFlipped, isFlipping, iconRotation, handleSwap } =
    useSwapCard(toggleSwapDirection)

  const sellCrypto = cryptoOptions[1]
  const buyCrypto = cryptoOptions[0]

  const rateUsdToBtc = isReversed ? rate ?? 0 : rate ? 1 / rate : 0
  const rateBtcToUsd = isReversed ? (rate ? 1 / rate : 0) : rate ?? 0

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
            sellCrypto={sellCrypto} // USD
            buyCrypto={buyCrypto} // BTC
            handleSwap={handleSwap}
            isFlipping={isFlipping}
            iconRotation={iconRotation}
            setSellAmount={handleSellChange}
            setBuyAmount={handleBuyChange}
            rateBaseToQuote={rateUsdToBtc} // USD/BTC
            rateQuoteToBase={rateBtcToUsd} // BTC/USD
          />
          <div className="absolute w-full h-full rotateX-180 backface-hidden">
            <CardSide
              isFront={false}
              sellAmount={sellAmount}
              buyAmount={buyAmount}
              sellCrypto={sellCrypto} // USD
              buyCrypto={buyCrypto} // BTC
              handleSwap={handleSwap}
              isFlipping={isFlipping}
              iconRotation={iconRotation}
              setSellAmount={handleSellChange}
              setBuyAmount={handleBuyChange}
              rateBaseToQuote={rateUsdToBtc} // USD/BTC
              rateQuoteToBase={rateBtcToUsd} // BTC/USD
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
