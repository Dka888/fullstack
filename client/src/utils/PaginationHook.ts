import {useState} from 'react';

export const usePaginationHook = (lengthItems: number) => {
    const [currPage, setCurrPage] = useState(1);
    const pages = Math.ceil(lengthItems / 12);
    const firstItem = currPage === 1 ? 0 : ((currPage - 1) * 12);
    const lastItem = currPage === pages ? lengthItems : firstItem + 12;

    return {pages, firstItem, lastItem, currPage, setCurrPage}
}