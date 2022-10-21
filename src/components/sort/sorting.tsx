import { SortDirection } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export const sort = (data: any[], sortKey: string, sortDirection: SortDirection) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return sortedData;
};

export const useSort = (data: any[], sortKey: string, sortDirection: SortDirection) => {
  const [sortedData, setSortedData] = useState(data);
  useEffect(() => {
    setSortedData(sort(data, sortKey, sortDirection));
  }, [data, sortKey, sortDirection]);
  return sortedData;
}

