import { httpClient } from "../httpClient";
import { CreateTransactionParams } from "./create";

export interface updateTransactionParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
	type: 'INCOME' | 'EXPENSE';
}

export async function update({
  id,
  ...params
 }: updateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
