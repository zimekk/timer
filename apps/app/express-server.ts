import express from "express";

// the express handler should be exported as app
export const app = express();

app.get("/test", (_req, res) => res.json({ status: "ok" }));

console.log(1);

// When running from `vite` there is no need to call `app.listen`
if (!process.env["VITE"]) {
  app.listen(3002, () => console.log("Started"));
}
