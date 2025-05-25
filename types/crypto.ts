import {cryptoOptions} from "@/data/cryptoOptions";

export type CryptoOption = {
    id: string;
    name: string;
    symbol: string;
    icon: string;
    svg: string;
}

export type CryptoId = typeof cryptoOptions[number]["id"];