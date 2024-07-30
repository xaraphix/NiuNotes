/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const { withMaterialColors } = require('tailwind-material-colors')
let confWithColors = withMaterialColors(
    {},
    {
        primary: '#6445ca',
        secondary: '#394ddb',
        tertiary: '#bc0052',
        green: '#00d690',
        red: '#ff214f',
    }
)

const tailwindColors = confWithColors.theme.colors
module.exports = tailwindColors
