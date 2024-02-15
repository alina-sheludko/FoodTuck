import { useState, useEffect, useContext, useRef} from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Select from 'react-select';
import styles from './ShopPage.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import ShopList from '../../panels/shopList/ShopList';
import ShopSidebar from '../../panels/shopSidebar/ShopSidebar';
import Filter from '../../assets/images/shop-list-filter.svg';
import CloseIcon from "../../assets/images/icon_close_black.svg";
import { Localizations } from '../../App';
import mq from '../../styles/mq.module.scss';

interface IProps {
  pageData: IPageData
}

export interface IPageData {
  categories: any[],
  pageAlias: string,
  pageSize: number,
  pageTitle: string,
  panels: any[],
  prices: IPrices,
  products: IProducts,
  sortingOptions: ISortingOptions
}

interface IPrices {
  max: number,
  min: number
}

interface IProducts {
  items: IItem[]
  totalCount: number
}

interface IItem {
  calories: number,
  category: string,
  description: string,
  discount: number,
  id: string,
  images: any[],
  ingredients: string,
  name: string,
  price: number,
  shortDescription: string,
  url: string
}

interface ISortingOptions {
  label: string,
  value: number
}

const duration = 500;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  left: "-100%",
};

const transitionStyles = {
  entering: { left: 0 },
  entered: { left: 0 },
  exiting: { left: "-100%" },
  exited: { left: "-100%" },
};

const selectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    paddingLeft: '9px',
    marginLeft: "5px",
    width: "100%",
    minWidth: '190px',
    height: '36px',
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

    [`@media ${mq.xs.replace(/('|")/g, '')}`]: {
      marginLeft: "15px"
    },

    [`@media ${mq.sm.replace(/('|")/g, '')}`]: {
      paddingLeft: '18px',
      height: '46px'
    },
    
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

const ShopPage = ({ pageData}: IProps) => {
  const queryParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const localizations = useContext(Localizations);
  const [filters, setFilters] = useState({
    sortBy: queryParams[0].get('sortBy') ? queryParams[0].get('sortBy')! : '0',
    name: queryParams[0].get('name') ? queryParams[0].get('name')! : '',
    category: queryParams[0].get('category') ? queryParams[0].get('category')?.split(',')! : [],
    price: queryParams[0].get('price') 
      ? queryParams[0].get('price')?.split('-').map(el => Number(el)) 
      : [pageData.prices.min, pageData.prices.max],
    page: queryParams[0].get('page') ? Number(queryParams[0].get('page')) : 0
  })
  const myRef = useRef(null);

  useEffect(() => {
    let allFilters = {...filters, price: `${filters.price[0]}-${filters.price[1]}`}
    navigate({
      pathname: '/shop/',
      search: `?${getQueryStringFromObject(Object.fromEntries(Object.entries(allFilters).filter(el => el[1].length !== 0)))}`,
    }, { replace: true });
  }, [filters])

  useEffect(() => {
    if(location.search !== '') {
      myRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [filters.page])
  

  const navigate = useNavigate();
  
  const getQueryStringFromObject = (filters) => {
    return decodeURIComponent(new URLSearchParams(filters).toString());
  };
  
  return (
    <div>
      <Transition in={isSidebarOpen} timeout={duration} unmountOnExit>
        {(state: any) => (
          <div 
          className={styles.sidebarFilters}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}>
          
          <div className={styles.sidebarFiltersWrapper}>
              <ShopSidebar data={pageData} isSidebarOpen={isSidebarOpen}  filters={filters} onChangeFilters={setFilters}/>
              <h2 className={styles.sidebarFiltersWrapperInfo}>
                {pageData.products.totalCount < 2 ? 
                localizations["ShopPage.InfoOneGood"]?.replace('{count}', `${pageData.products.totalCount}`) :
                localizations["ShopPage.Info"]?.replace('{count}', `${pageData.products.totalCount}`) }
              </h2>
            </div>
            
            <button className={styles.sidebarFiltersButton} onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}>
              <img className={styles.sidebarFiltersButtonClose} src={CloseIcon} alt="close button" />
            </button>
          </div>
        )}
      </Transition>
        
      <div className={`${styles.shopPage} ${layoutStyles.container}`} ref={myRef}>
        <div className={styles.filters}> 
            <label className={styles.filtersLabel}>{localizations["ShopPage.LabelSortBy"]}
              {filters.sortBy && <Select
                styles={selectStyles}
                placeholder={pageData.sortingOptions[Number(filters.sortBy)].label}
                options={pageData.sortingOptions}
                name="sortBy"
                onChange={e => setFilters({
                  ...filters,
                  sortBy: e.value,
                  page: 0
                })}
                >
              </Select>}
            </label>
                    
            <button className={styles.filtersButton} onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}>
              <img src={Filter} alt="" />
            </button>
          </div>
        <ShopList data={pageData} filters={filters} onChangeFilters={setFilters}/>
        
        <ShopSidebar data={pageData} filters={filters} onChangeFilters={setFilters}/>
      </div>
    </div>
  )
}

export default ShopPage;