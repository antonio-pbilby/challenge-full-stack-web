interface PaginationResponse {
	page: number;
	pageSize: number;
	totalItems: number;
}

export const createPaginatedResponse = <T>(
	data: T,
	{ page, pageSize, totalItems }: PaginationResponse,
) => ({
	pagination: {
		page,
		pageSize,
		totalItems,
	},
	data,
});
