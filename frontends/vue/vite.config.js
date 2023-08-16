const { createVuePlugin } = require('vite-plugin-vue2');
import path from "path";

module.exports = {
  plugins: [createVuePlugin()],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "./*": path.resolve(__dirname, "./src/*"),
      "@/*": path.resolve(__dirname, "./src/*"),
      },
  },
};