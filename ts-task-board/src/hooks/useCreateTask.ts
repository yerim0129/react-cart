import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask} from "../apis/task";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
  return mutation;
}
