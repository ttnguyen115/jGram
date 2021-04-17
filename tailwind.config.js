module.exports = {
    // plugins: [require('tailwindcss'), require('autoprefixer')],
    
    future: {
        removeDeprecatedGapUtilities: true,
    },

    theme: {
        colors: {
            fill: (theme) => ({
                red: theme('colors.red.primary')
            }),

            white: '#fff',
            
            blue: {
                medium: '#005c98', 
            },

            black: {
                light: '#262626',
                faded: '#00000059',
            },

            gray: {
                base: '#616161',
                background: '#fafafa',
                primary: '#dbdbdb',
            },

            red: {
                primary: '#ed4956'
            },
        },
    },
};