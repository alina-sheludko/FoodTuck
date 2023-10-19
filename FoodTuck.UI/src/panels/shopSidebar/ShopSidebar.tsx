import  { useRef, useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import { Cookies } from 'react-cookie';

import styles from './ShopSidebar.module.scss';
import {IPageData} from '../../pages/shop/ShopPage';
import Search from '../../assets/images/shop-search.svg';
import PriceRange from './PriceRange';
import { Localizations } from '../../App';
import { Link } from 'react-router-dom';

interface IProps {
  data: IPageData
}

const selectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    paddingLeft: '18px',
    marginTop: "16px",
    width: "100%",
    height: '46px',
    borderRadius: '6px',
    border: '1px solid var(--line-main-color)',
    fontFamily: 'var(--font)',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.44',
    color: 'var(--text-info-color)',
    backgroundColor: 'var(--main-bg-color)',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 1px transparent',
    
    ':hover': {
      ...baseStyles[':hover'],
      borderColor: 'var(--primary-color)',
      borderRadius: '6px',
      boxShadow: '0 0 0 1px var(--primary-color)',
    }
  }),
  valueContainer: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: '0px',
  }),
  placeholder: (baseStyles: any, state: any) => ({
    ...baseStyles,
    margin: '0px',
    fontFamily: 'var(--font)',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.44',
    color: 'var(--line-color)',
  }),
  singleValue:  (baseStyles: any, state: any) => ({
    ...baseStyles,
    margin: '0px',
    fontFamily: 'var(--font)',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.44',
    color: 'var(--text-info-color)',
  }),
  input: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: '0px',
    margin: '0px',
  }),
  indicatorSeparator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    display: 'none'
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    ' svg': {
      width: '20px',
      height: '20px',
    }
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: 'var(--main-bg-color)',
    fontFamily: 'var(--font)',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.44',
    color: 'var(--text-info-color)',
    ':active': {
      ...baseStyles[':active'],
      backgroundColor: 'var(--primary-color)',
    },
  }),
}

const cookies = new Cookies();

const ShopSidebar = ({data, isSidebarOpen, filters, onChangeFilters}: IProps) => {
  const searchRef = useRef<HTMLInputElement>(null); 
  const localizations = useContext(Localizations);
  const [latestProducts, setLatestProducts] = useState(cookies.get('products') || []); 
   
  function setSearchFilter(e) {
    e.preventDefault();
    onChangeFilters({
      ...filters, 
      name: searchRef.current!.value,
      page: 0 
    });
  }

  return (
    <div className={`${styles.shopSidebar} ${isSidebarOpen ? `${styles.sidebarOpen}` : ``}`}>
      <div className={styles.sortWrapper}>
       {!isSidebarOpen && <label className={styles.sortWrapperLabel}>{localizations["ShopPage.LabelSortBy"]} 
          {filters.sortBy && <Select
            styles={selectStyles}
            placeholder={data.sortingOptions[Number(filters.sortBy)].label}
            options={data.sortingOptions}
            name="sortBy"
            onChange={e => onChangeFilters({
              ...filters, 
              sortBy: e.value, 
              page: 0
            })}
            >
          </Select>}
        </label>}

        <form className={styles.sortWrapperSearch} onSubmit={setSearchFilter}>
          <input  
            className={styles.sortWrapperSearchInput} 
            type="text" 
            placeholder={localizations["ShopSidebar.Button.Search"]}
            defaultValue={filters.name}
            ref={searchRef}
          />

          <button type='submit' className={styles.sortWrapperSearchButton}>
            <img src={Search} alt="Button search" />
          </button>
        </form>

        <div className={styles.sortWrapperCheckbox} >
          <p className={styles.sortWrapperCheckboxTitle}>{localizations["ShopSidebar.TitleCategory"]}</p>

          {data.categories.map((el, i) => (
              <label 
                className={styles.sortWrapperCheckboxLabel} 
                htmlFor={"category"+i}  
                key={i}  
              >
                <input 
                  className={styles.sortWrapperCheckboxInput} 
                  type="checkbox" 
                  id={"category"+i} 
                  checked={filters.category && filters.category.includes(el) ? true : false}
                  onChange={e => onChangeFilters({
                    ...filters,
                    category : e.target.checked ? filters.category.concat(el) : filters.category.filter(cat => cat !== el),
                    page: 0
                  })}>
                 </input>
                
                <span className={styles.sortWrapperCheckboxCheckmark}></span>
                {el}
              </label>
            ))
          }
        </div>
        
        <div className={styles.sortWrapperFilter}>
          <p className={styles.sortWrapperFilterTitle}>{localizations["ShopSidebar.TitlePrice"]}</p>

          <PriceRange value={filters.price} filters={filters} onChangeValues={onChangeFilters}  prices={[data.prices.min, data.prices.max]}/>
        </div>
      </div>
          
      <div className={styles.latestProducts}>
        <p className={styles.latestProductsTitle}>{localizations["ShopSidebar.TitleLatestProducts"]}</p>

        {latestProducts.map((el, i) => (
          <Link className={styles.latestProductsItems} to={el.url} key={i}>
            <img 
              className={styles.latestProductsItemsImg} 
              src={el.images[0].concat('?rw=72&rh=65')} 
              alt={el.name}
            />

            <div>
              <p className={styles.latestProductsItemsInfo}>{el.name}</p>

              <p className={styles.latestProductsItemsInfo}>{localizations["General.DollarSign"].replace(`{price}`, `${el.price.toFixed(2)}`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopSidebar;



