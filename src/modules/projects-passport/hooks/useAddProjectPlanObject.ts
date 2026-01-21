import { ProjectPasswordService } from "@services/projects-passport.service";
import { showMessage } from "@shared/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddProjectPlanObject() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: addProjectPlanObject } = useMutation({
    mutationFn: (data: { id: number; name: string }) =>
      ProjectPasswordService.addProjectPlanObject(data),
    onSuccess: () => {
      showMessage("Object have been created successfully.", "success");
      queryClient.invalidateQueries({
        queryKey: ["projects-passport", "plan"],
      });
    },
  });

  return { isPending, addProjectPlanObject };
}
