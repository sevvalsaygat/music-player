import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@app/components": path.resolve(__dirname, "./src/components"),
			"@app/data": path.resolve(__dirname, "./src/data"),
			"@app/hooks": path.resolve(__dirname, "./src/hooks"),
		},
	},
	plugins: [react()],
});
