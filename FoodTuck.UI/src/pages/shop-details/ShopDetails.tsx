import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import {useSelector, useDispatch} from 'react-redux';

import styles from './ShopDetails.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import Minus from '../../assets/images/shop-details-minus.svg';
import Plus from '../../assets/images/shop-details-plus.svg';
import Handbag from "../../assets/images/shop-details-handbag.svg";
import { Localizations } from '../../App';
import {updateStore} from '../../store/actions';

interface IProps {
  pageData: IPageData
}

interface IPageData {
  pageTitle: string,
  product: IProduct,
  url: string
}

interface IProduct {
  calories: number,
  category: string,
  description: string,
  discount: number,
  id: string,
  images: string[],
  ingredients: string,
  name: string,
  price: number,
  shortDescription: string
}

let arrCookies = [];

const ShopDetails = ({ pageData}: IProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [cookies, setCookies] = useCookies(arrCookies);
  const localizations = useContext(Localizations);
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const [count, setCount] = useState(
    store.productsInBasket.length > 0 
    && store.productsInBasket.find(el => el.id === pageData.product.id) !== undefined 
    ? store.productsInBasket[store.productsInBasket.findIndex(el => el.id === pageData.product.id)].value
    : 1);

  useEffect(() => {
    let isIncludes = false;
    for(let i = 0; i < arrCookies.length; i++) {
      if(arrCookies[i]['name'] === pageData.product.name) {
        isIncludes = true;
      }
    }
    if(!isIncludes) {
      if(arrCookies.length === 4) {
        arrCookies.pop();
      }
      arrCookies.unshift({name: pageData.product.name, price: pageData.product.price, images: pageData.product.images, url: pageData.url});
    }
    
    setCookies('products', arrCookies, { path: "/" });
  }, []);

  return (
    <div className={`${styles.shopDetails} ${layoutStyles.container}`}>
      <div className={styles.product}>
        <div className={styles.productImagesContent}>
          <div className={styles.productImagesContentMinor}>
            {
              pageData.product.images.map((el, i) => (
                <img 
                  className={`${styles.productImagesContentMinorImg} ${activeImage === i ? `${styles.productImagesContentMinorImgActive}` : ''}`} 
                  onClick={() => setActiveImage(i)} 
                  src={el.concat('?rw=132&rh=129')} 
                  alt={pageData.product.name} 
                  key={i}
                />
              ))
            }
          </div>

          <img 
            className={styles.productImagesContentMainImg}  
            src={pageData.product.images[activeImage]} 
            alt={pageData.product.name}  
          />
        </div>

        <div className={styles.productTextContent}>
          <h2 className={styles.productTextContentTitle}>{pageData.pageTitle}</h2>

          <p className={styles.productTextContentShortDescription}>{pageData.product.shortDescription}</p>
          
          <div className={styles.productTextContentLine}></div>

          <p className={styles.productTextContentPrice}>
            {localizations["General.DollarSign"].replace('${price}', `${pageData.product.price.toFixed(2)}$`)}
          </p>

          <div className={styles.purchaseProduct}>
            <div className={styles.purchaseProductCount}>
              <button 
                className={styles.purchaseProductCountButton} 
                onClick={() => count > 1 ? setCount(count-1) : count}
              >
                <img className={styles.purchaseProductCountImg} src={Minus} alt="Button Minus" />
              </button>

              <span className={styles.purchaseProductCountText}>{count}</span>
              
              <button 
                className={styles.purchaseProductCountButton} 
                onClick={() => setCount(count+1)}
              >
                <img className={styles.purchaseProductCountImg} src={Plus} alt="Button Plus" />
              </button>
            </div>

            <button 
              className={styles.purchaseProductHandbag} 
              onClick={() => {dispatch(updateStore(pageData.product.id, count))}}
            >
              <img className={styles.purchaseProductHandbagImg} src={Handbag} alt="Handbag" />
              {localizations["ShopDetails.Button"]}
            </button>
          </div>

          <div className={styles.productTextContentLine}></div>

          <div>
            <p className={styles.productTextContentInfo}>{localizations["ShopDetails.Category"]} {pageData.product.category}</p>

            <p className={styles.productTextContentInfo}>{localizations["ShopDetails.Ingredient"]} {pageData.product.ingredients}</p>

            <p className={styles.productTextContentInfo}>{localizations["ShopDetails.Calories"]} {pageData.product.calories}</p>
          </div>

          <div className={styles.productTextContentLineLast}></div>
        </div>
      </div>

      <p className={styles.shopDetailsDescription} dangerouslySetInnerHTML={{__html: pageData.product.description}}></p>
    </div>
  )
}

export default ShopDetails;