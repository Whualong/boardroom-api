import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
plugins: [vue()],
resolve: {
alias: {
'@': resolve(__dirname, 'src'), // 将 @ 替换为 src 目录
'@components': resolve(__dirname, 'src/components') // 将 @components 替换为 src/components 目录
},
extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
}
});