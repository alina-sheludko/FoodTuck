import { useState, useEffect } from "react";

interface UsePaginationProps {
  contentPerPage: number,
  totalCount: number,
  page?: number;
}

interface UsePaginationReturn {
  contentPerPage: number;
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

type UsePagination = (UsePaginationProps) => (UsePaginationReturn);

const usePagination: UsePagination = ({ contentPerPage, totalCount, page: initialPage = 0 }) => {
  const [page, setPage] = useState(initialPage);
  // number of pages in total (total items / content on each page)
  const pageCount = Math.ceil(totalCount / contentPerPage);
  // index of last item of current page
  const lastContentIndex = page * contentPerPage;
  // index of first item of current page
  const firstContentIndex = lastContentIndex - contentPerPage;

  // change page based on direction either front or back
  const changePage = (direction: boolean) => {
    setPage((state) => {
      // move forward
      if (direction) {
        // if page is the last page, do nothing
        if (state === pageCount-1) {
          return state;
        }
        return state + 1;
        // go back
      } else {
        // if page is the first page, do nothing
        if (state === 0) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = (num: number) => {
    // if number is greater than number of pages, set to last page
    if (num > pageCount) {
      setPage(pageCount);
      // if number is less than 0 set page to first page
    } else if (num < 0) {
      setPage(0);
    } else {
      setPage(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
    contentPerPage,
  };
};

export default usePagination;