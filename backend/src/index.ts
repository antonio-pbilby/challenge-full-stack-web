import "reflect-metadata";
import "./container";
import express, { json } from "express";
import { config } from "./config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { connectDB } from "./mongo";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const start = async () => {
	await connectDB();

	const app = express();

	app.use(cors());
	app.use(json());
	app.use(cookieParser());

	app.use("/", router);
	app.use(errorHandler);

	app.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
};

start();
