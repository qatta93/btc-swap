export interface CryptoPageContent {
  heroTitle: string;
  heroSubtitle: string;
  general: {
    errors: {
      moreThanZero: string;
      fetchError: string;
    },
    loading: string;
    close: string;
  }
  swapCard: {
    sell: string;
    buy: string;
    button: string;
  };
  confirmationModal: {
    title: string;
    showMore: string;
    fee: string;
    feeTooltip: string;
    networkCost: string;
    networkCostTooltip: string;
    button: string;
  };
  successModal: {
    title: string;
    subtitle: string;
    detailsButton: string;
  }
}