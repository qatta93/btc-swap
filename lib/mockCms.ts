import {
  zodContentSchema,
  ValidatedCryptoContent,
} from "@/schemas/zodContentSchema";

export const getCryptoPageContent =
  async (): Promise<ValidatedCryptoContent> => {
    const data = {
      heroTitle: "TAP. SWAP. GO.",
      heroSubtitle: "Your gateway to instant crypto trading.",
      general: {
        errors: {
          moreThanZero: "Please enter more than 0",
          fetchError: "Error fetching rate. Please try later.",
        },
        loading: "Loading...",
        loadingRates: "Loading rates...",
        close: "Close",
      },
      swapCard: {
        sell: "Sell",
        buy: "Buy",
        button: "Get started",
      },
      confirmationModal: {
        title: "You're swapping",
        showMore: "Show more",
        fee: "Fee (0.25%)",
        feeTooltip:
          "Platform fee charged by the exchange for facilitating the swap between cryptocurrencies",
        networkCost: "Network cost",
        networkCostTooltip:
          "Blockchain transaction fee (gas fee) required to execute the swap on the network",
        button: "Swap",
      },
      successModal: {
        title: "Your swap is complete!",
        subtitle: "You've successfully swapped:",
        detailsButton: "View Details",
      },
    };

    return zodContentSchema.parse(data);
  };
