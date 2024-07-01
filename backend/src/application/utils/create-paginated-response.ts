import type {
	PaginatedResponse,
	PaginationResponse,
} from "../../interfaces/pagination.interface";

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
