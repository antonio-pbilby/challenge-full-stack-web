export interface Patient {
	name: string;
	document: string;
	email: string;
	phone?: string;
	birthDate?: Date;
	gender?: string;
	healthInsuranceId: string;
}
