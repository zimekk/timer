import "dotenv/config";
// https://github.com/vikejs/vike/blob/main/examples/auth/server/index.js
import express from "express";
import { renderPage } from "vike/server";
import { root } from "./root.js";

import { remote } from "../remote/index.js";

setInterval(remote, 5000);

const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 8080);

startServer();

async function startServer() {
  const app = express();
  auth(app);
  await assets(app);
  vike(app);
  const server = app.listen(port, () =>
    console.log(
      `Server running at http://localhost:${((address) => typeof address !== "string" && address.port)(server.address())}`,
    ),
  );
}

function auth(app) {
  app.get("/auth", (req, res) => res.json({ status: "ok" }));
}

async function assets(app) {
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }
}

function vike(app) {
  app.get("*name", async (req, res, next) => {
    const userAgent = req.headers["user-agent"];
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      userAgent,
      user: req.user,
      userFullName: req.user?.fullName,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints)
        res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      httpResponse.pipe(res);
    }
  });
}
