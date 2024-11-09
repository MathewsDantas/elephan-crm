import express from "express";

import authRoutes from "./routes/authRoutes";
import pipelineRoutes from "./routes/pipelineRoutes";

const apiUrl = "/api/v1";

const app = express();
app.use(apiUrl, express.json());
app.use(apiUrl, authRoutes);
app.use(apiUrl, pipelineRoutes);

export default app;