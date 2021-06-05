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
}
