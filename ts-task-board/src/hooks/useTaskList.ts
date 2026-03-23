import {useQuery} from "@tanstack/react-query";
import {fetchTasks} from "../apis/task";

export function useTaskList(status?: string) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => fetchTasks(status),
  });

  return {tasks: data?.data, isLoading, isError};
}
