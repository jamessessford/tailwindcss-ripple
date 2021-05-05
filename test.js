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
                    theme: {},
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

const variablesCssSheet = `

:root {
    --test-color: dodgerblue;
}

@tailwind components;
`;


const generatePluginVariablesCss = config => {
    return postcss(
        tailwindcss(
            _.merge(
                {
                    theme: {},
                    corePlugins: false,
                    plugins: [ripplePlugin()],
                },
                config
            )
        )
    )
        .process(variablesCssSheet, {
            from: undefined,
        })
        .then(result => {
            return result.css;
        });
};

expect.extend({
    toMatchCss: cssMatcher,
});

test('The plugin will generate nothing if no colors are available', () => {
    return generatePluginCss().then(css => {
        expect(css).toMatchCss(``);
    });
});

test('The plugin works with named colors', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    dodgerblue: 'dodgerblue',
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-dodgerblue {
                    background-color: dodgerblue;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-dodgerblue:hover {
                    background: #0074E4 radial-gradient(circle, transparent 1%, #0074E4 1%) center/15000%;
                }

                .ripple-bg-dodgerblue:active {
                    background-color: dodgerblue;
                    background-size: 100%;
                    transition: background 0s;
                }
            `);
    });
});

test('The plugin will generate a requested colour', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    black: '#000',
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

test('The plugin will generate colors from a map', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-map-one {
                    background-color: #000;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-map-one:hover {
                    background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
                }

                .ripple-bg-map-one:active {
                    background-color: #000;
                    background-size: 100%;
                    transition: background 0s;
                }

                .ripple-bg-map-two {
                    background-color: #fff;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-map-two:hover {
                    background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
                }

                .ripple-bg-map-two:active {
                    background-color: #fff;
                    background-size: 100%;
                    transition: background 0s;
                }
            `);
    });
});

test('The plugin can accept a parameter for the darken value', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                darken: 0.1
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-map-one {
                    background-color: #000;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-map-one:hover {
                    background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
                }

                .ripple-bg-map-one:active {
                    background-color: #000;
                    background-size: 100%;
                    transition: background 0s;
                }

                .ripple-bg-map-two {
                    background-color: #fff;
                    background-position: center;
                    transition: background 0.8s;
                }

                .ripple-bg-map-two:hover {
                    background: #E6E6E6 radial-gradient(circle, transparent 1%, #E6E6E6 1%) center/15000%;
                }

                .ripple-bg-map-two:active {
                    background-color: #fff;
                    background-size: 100%;
                    transition: background 0s;
                }
            `);
    });
});

test('The plugin uses the darken value', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                darken: 0.2
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
            .ripple-bg-map-one {
                background-color: #000;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-one:hover {
                background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
            }

            .ripple-bg-map-one:active {
                background-color: #000;
                background-size: 100%;
                transition: background 0s;
            }

            .ripple-bg-map-two {
                background-color: #fff;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-two:hover {
                background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
            }

            .ripple-bg-map-two:active {
                background-color: #fff;
                background-size: 100%;
                transition: background 0s;
            }
            `);
    });
});

test('The plugin rejects a dud darken value and uses the default', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                darken: 'dudvalue'
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
            .ripple-bg-map-one {
                background-color: #000;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-one:hover {
                background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
            }

            .ripple-bg-map-one:active {
                background-color: #000;
                background-size: 100%;
                transition: background 0s;
            }

            .ripple-bg-map-two {
                background-color: #fff;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-two:hover {
                background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
            }

            .ripple-bg-map-two:active {
                background-color: #fff;
                background-size: 100%;
                transition: background 0s;
            }
            `);
    });
});

test('The plugin rejects too low a darken value and uses the default', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                darken: -0.5
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
            .ripple-bg-map-one {
                background-color: #000;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-one:hover {
                background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
            }

            .ripple-bg-map-one:active {
                background-color: #000;
                background-size: 100%;
                transition: background 0s;
            }

            .ripple-bg-map-two {
                background-color: #fff;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-two:hover {
                background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
            }

            .ripple-bg-map-two:active {
                background-color: #fff;
                background-size: 100%;
                transition: background 0s;
            }
            `);
    });
});

test('The plugin rejects too high a darken value and uses the default', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                darken: 1.2
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
            .ripple-bg-map-one {
                background-color: #000;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-one:hover {
                background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
            }

            .ripple-bg-map-one:active {
                background-color: #000;
                background-size: 100%;
                transition: background 0s;
            }

            .ripple-bg-map-two {
                background-color: #fff;
                background-position: center;
                transition: background 0.8s;
            }

            .ripple-bg-map-two:hover {
                background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
            }

            .ripple-bg-map-two:active {
                background-color: #fff;
                background-size: 100%;
                transition: background 0s;
            }
            `);
    });
});

test('The plugin will accept transition modifiers', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                modifierTransition: 'background 0.2s',
                activeTransition: 'background 0.1s'
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-map-one {
                    background-color: #000;
                    background-position: center;
                    transition: background 0.2s;
                }

                .ripple-bg-map-one:hover {
                    background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
                }

                .ripple-bg-map-one:active {
                    background-color: #000;
                    background-size: 100%;
                    transition: background 0.1s;
                }

                .ripple-bg-map-two {
                    background-color: #fff;
                    background-position: center;
                    transition: background 0.2s;
                }

                .ripple-bg-map-two:hover {
                    background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
                }

                .ripple-bg-map-two:active {
                    background-color: #fff;
                    background-size: 100%;
                    transition: background 0.1s;
                }
            `);
    });
});

test('The plugin will use default transition modifiers', () => {
    return generatePluginCss({
        theme: {
            ripple: {
                colors: {
                    map: {
                        one: '#000',
                        two: '#fff',
                    },
                },
                modifierTransition: 'background 0.2s'
            },
        },
    }).then(css => {
        expect(css).toMatchCss(`
                .ripple-bg-map-one {
                    background-color: #000;
                    background-position: center;
                    transition: background 0.2s;
                }

                .ripple-bg-map-one:hover {
                    background: #000000 radial-gradient(circle, transparent 1%, #000000 1%) center/15000%;
                }

                .ripple-bg-map-one:active {
                    background-color: #000;
                    background-size: 100%;
                    transition: background 0s;
                }

                .ripple-bg-map-two {
                    background-color: #fff;
                    background-position: center;
                    transition: background 0.2s;
                }

                .ripple-bg-map-two:hover {
                    background: #CCCCCC radial-gradient(circle, transparent 1%, #CCCCCC 1%) center/15000%;
                }

                .ripple-bg-map-two:active {
                    background-color: #fff;
                    background-size: 100%;
                    transition: background 0s;
                }
            `);
    });
});
