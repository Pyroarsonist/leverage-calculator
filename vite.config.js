import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'robots.txt'],
            manifest: {
                name: 'Leverage Calculator',
                short_name: 'LevCalc',
                description: 'Calculate leverage for trading positions',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: 'favicon.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml',
                    },
                    {
                        src: 'favicon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                    },
                    {
                        src: 'favicon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
    base: '/leverage-calculator/', // Base path for GitHub Pages
});
