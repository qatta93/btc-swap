"use client";

import Image from "next/image";
import type { CryptoOption } from "@/types/crypto";
import Input from "@/components/atoms/Input";
import { formatDisplayValue, parseInputValue } from "./utils";
import { cn } from "@/lib/utils"; // Zakładam, że masz utila `cn`

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  crypto: CryptoOption;
  label: "Sell" | "Buy";
  conversionRate?: number;
  targetCurrencySymbol?: string;
}

export function CurrencyInput({
  value,
  onChange,
  crypto,
  label,
  conversionRate,
  targetCurrencySymbol,
}: CurrencyInputProps) {
  const formattedRate = conversionRate?.toLocaleString(undefined, {
    maximumFractionDigits: 8,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInputValue(e.target.value));
  };

  const numericValue = parseFloat(value);
  const showValidationError =
    value.trim() !== "" && (isNaN(numericValue) || numericValue <= 0);

  return (
    <div className="flex flex-col w-full">
      <span className="text-sm text-muted-foreground font-medium mb-1">
        {label}
      </span>
      <div
        className={cn(
          "flex items-center justify-between bg-background px-4 py-3 rounded-xl border",
          showValidationError ? "border-red-500" : "border-border"
        )}>
        <Input
          type="text"
          inputMode="decimal"
          value={formatDisplayValue(value)}
          onChange={handleInputChange}
          placeholder="0.00"
          className="text-lg w-full"
        />
        <div className="flex items-center gap-2 ml-3">
          <Image src={crypto.svg} alt={crypto.symbol} width={24} height={24} />
          <span className="font-semibold">{crypto.symbol}</span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-1 space-y-0.5 min-h-[1rem]">
        {conversionRate !== undefined ? (
          <div>
            1 {crypto.symbol} = {formattedRate} {targetCurrencySymbol}
          </div>
        ) : (
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        )}
      </div>

      {showValidationError && (
        <div className="text-xs text-red-500 mt-1">
          Please enter a value greater than 0
        </div>
      )}
    </div>
  );
}
