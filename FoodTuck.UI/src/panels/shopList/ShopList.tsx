import { useEffect, useContext, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import styles from './ShopList.module.scss';
import {IPageData} from '../../pages/shop/ShopPage';
import PaginationLeft from '../../assets/images/shop-list-pagination-left.svg';
import PaginationRight from '../../assets/images/shop-list-pagination-right.svg';

import usePagination from './usePagination';
import { Localizations } from '../../App';

interface IProps {
  data: IPageData
}

const ShopList = ({filters, onChangeFilters, data}: IProps) => {
  const localizations = useContext(Localizations);
  const [queryParams] = useSearchParams();
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
    contentPerPage
  } = usePagination({
    contentPerPage: data.pageSize,
    totalCount: data.products.totalCount,
    page: filters.page
 });
 
  useEffect(() => {
    if(filters.page !== page) {
      onChangeFilters({
        ...filters,
        page: page
      });
    }
  }, [contentPerPage, page])

  useEffect(() => {
    setPage(filters.page);
  }, [filters.page])

  return (
    <>
      <div className={`${styles.shopList} `}>  
        <div className={styles.productsList}>  
          <div className={styles.wrraper}>
            {data.products.items.map((el, i) => (
              <Link className={styles.product} to={el.url} key={i}>
                <img className={styles.productImg} src={el.images[0]} alt={el.name} />

                <p className={styles.productName}>{el.name}</p>

                {el.discount ? 
                  <p className={styles.productPrice}>{localizations["General.DollarSign"].replace(`{price}`, `${el.price.toFixed(2)}`)} 
                    <s className={styles.productFullPrice}>{localizations["General.DollarSign"].replace(`{price}`, `${(el.price+el.discount).toFixed(2)}`)}</s>
                  </p> 
                  : <p className={styles.productPrice}>{localizations["General.DollarSign"].replace(`{price}`, `${el.price.toFixed(2)}`)}</p>
                }
              </Link>
              ))
            }
          </div>
        </div>

        {data.products.totalCount === 0  ?
          <h2 className={styles.notFoundProduct}>{localizations["ShopList.Info"]}</h2>

        : <div className={styles.pagination}>
          
          <div className={styles.paginationWrapper}>
            <button className={styles.paginationWrapperButton} onClick={prevPage}>
              <img src={PaginationLeft} alt="" />
            </button>
          </div>
          
          {[...Array(totalPages).keys()].map((el) => 
          (
            <div className={styles.paginationWrapper}>
              <button
                onClick={() => setPage(el)}
                key={el}
                className={`${styles.paginationWrapperButton} ${el === page  ? `${styles.paginationWrapperButtonActive}` : ""}`}
              >
                {el + 1}
              </button>
            </div>
          ))}

          <div className={styles.paginationWrapper}>
            <button  className={styles.paginationWrapperButton} onClick={nextPage}>
              <img src={PaginationRight} alt="" />
            </button>
          </div>
        </div>}
      </div>
    </>
  )
}

export default ShopList;