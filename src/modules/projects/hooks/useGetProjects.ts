import usePagination from "@hooks/usePagination";
import { ProjectsService } from "@services/projects.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetProjects(filters: {
  [key: string]: string | string[] | number;
}) {
  const { page, pageSize, onPageChange, onPageSizeChange } = usePagination();
  const { isPending, data } = useQuery({
    queryKey: ["projects", page, pageSize,filters],
    queryFn: () =>
      ProjectsService.getProjects({
        page: String(page),
        pageSize: String(pageSize),
        ...filters,
      }),
  });
  const projects = data ?? [];
  const total = data?.count ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? 1;
  return {
    isPending,
    projects,
    totalPages,
    total,
    currentPage,
    onPageChange,
    onPageSizeChange,
  };
}
