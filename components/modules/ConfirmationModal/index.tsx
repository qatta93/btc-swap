"use client";

import { useEffect } from "react";
import { X, ChevronDown, ArrowDown, Info } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useConfirmationModal } from "@/components/modules/ConfirmationModal/useConfirmationModal";
import { Button } from "@/components/atoms/Button";
import { useCryptoStore } from "@/stores/useCryptoStore";
import {
  trackSwapConfirmed,
  trackFeeInfoView,
  trackNetworkCostInfoView,
} from "@/lib/analytics";
import { formatDisplayValue } from "@/components/modules/CurrencyInput/utils";

interface SwapConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sellAmount: string;
  buyAmount: string;
  isReversed: boolean;
}

export default function SwapConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  sellAmount,
  buyAmount,
  isReversed,
}: SwapConfirmationModalProps) {
  const content = useCryptoStore((state) => state.content);

  const {
    showMore,
    setShowMore,
    modalRef,
    fromSymbol,
    toSymbol,
    fromIcon,
    toIcon,
    transactionFee,
    isAnimating,
    setIsAnimating,
  } = useConfirmationModal({ sellAmount, buyAmount, isReversed });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className={`w-[448px] min-h-[376px] max-w-full bg-white dark:bg-dark dark:text-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-200 ease-in-out mt-[25px] ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-1 scale-98"
        }`}>
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {content?.confirmationModal.title}
            </h2>
            <Button
              onClick={onClose}
              className="h-10 w-10 p-0 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="h-8 w-8 text-gray-700" />
            </Button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl text-gray-900">
                {formatDisplayValue(sellAmount)}
                <span className="ml-2 font-semibold">{fromSymbol}</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={fromIcon} alt={fromSymbol} className="w-8 h-8" />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center dark:bg-dark">
              <ArrowDown className="h-4 w-4 text-gray-600 dark:text-white" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-2xl text-gray-900 dark:text-white">
                {formatDisplayValue(buyAmount)}
                <span className="ml-2 font-semibold">{toSymbol}</span>
              </div>
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={toIcon} alt={toSymbol} className="w-8 h-8" />
            </div>
          </div>

          <Button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center justify-center w-full text-sm text-gray-600 dark:text-white hover:text-gray-900 mb-4 bg-transparent hover:bg-transparent py-2">
            {content?.confirmationModal.showMore}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                showMore ? "rotate-180" : ""
              }`}
            />
          </Button>

          {showMore && (
            <div className="space-y-3 mb-6 p-4 bg-gray-50 dark:bg-dark rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-white">
                    {content?.confirmationModal.fee}
                  </span>
                  <Info
                    className="ml-1 h-3 w-3 text-gray-400 dark:text-white cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content={content?.confirmationModal.feeTooltip}
                    onMouseEnter={() => trackFeeInfoView()}
                  />
                </div>
                <span className="text-sm text-gray-900 dark:text-white">
                  {transactionFee}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-white">
                    {content?.confirmationModal.networkCost}
                  </span>
                  <Info
                    className="ml-1 h-3 w-3 text-gray-400 dark:text-white cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content={
                      content?.confirmationModal.networkCostTooltip
                    }
                    onMouseEnter={() => trackNetworkCostInfoView()}
                  />
                </div>
                <span className="text-sm text-gray-900 dark:text-white">
                  $1.03
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              const fromCurrency = isReversed ? "usd" : "btc";
              const toCurrency = isReversed ? "btc" : "usd";
              trackSwapConfirmed(
                fromCurrency,
                toCurrency,
                sellAmount,
                buyAmount
              );
              onConfirm();
            }}>
            {content?.confirmationModal.button}
          </Button>
        </div>
      </div>

      <Tooltip
        id="tooltip"
        className="!bg-gray-900 !text-white !rounded-md !text-sm !px-2 !py-1 max-w-[300px]"
        place="top"
        delayShow={100}
      />
    </div>
  );
}
