import vue from '@vitejs/plugin-vue'

const path = require('path');

export default {
	plugins: [ vue() ],
	alias: [
	  {
		  find: "@",
		  replacement: path.resolve(__dirname, './src')
	  }
	],
	server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
}
