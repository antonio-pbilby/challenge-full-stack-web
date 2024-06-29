import express, { json } from "express";
import { config } from "./config";
import { router } from "./routes";
import { connectDB } from "./mongo";
import { errorHandler } from "./middlewares/error-handler.middleware";

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
