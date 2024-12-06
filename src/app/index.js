import cluster from "node:cluster";
import http from "node:http";
import fs from "fs";
import { availableParallelism } from "node:os";
import process from "node:process";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { handlePostgreSQLClientAction } from "../db/postgreSQL/index.js";
import { errorHandler } from "../middlewares/index.js";
import { sessionConfig } from "../config/session/index.js";
import { handleRedisClientConnectionAction } from "../db/redis/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { handleRequestTimeoutAction } from "../middlewares/index.js";
import { handleCorsAction } from "../config/cors/index.js";

import { handleWebsocketConnectionsAction } from "../websocket/index.js";

import { handleInitializeRoutesAction } from "../routes/index.js";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  (async () => {

    try {
      const postgreSQLClientResponse = await handlePostgreSQLClientAction();
      if (postgreSQLClientResponse?.success) {
        console.log(postgreSQLClientResponse?.message);
      } else {
        process.exit(1);
      }
    } catch (error) {
      console.error("Error connecting to PostgreSQL client:", error);
      process.exit(1);
    }

    try {
      const redisClientResponse = await handleRedisClientConnectionAction();
      if (redisClientResponse?.success) {
        console.log(redisClientResponse?.message);
      } else {
        process.exit(1);
      }
    } catch (error) {
      console.error("Error connecting to Redis client:", error);
      process.exit(1);
    }
  })();

  // Primary process listens on the port
  const httpServer = http.createServer();
  httpServer.listen(3060);

  // Setting up sticky session handling for load balancing
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  setupPrimary();
  cluster.setupPrimary({
    serialization: "advanced",
  });

  // Forking workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    if (!worker.exitedAfterDisconnect) {
      cluster.fork();
    }
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);


  app.use(cors(handleCorsAction));

  app.use(handleRequestTimeoutAction(5000)); 

  app.use(
    fileUpload({
      limits: { fileSize: 10 * 1024 * 1024 },
      abortOnLimit: true,
      createParentPath: true,
      useTempFiles: false,
      //debug: true,
    })
  );

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(compression({ level: 9 }));
  app.use(session(sessionConfig));

  // Static files directory entry point handler
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicDirectoryPath = path.join(__dirname, "../public");
  app.use(express.static(publicDirectoryPath));


  handleInitializeRoutesAction(app, io);

  app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route Not Found" });
  });

  app.use((err, req, res, next) => errorHandler(err, req, res, next));


  io.adapter(createAdapter());
  setupWorker(io);


  await handleWebsocketConnectionsAction(io);
}
