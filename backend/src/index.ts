import express, { json } from "express";
import { config } from "./config";
import { router } from "./routes";
import { connectDB } from "./mongo";

const start = async () => {
	await connectDB();

	const app = express();

	app.use(json());

	app.use("/", router);

	app.listen(config.serverPort, () => {
		console.log(`Server running on port ${config.serverPort}`);
	});
};

start();
