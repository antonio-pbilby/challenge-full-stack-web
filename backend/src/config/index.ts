import dotenv from "dotenv";
dotenv.config();

export const config = {
	serverPort: process.env.PORT || 3000,
	mongoUri: process.env.MONGODB_URI || "",
};
