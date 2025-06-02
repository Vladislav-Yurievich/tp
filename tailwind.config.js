/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#E5F6FF',
          100: '#CCE9FF',
          500: '#00A3FF',
          600: '#0082CC',
          700: '#006299',
        },
        red: {
          50: '#FFF1F1',
          100: '#FFE2E2',
          500: '#FF4D4D',
          700: '#CC0000',
        },
        green: {
          50: '#F0FFF4',
          100: '#DCFFE4',
          500: '#38C172',
          700: '#2B9453',
        },
        purple: {
          50: '#F6F4FF',
          100: '#EDE9FF',
          500: '#9061F9',
          700: '#6D41C6',
        },
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        }
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
    },
  },
  plugins: [],
}
