# Ripple Plugin for Tailwind CSS

## Inspired By

An excellent [Codepen](https://codepen.io/finnhvman/pen/jLXKJw) by [Ben Szabo](https://codepen.io/finnhvman).

## Installation

```bash
npm install tailwindcss-ripple
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    ripple: theme => ({
        colors: theme('colors')
    }),
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
}
```

The default configuration generates the following ripple effect for each color in your theme :

```css
...

.ripple-bg-gray-300 {
    background-color: #e2e8f0;
    background-position: center;
    transition: background 0.8s;
}

.ripple-bg-gray-300:hover {
    background: #a5b7d0 radial-gradient(circle, transparent 1%, #a5b7d0 1%) center/15000%;
}

.ripple-bg-gray-300:active {
    background-color: #e2e8f0;
    background-size: 100%;
    transition: background 0s;
}

...
```

Which you can then use in your HTML like this:

```html
<button class="ripple-bg-gray-300">
    Hover me for a lighter background, click me for a ripple effect
</button>
```

## The Ripple Effect

By default, the color generated for the ripple effect is a 20% darken of the supplied color. This can be customised by passing in a parameter in your tailwind config file.

```js
// tailwind.config.js
{
  theme: {
    ripple: theme => ({
        colors: theme('colors'),
        darken: 0.1
    }),
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
}
```

[![Build Status](https://travis-ci.org/jamessessford/tailwindcss-ripple.svg?branch=master)](https://travis-ci.org/jamessessford/tailwindcss-ripple)
[![Coverage Status](https://coveralls.io/repos/github/jamessessford/tailwindcss-ripple/badge.svg?branch=master)](https://coveralls.io/github/jamessessford/tailwindcss-ripple?branch=master)
