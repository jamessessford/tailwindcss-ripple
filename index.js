const _ = require('lodash');
const Color = require('color');

module.exports = function() {
    return ({ theme, e, addComponents, postcss }) => {
        const defaultBgColors = {};
        const rippleBgColors = theme('ripple.colors', defaultBgColors);
        const defaultDarkenValue = 0.2;
        let darkenValue = theme('ripple.darken', defaultDarkenValue);
        if (isNaN(darkenValue) || darkenValue > 1 || darkenValue < 0) {
            darkenValue = defaultDarkenValue;
        }

        function returnColorPair([modifier, value]) {
            return [
                `${modifier}`,
                {
                    backgroundColor: value,
                    backgroundPosition: 'center',
                    transition: 'background 0.8s',
                    '&:hover': {
                        background: `${Color(value)
                            .darken(darkenValue)
                            .hex()
                            .toString()} radial-gradient(circle, transparent 1%, ${Color(
                            value
                        )
                            .darken(darkenValue)
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
                    value.length > 1
                ) {
                    try {
                        Color(value)
                    } catch (err) {
                        return [];
                    }
                    return [[`.${e(`ripple-bg-${modifier}`)}`, value]];
                }
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
