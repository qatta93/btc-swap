"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { CryptoOption } from "@/types/crypto";
import Input from "@/components/atoms/Input";

interface CurrencyInputProps {
    value: string;
    onChange: (value: string) => void;
    crypto: CryptoOption;
    label: "Sell" | "Buy";
    amount?: number;
}

export function CurrencyInput({
  value,
  onChange,
  crypto,
  label,
}: CurrencyInputProps) {
    return (
        <div className="flex flex-col w-full">
      <span className="text-sm text-muted-foreground font-medium mb-1">
        {label}
      </span>
            <div className="flex items-center justify-between border border-border bg-background px-4 py-3 rounded-xl">
                <Input
                    type="number"
                    inputMode="decimal"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0.00"
                    className="text-lg w-full"
                />
                <div className="flex items-center gap-2 ml-3">
                    <Image src={crypto.svg} alt={crypto.symbol} width={24} height={24} />
                    <span className="font-semibold">{crypto.symbol}</span>
                </div>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
        1 {crypto.symbol} = {value}
      </span>
        </div>
    );
}
