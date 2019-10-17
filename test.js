const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const ripplePlugin = require('./index.js');

const generatePluginCss = config => {
    return postcss(
        tailwindcss(
            _.merge(
                {
                    theme: {
                        ripple: {
                            colors: {
                                black: '#000',
                            },
                        },
                    },
                    corePlugins: false,
                    plugins: [ripplePlugin()],
                },
                config
            )
        )
    )
        .process('@tailwind components', {
            from: undefined,
        })
        .then(result => {
            return result.css;
        });
};

expect.extend({
    toMatchCss: cssMatcher,
});

test('The plugin will generate a requested colour', () => {
    return generatePluginCss().then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-black {
                background-color: #000;
                background-position: center;
                transition: background 0.8s;
                }

                .ripple-bg-black:hover {
                background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
                }

                .ripple-bg-black:active {
                background-color: #000;
                background-size: 100%;
                transition: background 0s;
                }
            `);
    });
});

test('The plugin will generate a different colour', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    'purple-300': '#d6bcfa',
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-black {
                    background-color: #000;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-black:hover {
                    background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
                }

                .ripple-bg-black:active {
                    background-color: #000;
                    background-size: 100%;
                    transition: background 0s;
                }

                .ripple-bg-purple-300 {
                    background-color: #d6bcfa;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-purple-300:hover {
                    background: #A46AF4 radial-gradient(circle, transparent 1%, #A46AF4 1%) center/15000%;
                }

                .ripple-bg-purple-300:active {
                    background-color: #d6bcfa;
                    background-size: 100%;
                    transition: background 0s;
                }
            `);
    });
});
