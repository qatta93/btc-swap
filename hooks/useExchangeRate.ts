'use client'

import { useEffect, useState } from 'react'
import type { CryptoId } from '@/types/crypto'
import { trackExchangeRateFetch, trackApiError } from '@/lib/analytics'

export function useExchangeRate(fromId: CryptoId, toId: CryptoId) {
    const [rate, setRate] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!fromId || !toId) return

        if (fromId === toId) {
            setRate(1)
            return
        }

        async function fetchRate() {
            try {
                const fromGecko = mapToCoinGeckoId(fromId)
                const toGecko = mapToCoinGeckoSymbol(toId)

                const res = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${fromGecko}&vs_currencies=${toGecko}`
                )

                if (!res.ok) {
                    const error = 'CoinGecko error';
                    trackApiError('coingecko', error);
                    throw new Error(error);
                }

                const data = await res.json()
                const directRate = data?.[fromGecko]?.[toGecko]

                if (!directRate) {
                    const error = 'Invalid CoinGecko response';
                    trackApiError('coingecko', error);
                    throw new Error(error);
                }

                setRate(directRate)
                trackExchangeRateFetch(fromId, toId, true);
            } catch (err: any) {
                console.warn('CoinGecko failed:', err.message)

                try {
                    const res = await fetch(
                        `https://api.coinbase.com/v2/exchange-rates?currency=${fromId.toUpperCase()}`
                    )

                    if (!res.ok) {
                        const error = 'Coinbase error';
                        trackApiError('coinbase', error);
                        throw new Error(error);
                    }

                    const data = await res.json()
                    const fallbackRate = data?.data?.rates?.[toId.toUpperCase()]

                    if (!fallbackRate) {
                        const error = 'Coinbase missing rate';
                        trackApiError('coinbase', error);
                        throw new Error(error);
                    }

                    setRate(Number(fallbackRate))
                    trackExchangeRateFetch(fromId, toId, true);
                } catch (fallbackErr: any) {
                    console.error('Fallback also failed:', fallbackErr.message)
                    setError(fallbackErr.message)
                    trackExchangeRateFetch(fromId, toId, false, fallbackErr.message);
                }
            }
        }

        fetchRate()
    }, [fromId, toId])

    return { rate, error }
}


function mapToCoinGeckoId(id: CryptoId): string {
    const map: Record<CryptoId, string> = {
        btc: 'bitcoin',
        usd: 'usd',
    }
    return map[id]
}

function mapToCoinGeckoSymbol(id: CryptoId): string {
    const map: Record<CryptoId, string> = {
        btc: 'btc',
        usd: 'usd',
    }
    return map[id]
}
