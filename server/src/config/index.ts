import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8080;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME || "30s";
const REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME || "40s";

const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:5173";

const corsOptions: cors.CorsOptions = {
  origin: FRONT_END_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const config = {
  mongo: {
    uri: MONGO_URI,
  },
  server: {
    port: SERVER_PORT,
    corsOptions,
    auth: {
      accessTokenSecret: ACCESS_TOKEN_SECRET,
      accessTokenExpirationTime: ACCESS_TOKEN_EXPIRATION_TIME,
      refreshTokenSecret: REFRESH_TOKEN_SECRET,
      refreshTokenExpirationTime: REFRESH_TOKEN_EXPIRATION_TIME,
    },
  },
  frontEndUri: FRONT_END_URL,
};

export default config;
