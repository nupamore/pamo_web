module.exports = {
    plugins: [
        "stylelint-prettier",
        "stylelint-order",
        "stylelint-config-rational-order/plugin",
    ],
    extends: [
        "stylelint-config-recommended",
        "stylelint-config-rational-order",
    ],
    rules: {
        "prettier/prettier": [
            true,
            { useTabs: false, tabWidth: 4, endOfLine: "auto" },
        ],
        "order/properties-order": [],
        "plugin/rational-order": [true, {}],
    },
};
