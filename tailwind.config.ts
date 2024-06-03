/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  variants: {
    extend: {
      opacity: ['group-hover'],
      textColor: ['hover'],
    },
  },
  theme: {
    extend: {
      fontSize: {
        '2xs': '.6875rem',
      },
      fontFamily: {
        'nunito': ['var(--font-nunito)'], // Add 'nunito' as a new fontFamily
        'inter': ['var(--font-inter)'], // Add 'nunito' as a new fontFamily
        'roboto': ['var(--font-roboto-mono)'], // Add 'nunito' as a new fontFamily
        'signika': ['var(--font-signika)'], // Add 'Mono' as a new fontFamily
        'tilt': ['var(--font-tilt-neon)'], // Add 'Mono' as a new fontFamily
      },
      fontWeight: {
        'light': '300',
        'regular': '400',
        'semi-bold': '600',
        'bold': '700',
        'extrabold': '800',
        'superbold': '900',
      },
      opacity: {
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      colors: {
        'dgreen': {
          '500': '#95B6A1',
          '600': '#92AF9D',
          '700': '#90A899',
          '800': '#8DA294',
          '900': '#8A9B90',
          '1000': '#88948C',
          '1100': '#858D88',
          '1200': '#828684',
        },
        'dmauve': {
          '100': '#f0f1f5',
          '200': '#e1e2ea',
          '300': '#d2d4e0',
          '400': '#c3c6d5',
          '500': '#a5a9c0',
          '600': '#82879F',
          '700': '#707489',
          '800': '#5D6072',
          '900': '#4B4D5B',
          '1000': '#383A44',
          '1100': '#25262D',
        },
        'dorange': {
          '100': '#FFEEEA',
          '200': '#FFCCC1',
          '300': '#FFAA97',
          '400': '#FF886E',
          '500': '#FF7759',
          '600': '#DF684E',
          '700': '#BF5943',
          '800': '#9F4A38',
          '900': '#803B2C',
          '1000': '#602D21',
          '1100': '#401E16',
        },
        'dpink': {
          '100': '#EDD5F4',
          '200': '#E7C7F0',
          '300': '#E1B8ED',
          '400': '#DBAAE9',
          '500': '#D59CE6',
          '600': '#cf8ee2',
          '700': '#B57CC6',
          '800': '#9B6BA9',
          '900': '#81598D',
          '1000': '#684771',
        },
        'dblue': {
          '100': '#A6B7F1',
          '200': '#8FA5EE',
          '300': '#7993EB',
          '400': '#6281E7',
          '500': '#4C6FE4',
          '600': '#4361C8',
          '700': '#3953AB',
          '800': '#30458E',
          '900': '#263772',
          '1000': '#1C2A55',
        },
        'ddark': {
          '500': '#212121',
        },
        'dheader': {
          'dark': '#20282E',
        },
        'llamabg' : {
          'sand': '#D7DAD3',
        }
      },
    },
  },
}

