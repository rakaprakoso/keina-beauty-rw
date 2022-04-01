const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                primary: '#2a3f2b',
                primaryDark: '#24262b',
                ...colors,
            },
            fontFamily: {
                sans: ['Poppins', 'Nunito', ...defaultTheme.fontFamily.sans],
            },
            padding: {
                half: '50%',
                full: '100%',
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({ addComponents, theme }) {
            const screens = theme("screens", {});
            addComponents([
                {
                    ".container": { width: "100%" },
                },
                {
                    [`@media (min-width: ${screens.sm})`]: {
                        ".container": {
                            "max-width": "640px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens.md})`]: {
                        ".container": {
                            "max-width": "768px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens.lg})`]: {
                        ".container": {
                            "max-width": "1024px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens.xl})`]: {
                        ".container": {
                            "max-width": "1280px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens["2xl"]})`]: {
                        ".container": {
                            "max-width": "1280px",
                        },
                    },
                },
            ]);
        }),
    ],
};
