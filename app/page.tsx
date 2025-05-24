'use client'

import CenteredWrapper from '@/components/layout/CenteredWrapper'
import SwapCard from "@/components/modules/SwapCard";


export default function Home() {
    return (
        <CenteredWrapper>
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold mb-8 text-center">TAP. SWAP. GO.</h1>
                <SwapCard />
                <p className="text-sm text-center mt-6 text-gray-600">
                    Your gateway to instant crypto trading.
                </p>
            </div>
        </CenteredWrapper>
    )
}
