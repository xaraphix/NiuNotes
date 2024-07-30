/* @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindColors = require('./src-frontend/constants/tailwind.colors')

let config = {
    content: ['./App.{js,jsx,ts,tsx}', './src-frontend/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['SourceSans3'],
            heading: ['Nunito_Sans'],
        },
    },
    plugins: [],
}
config.theme.extend = { colors: { ...tailwindColors } }

module.exports = config
