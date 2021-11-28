const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

 module: {

   rules: [

     {

       test: /\.css$/i,

       use: ['style-loader', 'css-loader'],
     },
     {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: 'asset/resource',

      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader']
      }
    ],

 },
};