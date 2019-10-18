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
        colors: theme('colors'),
    }),
  },
  plugins: [
    require('tailwindcss-ripple')(),
  ],
}
```

The default configuration generates the following a ripple effect for each color in your theme :

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

[![Build Status](https://travis-ci.org/jamessessford/tailwindcss-ripple.svg?branch=master)](https://travis-ci.org/jamessessford/tailwindcss-ripple)
[![Coverage Status](https://coveralls.io/repos/github/jamessessford/tailwindcss-ripple/badge.svg?branch=master)](https://coveralls.io/github/jamessessford/tailwindcss-ripple?branch=master)
