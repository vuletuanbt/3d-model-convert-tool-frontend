module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: `${process.env.VUE_APP_BACKEND_URL}/`
      },
    },
  },
};
