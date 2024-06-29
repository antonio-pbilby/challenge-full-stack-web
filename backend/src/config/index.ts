import dotenv from "dotenv";
dotenv.config();

export const config = {
	PORT: process.env.PORT || 3000,
	MONGODB_URI: process.env.MONGODB_URI || "",
	APP_SECRET: process.env.APP_SECRET || "",
	COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "",
};
