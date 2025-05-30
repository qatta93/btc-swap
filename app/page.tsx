"use client";

import BackgroundWrapper from "@/components/layout/BackgroundWrapper";
import SwapCard from "@/components/modules/SwapCard";

export default function Home() {
  return (
    <BackgroundWrapper>
      <div className="relative w-full max-w-md z-[100]">
        <h1 className="text-4xl font-black text-center mb-8 tracking-tight text-gray-700 dark:text-white">
          TAP. SWAP. GO.
        </h1>
        <SwapCard />
        <p className="text-sm text-center mt-6 text-gray-700 dark:text-white">
          Your gateway to instant crypto trading.
        </p>
      </div>
    </BackgroundWrapper>
  );
}
