// next.config.mjs
import withPWA from "next-pwa";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },
    // Add any other Next.js config options here
};

const pwaConfig = {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    // You can add other Workbox options here if needed
};

export default withPWA(pwaConfig)(nextConfig);
