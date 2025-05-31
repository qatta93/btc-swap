# BTC Swap

BTC Swap is a modern web application for swapping cryptocurrencies. Built with the latest web technologies, it provides a smooth and responsive user experience while fetching real-time crypto data from an external API.

## 🚀 Features

- ⚡ Real-time cryptocurrency exchange rates
- 💱 Clean and intuitive crypto swap interface
- 🎨 Beautiful UI styled with Tailwind CSS
- 🔧 Built with Next.js and TypeScript
- 🌐 Deployed on Vercel

## 🔗 Live Demo

Check out the live version of the app:

👉 [https://btc-swap-qatta93s-projects.vercel.app/](https://btc-swap-qatta93s-projects.vercel.app/)

## 📦 Tech Stack

- [Next.js](https://nextjs.org/) – React framework for production
- [TypeScript](https://www.typescriptlang.org/) – Static typing for JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Crypto API](https://www.coingecko.com/en/api) – External API for crypto price data
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
