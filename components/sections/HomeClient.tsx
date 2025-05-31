"use client";

import { useEffect } from "react";
import { useCryptoStore } from "@/stores/useCryptoStore";
import BackgroundWrapper from "@/components/layout/BackgroundWrapper";
import SwapCard from "@/components/modules/SwapCard";
import Loader from "@/components/atoms/Loader";

export default function HomeClient() {
  const content = useCryptoStore((state) => state.content);
  const fetchContent = useCryptoStore((state) => state.fetchContent);

  useEffect(() => {
    if (!content) {
      fetchContent();
    }
  }, [content, fetchContent]);

  if (!content) {
    return (
      <BackgroundWrapper>
        <Loader />
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <div className="relative w-full max-w-md z-[100]">
        <h1 className="text-4xl mob:text-3xl font-black mob:font-semibold text-center mb-8 mob:mb-4 mob:mt-8 tracking-tight text-gray-700 dark:text-white">
          {content.heroTitle}
        </h1>
        <SwapCard />
        <p className="text-sm text-center mt-6 text-gray-700 dark:text-white">
          {content.heroSubtitle}
        </p>
      </div>
    </BackgroundWrapper>
  );
}
