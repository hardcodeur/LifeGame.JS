const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
    mode: 'development',
    entry: './src/index.ts', // Point d'entrée TypeScript
    output: {
      filename: 'bundle.js', // Fichier de sortie JavaScript
      path: path.resolve(__dirname, 'dist'), // Répertoire de sortie
      publicPath: '/dist/' // URL publique du répertoire de sortie
    },
    resolve: {
      extensions: ['.ts', '.js'] // Extensions à prendre en charge
    },
    module: {
      rules: [
        { // Règle pour compiler le TypeScript
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.test.ts$/,
          include: /tests/,
          use: 'ts-loader'
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/styles.css' // Chemin du fichier CSS de sortie
      }),
    ],
  };
