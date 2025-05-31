import { z } from "zod";

export const zodContentSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  general: z.object({
    errors: z.object({
      moreThanZero: z.string(),
      fetchError: z.string(),
    }),
    loading: z.string(),
    close: z.string(),
  }),
  swapCard: z.object({
    sell: z.string(),
    buy: z.string(),
    button: z.string(),
  }),
  confirmationModal: z.object({
    title: z.string(),
    showMore: z.string(),
    fee: z.string(),
    feeTooltip: z.string(),
    networkCost: z.string(),
    networkCostTooltip: z.string(),
    button: z.string(),
  }),
  successModal: z.object({
    title: z.string(),
    subtitle: z.string(),
    detailsButton: z.string(),
  }),
});

export type ValidatedCryptoContent = z.infer<typeof zodContentSchema>;
