module.exports = {
  entry: './src/index.ts',
  target: 'node',
  // default output dir
  // output: {
  //   path: __dirname + '/dist',
  //   filename: 'main.js'
  // },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
