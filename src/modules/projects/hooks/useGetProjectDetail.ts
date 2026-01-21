import { ProjectsService } from "@services/projects.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useProjectDetail(paramsId?: number | string) {
    const { id: routeId } = useParams<{ id: string }>();
  const { isPending, data } = useQuery({
    queryKey: ["project-detail", paramsId],
    queryFn: () => ProjectsService.getProjectDetail(routeId!),
  });

  return { isPending, data };
}
