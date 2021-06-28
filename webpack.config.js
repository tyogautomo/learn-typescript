const path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') //__dirname is a global constant in nodejs environment (return the project root path)
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /basics/]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
