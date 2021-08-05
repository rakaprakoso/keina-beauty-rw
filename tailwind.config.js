const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require("tailwindcss/colors");

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            colors:{
                primary:'#2a3f2b',
                primaryDark: '#24262b',
                ...colors,
            },
            fontFamily: {
                sans: ['Poppins','Nunito', ...defaultTheme.fontFamily.sans],
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

    plugins: [require('@tailwindcss/forms')],
};
