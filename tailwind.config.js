/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    100: '#1a1a1a',
                    200: '#2a2a2a',
                    300: '#3a3a3a',
                    400: '#4a4a4a',
                    500: '#5a5a5a',
                },
                accent: {
                    100: '#3b82f6',
                    200: '#1d4ed8',
                    300: '#1e40af',
                },
            },
            animation: {
                gradient: 'gradient 15s ease infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
        },
    },
    plugins: [],
}
