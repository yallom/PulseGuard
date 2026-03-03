// apps/backend/src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors(
    {
        origin: "http://localhost:5173",
        allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }
));

app.get("/health", (c) => c.json({ ok: true , data: "Backend is healthy!"}));


export default {
  port: 3000,
  fetch: app.fetch,
};
