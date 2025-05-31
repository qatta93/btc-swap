/**
 * Analytics Module for Cryptocurrency Exchange App
 * 
 * This module provides a centralized interface for analytics tracking
 * specifically designed for cryptocurrency exchange applications.
 * It's structured to be easily integrated with Google Analytics in the future.
 */

export interface CryptoAnalyticsConfig {
  enabled: boolean;
  debug?: boolean;
  gaId?: string; // Google Analytics ID (to be added in the future)
}

let analyticsConfig: CryptoAnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
};

export function initAnalytics(config: Partial<CryptoAnalyticsConfig> = {}): void {
  analyticsConfig = { ...analyticsConfig, ...config };
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Initialized with config:', analyticsConfig);
  }
  
  // Future Google Analytics initialization would go here
  // Example:
  // if (analyticsConfig.gaId && typeof window !== 'undefined') {
  //   // Initialize Google Analytics with GA4
  // }
}

export function trackPageView(path: string, title?: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Page View:', { path, title });
  }
  
  // Future Google Analytics page view tracking would go here
}

export function trackExchangeRateFetch(fromCurrency: string, toCurrency: string, success: boolean, error?: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Exchange Rate Fetch:', { 
      fromCurrency, 
      toCurrency, 
      success,
      error 
    });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "exchange_rate_fetch"
}

export function trackSwapDirectionToggle(fromCurrency: string, toCurrency: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Swap Direction Toggle:', { fromCurrency, toCurrency });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "swap_direction_toggle"
}

export function trackAmountInput(currency: string, amount: string, isSource: boolean): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Amount Input:', { 
      currency, 
      amount, 
      type: isSource ? 'source' : 'target' 
    });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "amount_input"
}

export function trackSwapConfirmationOpen(fromCurrency: string, toCurrency: string, fromAmount: string, toAmount: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Swap Confirmation Open:', { 
      fromCurrency, 
      toCurrency, 
      fromAmount, 
      toAmount 
    });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "swap_confirmation_open"
}

export function trackSwapConfirmed(fromCurrency: string, toCurrency: string, fromAmount: string, toAmount: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Swap Confirmed:', { 
      fromCurrency, 
      toCurrency, 
      fromAmount, 
      toAmount 
    });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "swap_confirmed"
}

export function trackSwapCompleted(fromCurrency: string, toCurrency: string, fromAmount: string, toAmount: string, transactionId?: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Swap Completed:', { 
      fromCurrency, 
      toCurrency, 
      fromAmount, 
      toAmount,
      transactionId 
    });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "swap_completed"
}

export function trackApiError(endpoint: string, error: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] API Error:', { endpoint, error });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "api_error"
}

export function trackFeeInfoView(): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Fee Info View');
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "fee_info_view"
}

export function trackNetworkCostInfoView(): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] Network Cost Info View');
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "network_cost_info_view"
}

export function trackViewTransactionDetails(transactionId?: string): void {
  if (!analyticsConfig.enabled) return;
  
  if (analyticsConfig.debug) {
    console.log('[Analytics] View Transaction Details:', { transactionId });
  }
  
  // Future Google Analytics event tracking would go here
  // Example event name: "view_transaction_details"
}

const cryptoAnalytics = {
  init: initAnalytics,
  pageView: trackPageView,
  exchangeRateFetch: trackExchangeRateFetch,
  swapDirectionToggle: trackSwapDirectionToggle,
  amountInput: trackAmountInput,
  swapConfirmationOpen: trackSwapConfirmationOpen,
  swapConfirmed: trackSwapConfirmed,
  swapCompleted: trackSwapCompleted,
  apiError: trackApiError,
  feeInfoView: trackFeeInfoView,
  networkCostInfoView: trackNetworkCostInfoView,
  viewTransactionDetails: trackViewTransactionDetails
};

export default cryptoAnalytics;
