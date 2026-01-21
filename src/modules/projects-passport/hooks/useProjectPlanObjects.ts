import { ProjectPasswordService } from "@services/projects-passport.service";
import { useQuery } from "@tanstack/react-query";

export default function useProjectPlanObjects() {
  const { isPending, data } = useQuery({
    queryKey: ["projects-passport", "plan"],
    queryFn: () => ProjectPasswordService.getProjectPlanObjects(),
  });
  const projectsPlan = data ?? [];
  const total = data?.count ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? 1;
  return { isPending, projectsPlan, totalPages, total, currentPage };
}
