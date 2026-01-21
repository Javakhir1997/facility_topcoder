import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    logLevel: 'silent',
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    server: {
        // host: '127.7.7.7',
        open: true,
        port: 3000
    },
    resolve: {
        alias: {
            "@configurations": path.resolve(__dirname, "./src/configurations"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@modules": path.resolve(__dirname, "./src/modules"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@shared": path.resolve(__dirname, "./src/shared"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@app": path.resolve(__dirname, "./src"),
            "@entities": path.resolve(__dirname, "./src/entities"),
        }
    }
})
