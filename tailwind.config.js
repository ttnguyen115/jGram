module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },

    theme: {
        colors: {
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

    variants: {
        extend: {
          display: ['group-hover']
        }
    }
};