// tailwind.config.js
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',  // Les fichiers de pages de Next.js
      './components/**/*.{js,ts,jsx,tsx}', // Les composants de votre application
      './app/**/*.{js,ts,jsx,tsx}', // Si vous utilisez le dossier `app` (app directory)
    ],
    theme: {
      extend: {
      },
    },
    plugins: [],
  }
  