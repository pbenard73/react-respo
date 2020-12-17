const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const nodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    mode: "production",
    entry: "./src/export.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs",
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(sc|c)ss$/,
               // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                use: ['style-loader', "css-loader", "sass-loader"],
                include: path.resolve(__dirname, "./src"),
            },
        ],
    },
}
