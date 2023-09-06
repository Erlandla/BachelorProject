/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'background': '#E3EDF5',
      'text': '#0D264A',
      'white':'#ffffff',
      'buttonDark': '#0D264A',
      'buttonLight':'#00527a',
      'buttonHover':'#3d3f6b',
      'textLight':'#3969AD',
      'statusGreen':'#2BB728',
      'statusOrange':'#F0AE2F',
      'statusRed':'#FF002F',
      'black':'#000000',
      'footer':'#14325E',
      'linkBlue': '#337FEC',
      'menuBackground': '#EDEFF4',
      'ODA1':'#f8c829',
      'ODA2':'#ff3c00',
      'ODA3':'#ff001f',
      'ODA4':'#8600b4',
      'menuHover': '#F5F5F5'
    },
    
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      dropShadow: {
        '3xl': '0 15px 15px rgba(0,82, 122, 0.50)',
      },
      screens: {
        '3xl': '1700px',
        '4xl': '2000px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
