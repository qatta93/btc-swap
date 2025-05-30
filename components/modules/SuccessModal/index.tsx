"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useConfirmationModal } from "@/components/modules/ConfirmationModal/useConfirmationModal";
import { ArrowRight } from "lucide-react";

interface SwapSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellAmount: string;
  buyAmount: string;
  isReversed: boolean;
}

export default function SwapSuccessModal({
  isOpen,
  onClose,
  sellAmount,
  buyAmount,
  isReversed,
}: SwapSuccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const [confettiComplete, setConfettiComplete] = useState(false);

  const { fromSymbol, toSymbol, fromIcon, toIcon } = useConfirmationModal({
    sellAmount,
    buyAmount,
    isReversed,
  });

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setConfettiComplete(false);
      triggerConfetti();
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#FF5BAC", "#7B61FF", "#00E3A5", "#FFC107"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setConfettiComplete(true);
      }
    };

    frame();
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4 transition-colors duration-1000 ${
        confettiComplete ? "bg-black/60" : "bg-black/100"
      }`}>
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />

      <div
        ref={modalRef}
        className={`w-[448px] bg-white dark:bg-dark rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}>
        <div className="p-6 pb-4 flex justify-end">
          <button
            onClick={onClose}
            className="h-6 w-6 p-0 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-500 dark:text-white" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Your swap is complete!
            </h3>
            <p className="text-gray-600 dark:text-white">
              You've successfully swapped:
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#4b4370] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={fromIcon || "/placeholder.svg"}
                  alt={fromSymbol}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-gray-900 dark:text-white font-medium">
                  {sellAmount} {fromSymbol}
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 " />
              <div className="flex items-center">
                <img
                  src={toIcon || "/placeholder.svg"}
                  alt={toSymbol}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-gray-900 dark:text-white font-medium">
                  {buyAmount} {toSymbol}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors">
              Close
            </button>
            <button className="py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center">
              View Details
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
