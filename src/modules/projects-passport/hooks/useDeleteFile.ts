import { ProjectPasswordService } from "@services/projects-passport.service";
import { showMessage } from "@shared/utilities";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteFile() {
  const { isPending, mutateAsync: deleteFile } = useMutation({
    mutationFn: (id:number |undefined) =>
      ProjectPasswordService.deleteFile(id),
    onSuccess:()=>showMessage("File has been deleted successfully","success")
  });
  return { isPending, deleteFile };
}
