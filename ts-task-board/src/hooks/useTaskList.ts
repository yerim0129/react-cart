import {useQuery} from "@tanstack/react-query";
import {fetchTasks} from "../apis/task";

export function useTaskList(status?: string, page?: number) {
  const {data, isLoading, isError } = useQuery({
    queryKey: ["tasks", status, page],
    queryFn: () => fetchTasks(status, page),
  });

  return {tasks: data?.data, isLoading, isError, total: data?.total};
}
