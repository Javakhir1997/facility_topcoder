import { useParams } from "react-router-dom";
import { FinanceService } from "@app/services";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { id = "" } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["finance", id],
    queryFn: () => FinanceService.getFinanceByDeals(id),
  });

  return { isPending, data };
}
