require('dotenv').config({ path: '../.env' });

const port = process.env.PORT || 5000;
const target = `http://localhost:${port}/`;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
  devServer: {
    proxy: {
      '^/api': {
        target,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
