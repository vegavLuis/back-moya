import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Obtener el nombre de archivo y directorio con ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determinar el archivo .env según el entorno
const envFile = process.env.NODE_ENV === "production" ? ".produc.env" : ".env";

// Cargar las variables de entorno desde el archivo adecuado
dotenv.config({
  path: path.resolve(__dirname, envFile),
});

// Configuración
const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 32134,
  DB: process.env.MONGO_URI || "db",
  JWT: process.env.JWT_SECRET || "abc",
};

// Exportar el objeto config
export default config;
