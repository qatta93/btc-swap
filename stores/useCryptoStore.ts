import { create } from "zustand";
import {
  zodContentSchema,
  ValidatedCryptoContent,
} from "@/schemas/zodContentSchema";
import { getCryptoPageContent } from "@/lib/mockCms";

interface CryptoStoreState {
  content: ValidatedCryptoContent | null;
  fetchContent: () => Promise<void>;
}

export const useCryptoStore = create<CryptoStoreState>((set) => ({
  content: null,
  fetchContent: async () => {
    try {
      const data = await getCryptoPageContent();

      const parsed = zodContentSchema.safeParse(data);
      if (parsed.success) {
        set({ content: parsed.data });
      } else {
        console.error(

          parsed.error.flatten()
        );
        throw new Error("CMS content failed validation.");
      }
    } catch (err) {
      console.error("❌ fetchContent error:", err);
    }
  },
}));
