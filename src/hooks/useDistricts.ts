import { CommonService } from "@services/common.service";
import { useQuery } from "@tanstack/react-query";

export default function Index(id: number|null) {
  const { isPending, data = [] } = useQuery({
    queryKey: ["region", "districts", id],
    queryFn: () => CommonService.getDistricts(id),
    enabled: !!id,
  });
  return { isPending, data };
}
