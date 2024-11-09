import express from "express";

import authRoutes from "./routes/authRoutes";
import pipelineRoutes from "./routes/pipelineRoutes";
import contactRoutes from "./routes/contactRoutes";

const apiUrl = "/api/v1";

const app = express();
app.use(apiUrl, express.json());
app.use(apiUrl, authRoutes);
app.use(apiUrl, pipelineRoutes);
app.use(apiUrl, contactRoutes);

export default app;