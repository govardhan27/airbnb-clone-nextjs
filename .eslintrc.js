module.exports = {
    "env": {
        "commonjs": true,
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": ["error", { "singleQuote": true }],
        "jsx-quotes": ["error", "prefer-single"]


    }
};