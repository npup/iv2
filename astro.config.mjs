import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
    server: {
        port: 3000,
    },
    integrations: [mdx(), svelte()],
    vite: {
        server: {
            https: true,
        },
        plugins: [basicSsl()],
    },
    outDir: "build",
});
