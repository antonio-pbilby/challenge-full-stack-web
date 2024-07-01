export interface Pagination {
	page: number;
	pageSize: number;
}

export interface PaginationResponse {
	page: number;
	pageSize: number;
	totalItems: number;
}

export interface PaginatedResponse<T> {
	pagination: PaginationResponse;
	data: T[];
}
