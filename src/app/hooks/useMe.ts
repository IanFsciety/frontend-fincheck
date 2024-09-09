import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";

export function useCategories() {
  const { data, isFetching} = useQuery({
    queryKey: ['me'],
    queryFn: usersService.me,
  });

  return { data, isFetching };
}
