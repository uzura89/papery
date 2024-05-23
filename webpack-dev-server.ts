// set environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import dotenv from "dotenv";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import http from "http";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

// import webpackConfig from "./webpack.config";
import expressConfig from "./src/server/express/config.express";

dotenv.config({
  path: ".local.env",
});

const compiler = webpack({
  mode: "development",
  entry: {
    login: ["./src/client/login.tsx", "./src/client/styles/app.css"],
    app: [
      "./src/client/index.tsx",
      "webpack-hot-middleware/client", // activate HMR on development
      "./src/client/styles/app.css",
    ],
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshPlugin()],
  target: ["web", "es5"],
});

const { app } = expressConfig();
const server = http.createServer(app);

/**
 * Configure express to use webpack-dev-middleware and webpack-hot-middleware
 */

app.use(
  webpackHotMiddleware(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
  })
);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/dist/",
  })
);

/**
 * Start Express server.
 */

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running as http://localhost: ${port}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
});
