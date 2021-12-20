const path = require('path')

module.exports = {
  // webpack 要打包輸入的檔案位置
  entry: './src/index.ts',
  // 通常都是放置 Loader 相關設定 —— 其中 TypeScript 相關檔案都會經由 ts-loader 進行編譯處理的動作
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  
  resolve: {
    extensions: ['.ts', '.js']
  },

  //Webpack 打包過後的專案輸出點
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}