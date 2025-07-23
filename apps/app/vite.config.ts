import react from "@vitejs/plugin-react";
// eslint-disable-next-line
import vike from "vike/plugin";
import { defineConfig } from "vite";

const { PORT = 8080 } = process.env;

const port = Number(PORT);

// https://github.com/noam-honig/vite3-plugin-express
function express(path: string) {
  return {
    name: "vite3-plugin-express",
    configureServer: async (server: any) => {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        process.env["VITE"] = "true";
        try {
          const { app } = await server.ssrLoadModule(path);
          app(req, res, next);
        } catch (err) {
          console.error(err);
        }
      });
    },
  };
}

export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [react(), vike(), express("express-server.ts")],
  // https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa
  preview: {
    host: true,
    port,
    strictPort: true,
  },
  server: {
    port,
    strictPort: true,
  },
});
