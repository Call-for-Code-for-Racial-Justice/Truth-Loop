require('dotenv').config({ path: '.env' });

const server = process.env.SERVER_URL || 'localhost:5000';
const target = `http://${server}/`;

module.exports = {
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
