'use client'

import { useEffect, useState } from 'react'

export function useExchangeRate() {
    const [rate, setRate] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchRate() {
            try {
                // Primary API: CoinGecko
                const res = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
                )

                if (!res.ok) throw new Error('CoinGecko error')

                const data = await res.json()
                const usdRate = data?.bitcoin?.usd

                if (!usdRate) throw new Error('CoinGecko returned no rate')

                setRate(usdRate)
            } catch (err: any) {
                console.warn('CoinGecko failed:', err.message)

                // Fallback API: Coinbase
                try {
                    const fallbackRes = await fetch(
                        'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
                    )

                    if (!fallbackRes.ok) throw new Error('Coinbase error')

                    const fallbackData = await fallbackRes.json()
                    const usdRate = fallbackData?.data?.rates?.USD

                    if (!usdRate) throw new Error('Coinbase returned no rate')

                    setRate(Number(usdRate))
                } catch (fallbackErr: any) {
                    console.error('Fallback also failed:', fallbackErr.message)
                    setError(fallbackErr.message)
                }
            }
        }

        fetchRate()
    }, [])

    return { rate, error }
}
