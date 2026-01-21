import { ProjectPasswordService } from "@services/projects-passport.service";
import { useQuery } from "@tanstack/react-query";

export default function useExcel(filters: {
  [key: string]: string | string[] | number;
}) {
  const { isPending, data } = useQuery({
    queryKey: ["projects-excel"],
    queryFn: () => ProjectPasswordService.getExcel(filters),
  });
  return {
    isPending,
    data,
  };
}
