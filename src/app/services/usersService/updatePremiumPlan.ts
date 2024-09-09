import { User } from "../../entities/User";
import { httpClient } from "../httpClient";

type MeResponse = User;

export async function update({
  id
 }: MeResponse) {
  const { data } = await httpClient.put(`/me`,);

  return data;
}
