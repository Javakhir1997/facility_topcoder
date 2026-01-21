import { ProjectPasswordService } from "@services/projects-passport.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useProjectPassportDetail() {
  const { id: routeId } = useParams<{ id: string }>();
  const { isPending,isFetching, data } = useQuery({
    queryKey: ["project-detail", routeId],
    queryFn: () => ProjectPasswordService.getProjectPassportDetail(routeId!),
  });

  return { isPending,isFetching, data };
}
