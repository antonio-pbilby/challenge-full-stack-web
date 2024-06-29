import "reflect-metadata";
import "./container";
import express, { json } from "express";
import { config } from "./config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { connectDB } from "./mongo";
import { router } from "./routes";

const start = async () => {
	await connectDB();

	const app = express();

	app.use(json());

	app.use("/", router);
	app.use(errorHandler);

	app.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
};

start();
