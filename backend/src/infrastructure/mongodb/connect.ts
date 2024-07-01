import mongoose from "mongoose";
import { config } from "../../config";

export const connectDB = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("Failed to connect MongoDB", error);
		process.exit(-1);
	}
};
