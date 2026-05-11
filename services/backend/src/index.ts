// apps/backend/src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import caregiverRoutes from "./Routes/caregiverRoutes";
import braceletRoutes from "./Routes/braceletRoutes";
import userRoutes from "./Routes/userRoutes";
import recordRoutes from "./Routes/recordRoutes";

const app = new Hono();

app.route('/caregiver', caregiverRoutes);
app.route('/bracelet', braceletRoutes);
app.route('/user', userRoutes);
app.route('/record', recordRoutes);

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
