const _ = require('lodash');
const Color = require('color');

module.exports = function() {
    return ({ theme, e, addComponents }) => {
        const defaultBgColors = {};
        const rippleBgColors = theme('ripple.colors', defaultBgColors);

        function returnColorPair([modifier, value]) {
            return [
                `${modifier}`,
                {
                    backgroundColor: value,
                    backgroundPosition: 'center',
                    transition: 'background 0.8s',
                    '&:hover': {
                        background: `${Color(value)
                            .darken(0.2)
                            .hex()
                            .toString()} radial-gradient(circle, transparent 1%, ${Color(
                            value
                        )
                            .darken(0.2)
                            .hex()
                            .toString()} 1%) center/15000%`,
                    },
                    '&:active': {
                        backgroundColor: value,
                        backgroundSize: '100%',
                        transition: 'background 0s',
                    },
                },
            ];
        }

        const allTheColors = _(rippleBgColors)
            .flatMap((value, modifier) => {
                if (typeof value == 'object') {
                    return _.map(value, (v, m) => {
                        return [`.${e(`ripple-bg-${modifier}-${m}`)}`, v];
                    });
                }
                if (
                    typeof value == 'string' &&
                    value.length > 1 &&
                    value.charAt(0) == '#'
                ) {
                    return [[`.${e(`ripple-bg-${modifier}`)}`, value]];
                }
                return [];
            })
            .value();

        const components = _.fromPairs(
            _.map(allTheColors, (color, index) => {
                return returnColorPair(color);
            })
        );

        addComponents(components);
    };
};
