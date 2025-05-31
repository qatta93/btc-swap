'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import type { CryptoId } from '@/types/crypto'
import { trackExchangeRateFetch, trackApiError } from '@/lib/analytics'

interface RateCache {
  [key: string]: {
    rate: number;
    timestamp: number;
    error?: string;
  }
}

const CACHE_EXPIRATION = 5 * 60 * 1000;

const globalRateCache: RateCache = {};

export function useExchangeRate(fromId: CryptoId, toId: CryptoId) {
    const [rate, setRate] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    

    const prevPairRef = useRef<string>('');
    
    const getCacheKey = useCallback((from: CryptoId, to: CryptoId) => `${from}-${to}`, []);
    
    const fetchRate = useCallback(async (from: CryptoId, to: CryptoId) => {
        if (!from || !to) return null;
        
        if (from === to) {
            return 1;
        }
        
        const cacheKey = getCacheKey(from, to);
        setIsLoading(true);
        
        try {
            const fromGecko = mapToCoinGeckoId(from)
            const toGecko = mapToCoinGeckoSymbol(to)

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

  
            globalRateCache[cacheKey] = {
                rate: directRate,
                timestamp: Date.now()
            };
            
            trackExchangeRateFetch(from, to, true);
            return directRate;
        } catch (err: any) {
            console.warn('CoinGecko failed:', err.message)

            try {
                const res = await fetch(
                    `https://api.coinbase.com/v2/exchange-rates?currency=${from.toUpperCase()}`
                )

                if (!res.ok) {
                    const error = 'Coinbase error';
                    trackApiError('coinbase', error);
                    throw new Error(error);
                }

                const data = await res.json()
                const fallbackRate = data?.data?.rates?.[to.toUpperCase()]

                if (!fallbackRate) {
                    const error = 'Coinbase missing rate';
                    trackApiError('coinbase', error);
                    throw new Error(error);
                }

             
                globalRateCache[cacheKey] = {
                    rate: Number(fallbackRate),
                    timestamp: Date.now()
                };
                
                trackExchangeRateFetch(from, to, true);
                return Number(fallbackRate);
            } catch (fallbackErr: any) {
                console.error('Fallback also failed:', fallbackErr.message)
                
 
                globalRateCache[cacheKey] = {
                    rate: 0,
                    timestamp: Date.now(),
                    error: fallbackErr.message
                };
                
                trackExchangeRateFetch(from, to, false, fallbackErr.message);
                throw fallbackErr;
            }
        } finally {
            setIsLoading(false);
        }
    }, [getCacheKey]);

    useEffect(() => {
        if (!fromId || !toId) return;

        if (fromId === toId) {
            setRate(1);
            setError(null);
            return;
        }
        
        const cacheKey = getCacheKey(fromId, toId);
        const currentPair = cacheKey;
        
        const pairChanged = prevPairRef.current !== currentPair;
        prevPairRef.current = currentPair;
        
        const cachedData = globalRateCache[cacheKey];
        const now = Date.now();
        
        if (cachedData && (now - cachedData.timestamp < CACHE_EXPIRATION)) {
            if (cachedData.error) {
                setError(cachedData.error);
                setRate(null);
            } else {
                setRate(cachedData.rate);
                setError(null);
            }
            return;
        }
        
        const fetchData = async () => {
            try {
                const newRate = await fetchRate(fromId, toId);
                setRate(newRate);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setRate(null);
            }
        };
        
        fetchData();
        
        const pollInterval = setInterval(() => {
            if (prevPairRef.current === currentPair) {
                fetchData();
            }
        }, 60000);
        
        return () => {
            clearInterval(pollInterval);
        };
    }, [fromId, toId, fetchRate, getCacheKey]);

    return { rate, error, isLoading }
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
