import bcrypt from "bcrypt";

export class EncryptionProvider {
	encrypt(value: string) {
		return bcrypt.hash(value, 10);
	}

	compare(value: string, encrypted: string) {
		return bcrypt.compare(value, encrypted);
	}
}
