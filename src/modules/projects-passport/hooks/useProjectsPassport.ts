import usePagination from "@hooks/usePagination";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useQuery } from "@tanstack/react-query";

export default function usePassportList(filters: {
  [key: string]: string | string[] | number;
}) {
  const { page, pageSize, onPageChange, onPageSizeChange } = usePagination();
  const { isPending, data } = useQuery({
    queryKey: ["projects-passport", page, pageSize, filters],
    queryFn: () =>
      ProjectPasswordService.getProjectsPassport({
        page: String(page),
        pageSize: String(pageSize),
        ...filters,
      }),
  });
  const projectsPassport = data ?? [];
  const total = data?.count ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? 1;
  return {
    isPending,
    projectsPassport,
    totalPages,
    total,
    currentPage,
    onPageChange,
    onPageSizeChange,
  };
}
