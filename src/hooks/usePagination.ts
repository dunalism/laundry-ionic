import { useState, useMemo } from "react";
import { LaundryServiceExtended } from "../types";

export const usePagination = (
  items: LaundryServiceExtended[],
  itemsPerPage: number
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};
