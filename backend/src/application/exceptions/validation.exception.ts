import { AppException } from "./app.exception";

export class ValidationException extends AppException {
	constructor(errors: object[]) {
		super(400, "Validation Error", errors);
	}
}
