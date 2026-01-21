import { useQuery } from "@tanstack/react-query";
import { TenderService } from "@app/services";
import { useParams } from "react-router-dom";

export default function Index(enabled: boolean = true) {
  const { id = "" } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ["tenders", id],
    queryFn: () => TenderService.getAnnouncement(id),
    enabled: !!id && enabled,
  });

  return { isPending, data };
}
