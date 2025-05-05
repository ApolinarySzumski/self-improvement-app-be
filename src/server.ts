import cors from "cors";
import dotenv from "dotenv";
import express, { Response } from "express";
import winston from "winston";
import router from "./api.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/server.log",
    }),
  ],
});

app.use("/api", router);

app.use((_, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error: { message: string }, _: unknown, res: Response) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export { logger };
