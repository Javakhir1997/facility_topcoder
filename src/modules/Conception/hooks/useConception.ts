import { useQuery } from "@tanstack/react-query";
import { ApplicationService } from "@app/services";
import { usePagination } from "@app/hooks";
import { getSearchParamsAsObject } from "@app/shared";
import { useSearchParams } from "react-router-dom";

export default function useConceptions() {
  const { page, pageSize } = usePagination();
  const [searchParams] = useSearchParams();
  const { status = "all" } = getSearchParamsAsObject(searchParams);
  // const {user} = useAppContext()

  const { isPending, data } = useQuery({
    queryKey: ["conception", page, pageSize, status],
    queryFn: () =>
      ApplicationService.getConceptions({
        page: String(page),
        pageSize: String(pageSize),
        st: status !== "all" ? status : "",
      }),
    enabled: Boolean(page && pageSize),
  });

  const conceptions = data?.results ?? [];
  const total = data?.count ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? 1;

  return { isPending, conceptions, totalPages, total, currentPage };
}
