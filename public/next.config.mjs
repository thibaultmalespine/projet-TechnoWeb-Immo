/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        if (process.env.NODE_ENV === "development") {
          config.watchOptions = {
            poll: 1000, // Vérifie les changements toutes les secondes
            aggregateTimeout: 300,
          };
        }
        return config;
      },
};

export default nextConfig;
