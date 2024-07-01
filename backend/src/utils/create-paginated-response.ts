interface PaginationResponse {
	page: number;
	pageSize: number;
	totalItems: number;
}

export interface PaginatedResponse<T> {
	pagination: PaginationResponse;
	data: T[];
}

export const createPaginatedResponse = <T>(
	data: T[],
	{ page, pageSize, totalItems }: PaginationResponse,
): PaginatedResponse<T> => ({
	pagination: {
		page,
		pageSize,
		totalItems,
	},
	data,
});
