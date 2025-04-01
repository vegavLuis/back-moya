import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "./config.js";
import fileUpload from "express-fileupload";

import rutas from "./routes/index.js";

import connectHistoryApiFallback from "connect-history-api-fallback";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use("/api", rutas);

app.use(connectHistoryApiFallback());
app.use(express.static(path.join(__dirname, "public")));

app.set("puerto", config.PORT);

server.listen(config.PORT, async () => {
  console.log(`Server on port ${config.PORT} mode on port ${config.NODE_ENV}`);

  try {
    await mongoose.connect(config.DB);
    console.log("Conectado a la DB");
  } catch (error) {
    console.error(`Error al conectar a la DB: ${error.message}`);
    process.exit(1);
  }
});
