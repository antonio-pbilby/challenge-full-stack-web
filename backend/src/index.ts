import "reflect-metadata";
import "./container";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import { config } from "./config";
import { connectDB } from "./infrastructure/mongodb/connect";
import { errorHandler } from "./interfaces/http/express/middlewares/error-handler.middleware";
import { router } from "./interfaces/http/express/routes";

const start = async () => {
	await connectDB();

	const app = express();

	app.use(
		cors({
			credentials: true,
			origin: "http://localhost:3002",
		}),
	);
	app.use(json());
	app.use(cookieParser());

	app.use("/", router);
	app.use(errorHandler);

	app.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
};

start();
