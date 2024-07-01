export interface Patient {
	_id: string;
	name: string;
	document: string;
	email: string;
	phone?: string | null;
	birthDate?: Date | null;
	gender?: string | null;
	healthInsuranceId: string;
	createdAt: Date;
	createdBy: string;
	updatedAt: Date;
	updatedBy: string;
	deletedAt?: Date | null;
	deletedBy?: string | null;
}
