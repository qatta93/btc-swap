/**
 * Next.js configuration
 * 
 * This file includes configuration for the Next.js application,
 * including environment variables for Google Analytics that will be used in the future.
 */

const nextConfig = {
    reactStrictMode: true,
    env: {
        // Google Analytics configuration (to be filled in the future)
        // For development, analytics is disabled by default
        NEXT_PUBLIC_GA_ENABLED: process.env.NODE_ENV === 'production' ? 'true' : 'false',
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '', // Google Analytics ID (to be added in the future)
    },
};

module.exports = nextConfig;
