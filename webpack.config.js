const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDevelopment = process.env.NODE_ENV !== "production";

const webpackConfig = {
  mode: "production",
  entry: {
    login: ["./src/client/login.tsx", "./src/client/styles/app.css"],
    app: ["./src/client/index.tsx", "./src/client/styles/app.css"],
  },
  output: {
    path: `${__dirname}/public/dist`,
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/dist/",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: isDevelopment
          ? ["style-loader", "css-loader", "postcss-loader"] // inject css to bundle.js on development
          : [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // make separate css file on production
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // new BundleAnalyzerPlugin(),
    // terser
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // remove console.log
          },
          mangle: true, // This option reduces names of local variables and top-level functions and classes to shorter ones.
        },
        parallel: true, // use multi-process parallel running to improve the build speed
      }),
    ],
  },

  target: ["web", "es5"],
};

module.exports = webpackConfig;
