module.exports = {
  content: ['./**/*.html', '!./node_modules/**'],
  theme: {
    extend: {
      colors: {
        ink: '#141110',
        surface: '#1b1613',
        elevated: '#231c18',
        copper: '#c9702f',
        'copper-light': '#e2924f',
        brass: '#b8823f',
        sand: '#e9dfd2',
        fog: '#a89a8c',
        live: '#7fb88a',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Hanken Grotesk', 'sans-serif'],
      },
    },
  },
}
