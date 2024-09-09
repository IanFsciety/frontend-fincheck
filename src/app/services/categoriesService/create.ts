import { httpClient } from "../httpClient";

export interface CreateCategoryParams {
  name: string;
	type: 'INCOME' | 'EXPENSE';
  icon: string;
}

export async function create(params: CreateCategoryParams) {
  const { data } = await httpClient.post('/categories', params);

  return data;
}
