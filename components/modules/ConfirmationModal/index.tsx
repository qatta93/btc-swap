"use client";

import React from "react";
import { X, ChevronDown, ArrowDown, Info } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useConfirmationModal } from "./useConfirmationModal";

interface SwapConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SwapConfirmationModal({
      isOpen,
      onClose,
      onConfirm,
  }: SwapConfirmationModalProps) {
    const { showMore, setShowMore, isAnimating, modalRef } = useConfirmationModal(
        isOpen,
        onClose
    );

    if (!isOpen && !isAnimating) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div
                ref={modalRef}
                className={`w-[448px] max-w-full bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-200 ease-in-out mt-[25px] ${
                    isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-98"
                }`}
            >
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">You're swapping</h2>
                        <button
                            onClick={onClose}
                            className="h-6 w-6 p-0 flex items-center justify-center rounded-full hover:bg-gray-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-2xl font-semibold text-gray-900">0.25114 BTC</div>
                            <div className="text-sm text-gray-500">$0.25</div>
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src="/icons/btc.svg" alt="Bitcoin" className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="flex justify-center mb-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <ArrowDown className="h-4 w-4 text-gray-600" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-2xl font-semibold text-gray-900">0.0001 USD</div>
                            <div className="text-sm text-gray-500">$0.25</div>
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src="/icons/dollar.png" alt="USD" className="w-8 h-8" />
                        </div>
                    </div>

                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="flex items-center justify-center w-full text-sm text-gray-600 hover:text-gray-800 mb-4"
                    >
                        Show more
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
                    </button>

                    {showMore && (
                        <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600">Fee (0.25%)</span>
                                    <Info
                                        className="ml-1 h-3 w-3 text-gray-400 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Platform fee charged by the exchange for facilitating the swap between cryptocurrencies"
                                    />
                                </div>
                                <span className="text-sm text-gray-900">{'<$0.01'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600">Network cost</span>
                                    <Info
                                        className="ml-1 h-3 w-3 text-gray-400 cursor-pointer"
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Blockchain transaction fee (gas fee) required to execute the swap on the network"
                                    />
                                </div>
                                <span className="text-sm text-gray-900">$1.03</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onConfirm}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl transition-colors"
                    >
                        Swap
                    </button>
                </div>
            </div>

            <Tooltip
                id="tooltip"
                className="!bg-gray-700 !text-white !rounded-md !text-sm !px-2 !py-1 max-w-[300px] !opacity-95"
                place="top"
                delayShow={100}
            />
        </div>
    );
}
