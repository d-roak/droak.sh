const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.ts"),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ ".ts", ".js"],
    fallback: {
      "crypto": false,
      "path": false,
      "fs": false,
      "perf_hooks": false,
    }
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "public", "static", "bundle"),
  },
};
