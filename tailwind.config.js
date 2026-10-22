// Colours are CSS variables (space-separated RGB) so a section can flip to the
// dark "on-ink" palette by redefining them; see :root and .on-ink in site.css.
// The names are kept from the dark theme so no page markup had to change:
// ink = page background, sand = primary text, fog = secondary text.
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ['./**/*.html', '!./node_modules/**'],
  theme: {
    extend: {
      colors: {
        ink: v('ink'),
        surface: v('surface'),
        elevated: v('elevated'),
        copper: v('copper'),
        'copper-light': v('copper-light'),
        brass: v('brass'),
        sand: v('sand'),
        fog: v('fog'),
        live: v('live'),
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
}
