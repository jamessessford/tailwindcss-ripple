# Ripple Plugin for Tailwind CSS

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
  background: #A5B7D0 radial-gradient(circle, transparent 1%, #A5B7D0 1%) center/15000%;
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
