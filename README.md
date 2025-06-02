# BTC Swap

BTC Swap is a modern web application for swapping cryptocurrencies. Built with the latest web technologies, it provides a smooth and responsive user experience while fetching real-time crypto data from an external API.

## 🚀 Features

- ⚡ Real-time cryptocurrency exchange rates with smart caching
- 💱 Clean and intuitive crypto swap interface
- 🎨 Beautiful UI styled with Tailwind CSS
- 🔧 Built with Next.js and TypeScript
- 🌐 Deployed on Vercel
- 🔄 Optimized API calls with caching and periodic updates
- 📝 Prepared for CMS integration with type-safe content management using Zustand
- 📊 Google Analytics integration ready with comprehensive event tracking
- 🌙 Dark/Light mode toggle with smooth theme transitions

## 🔗 Live Demo

Check out the live version of the app:

👉 [https://btc-swap.vercel.app/](https://btc-swap.vercel.app/)

## 📦 Tech Stack

- [Next.js](https://nextjs.org/) – React framework for production
- [TypeScript](https://www.typescriptlang.org/) – Static typing for JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) – State management for React
- [Zod](https://zod.dev/) – TypeScript-first schema validation
- [Crypto API](https://www.coingecko.com/en/api) – Primary API for crypto price data
- [Coinbase API](https://developers.coinbase.com/) – Fallback API for exchange rates
- Analytics – Prepared for Google Analytics integration

## 🧑‍💻 Getting Started

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/qatta93/btc-swap.git
cd btc-swap

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 📊 Analytics Integration

The application is prepared for Google Analytics integration. To enable Google Analytics:

1. Create a Google Analytics 4 property and obtain your Measurement ID (G-XXXXXXXXXX)
2. Add the Measurement ID to your environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following line: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
   - Alternatively, set this environment variable in your hosting platform

The analytics module (`lib/analytics.ts`) provides tracking for:

- Page views
- Exchange rate fetches
- Swap direction toggles
- Amount inputs
- Swap confirmations and completions
- Fee information views
- Error tracking

All analytics events are automatically disabled in development mode and enabled in production.

## 📈 Performance Optimizations

The application includes several performance optimizations to ensure a smooth user experience:

### Exchange Rate Fetching

The `useExchangeRate` hook has been optimized for performance:

- **Caching System**: Exchange rates are cached for 5 minutes to reduce unnecessary API calls
- **Smart Fetching**: Only fetches new rates when currencies change or cached data expires
- **API Fallback**: Automatically falls back to Coinbase API if CoinGecko fails
- **Periodic Updates**: Refreshes rates every 60 seconds to keep data current
- **Loading States**: Provides visual feedback during rate fetching
- **Error Handling**: Gracefully handles API errors with clear user feedback

### UI Responsiveness

- Loading indicators show when exchange rates are being fetched
- Input fields remain responsive even during API calls
- Swap button is disabled during rate loading to prevent invalid trades
- "Loading..." state button is intentionally designed to simulate a real-world application experience with a brief delay before showing the confirmation modal

## 🖥️ CMS Implementation

The application is prepared for CMS integration with a structured approach to content management:

- **Type-Safe Content**: All CMS content is defined with TypeScript interfaces for type safety
- **Zod Schema Validation**: Content is validated using Zod schemas to ensure data integrity
- **Zustand Store**: Content is managed through a Zustand store for efficient state management
- **Mock CMS Service**: A mock CMS service is implemented to simulate real CMS integration
- **Internationalization Ready**: The structure supports easy addition of multiple languages

This approach allows for seamless integration with headless CMS platforms in the future while maintaining a consistent developer experience during development.
