import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')

export default {
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html')
			}
		}
	}
}
