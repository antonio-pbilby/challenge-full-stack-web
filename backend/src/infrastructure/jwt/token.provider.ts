import jwt from "jsonwebtoken";

export class TokenProvider {
	sign(data: any, secret: string) {
		return jwt.sign(data, secret);
	}

	verify(token: string, secret: string) {
		return jwt.verify(token, secret);
	}
}
