import { useRef, useState } from "react";

export function useConfirmationModal({
  sellAmount,
  buyAmount,
  isReversed,
}: {
  sellAmount: string;
  buyAmount: string;
  isReversed: boolean;
}) {
  const [showMore, setShowMore] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const fromSymbol = isReversed ? "BTC" : "USD";
  const toSymbol = isReversed ? "USD" : "BTC";

  const fromIcon = isReversed ? "/icons/btc.svg" : "/icons/dollar.png";
  const toIcon = isReversed ? "/icons/dollar.png" : "/icons/btc.svg";

  const usdAmount = isReversed ? sellAmount : buyAmount;
  const feeValue =
    usdAmount && !isNaN(Number(usdAmount)) ? Number(usdAmount) * 0.0025 : 0;
  const transactionFee =
    feeValue < 0.01 && feeValue > 0 ? "<$0.01" : `$${feeValue.toFixed(2)}`;

  return {
    showMore,
    setShowMore,
    isAnimating,
    setIsAnimating,
    modalRef,
    fromSymbol,
    toSymbol,
    fromIcon,
    toIcon,
    transactionFee,
  };
}
