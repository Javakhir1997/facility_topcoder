import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApplicationService } from "@app/services";

export default function Index() {
  const { id = "" } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["winner-to-detail", id],
    queryFn: () => ApplicationService.getWinnerDetailToDeal(id),
  });

  return { isPending, data };
}
