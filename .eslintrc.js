module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:jest/recommended", "prettier"],
  globals: {
    artifacts: false,
    assert: false,
    contract: false
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["jest"],
  rules: {
    camelcase: [
      "error",
      {
        properties: "always"
      }
    ]
  }
}
