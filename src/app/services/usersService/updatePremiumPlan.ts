import { User } from "../../entities/User";
import { httpClient } from "../httpClient";

type MeResponse = User;

export async function update({
  ...params
 }: MeResponse) {
  const { data } = await httpClient.put<MeResponse>(`users/me`, params);

  return data;
}
