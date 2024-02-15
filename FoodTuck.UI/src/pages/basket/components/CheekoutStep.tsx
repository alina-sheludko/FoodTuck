import {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import styles from './CheekoutStep.module.scss';
import layoutStyles from '../../../styles/layout.module.scss';
import CaretRight from '../../../assets/images/shipping-step-caret-right.svg';
import Minus from '../../../assets/images/cheekout-step-minus.svg';
import Plus from '../../../assets/images/cheekout-step-plus.svg';
import Remove from '../../../assets/images/cheekout-step-remove.svg';
import EmptyBasket from '../../../assets/images/cheekout-step-empty-basket.svg';
import {updateStore, deleteItem} from '../../../store/actions';
import { Localizations } from '../../../App';
import Title from '../../../shared/components/panels-title/Title';

const CheekoutStep = ({onChangeState}) => {
  const productsInBasket = useSelector(state => state.productsInBasket);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const localizations = useContext(Localizations);

  useEffect(() => {
    Promise.all(
      productsInBasket.map(el => {
        const productId = {
          id: el.id
        }
        return axios.post(import.meta.env.VITE_API + '/api/products/getById', productId).then(res => res.data);
      })
    ).then((data) => {
      setProducts(data)
    })
  }, []);

  let cartSubtotal = 0;
  productsInBasket.length !== 0 
    ? cartSubtotal = products.map((el, i) => el.price * productsInBasket[i].value).reduce((sum, current) => sum + current, 0) 
    : cartSubtotal;
  let shippingCharge = 0;

  function deleteProduct(id) {
    dispatch(deleteItem(id));
    setProducts(products.filter(item => item.id !== id));
  }
    
  return (
    <>
      <div className={`${styles.cheekout} ${layoutStyles.container}`}>
        {products.length === 0 ? 
          <div className={styles.cheekoutNotFound}>
            <img className={styles.cheekoutNotFoundIcon} src={EmptyBasket} alt="Empty Basket"/>
            
            <Title title={localizations["CheekoutStep.NotFoundItems"]} className={`${styles.cheekoutNotFoundTitle}`}/>
          </div>
          : 

          <>  
            <table className={styles.cheekoutList}>
              <tbody>
                <tr className={styles.cheekoutListBlock}>
                  <th className={styles.cheekoutListBlockTitle}>{localizations['CheekoutStep.Product']}</th>

                  <th className={styles.cheekoutListBlockTitle}>{localizations['CheekoutStep.Price']}</th>
                  
                  <th className={styles.cheekoutListBlockTitle}>{localizations['CheekoutStep.Quantity']}</th>
                  
                  <th className={styles.cheekoutListBlockTitle}>{localizations['CheekoutStep.Total']}</th>
                  
                  <th className={styles.cheekoutListBlockTitle}>{localizations['CheekoutStep.Remove']}</th>
                </tr>
                  {productsInBasket.length !== 0 && products.map((el, i) => (
                    <>
                      <tr className={styles.cheekoutTable} key={i}>
                        <td className={styles.cheekoutTableProduct}>
                          <img className={styles.cheekoutTableProductImg} src={el.images[0].replace(/\..+$/, (val) => `rw=93&rh=97${val}`)} alt={el.product}/>

                          <img className={styles.cheekoutTableProductBigImg} src={el.images[0].replace(/\..+$/, (val) => `rw=300&rh=300${val}`)} alt={el.product}/>

                          <div className={styles.cheekoutTableProductWrapper}>
                            <p className={styles.cheekoutTableProductWrapperTitle}>{el.name}</p>
                            
                            <button 
                              className={styles.cheekoutTableProductWrapperButton}
                              onClick={() => {deleteProduct(el.id)}} 
                            >
                              <img src={Remove} alt="remove" />
                            </button>
                          </div>
                        </td>

                        <td className={styles.cheekoutTablePrice}>
                          <span className={styles.cheekoutTablePriceTitle}>
                            {localizations['CheekoutStep.Price']}: &nbsp;
                          </span> 
                          

                          {el.discount ?
                            <span className={styles.cheekoutTablePriceValue}>
                              {localizations["General.DollarSign"]?.replace(`{price}`, `${el.price.toFixed(2)}`)}

                              <s className={styles.cheekoutTablePriceFullValue}>
                                {localizations["General.DollarSign"]?.replace(`{price}`, `${(el.price+el.discount).toFixed(2)}`)}
                              </s>
                            </span>
                              :
                            <span className={styles.cheekoutTablePriceValue}>
                              {localizations["General.DollarSign"]?.replace(`{price}`, `${el.price.toFixed(2)}`)}
                            </span>
                          }
                        </td>

                        <td className={styles.cheekoutTableCount}>
                          <span className={styles.cheekoutTableCountTitle}>
                            {localizations['CheekoutStep.Quantity']}: &nbsp;
                          </span>
                          
                          <div className={styles.cheekoutTableCountForm}>
                            <button 
                              className={styles.cheekoutTableCountFormMinus}  
                              onClick={() => {
                                productsInBasket[i].value > 1 
                                ? dispatch(updateStore(el.id, productsInBasket[i].value-1))
                                : deleteProduct(el.id)
                              }}
                            >
                              <img src={Minus} alt="minus" />
                            </button>
                            
                            <span className={styles.cheekoutTableCountFormNumber}>
                              {productsInBasket.length !== 0 && productsInBasket[i].value}
                            </span> 
                            
                            <button 
                              className={styles.cheekoutTableCountFormPlus}
                              onClick={() => {dispatch(updateStore(el.id, productsInBasket[i].value+1))}}
                            >
                              <img src={Plus} alt="plus" />
                            </button>
                          </div>
                        </td>

                        <td className={styles.cheekoutTableTotal}>
                          <span className={styles.cheekoutTableTotalTitle}>
                            {localizations['CheekoutStep.Total']}: &nbsp;
                          </span> 
                        
                          <span className={styles.cheekoutTableTotalValue}>
                            {localizations["General.DollarSign"]?.replace(`{price}`, `${productsInBasket.length !== 0 && (el.price * productsInBasket[i].value).toFixed(2)}`)}
                          </span>
                        </td>

                        <td className={styles.cheekoutTableRemove}>
                          <button 
                            className={styles.cheekoutTableRemoveButton}
                            onClick={() => {deleteProduct(el.id)}} 
                          >
                            <img src={Remove} alt="remove" />
                          </button>
                        </td>
                      </tr>
                      
                      <tr className={styles.cheekoutTableLine}></tr>
                    </>
                ))}
              </tbody>
            </table>

            <div className={styles.cheekoutWrapper}>
              <div className={styles.couponCode}>
                <p className={styles.couponCodeTitle}>{localizations['CheekoutStep.CouponCode']}</p>
                
                <div className={styles.couponCodeBlock}>
                  <p className={styles.couponCodeBlockInfo}>{localizations['CheekoutStep.CouponCodeInfo']}</p>
                  
                  <form className={styles.codeForm}>
                    <input 
                      className={styles.codeFormInput}
                      type="text" 
                      placeholder={localizations["CheekoutStep.Button.ApplyPlaceholder"]}>
                    </input>
                    
                    <button className={styles.codeFormButton}>{localizations["CheekoutStep.Button.Apply"]}</button>
                  </form>
                </div>
              </div>
              
              <div className={styles.TotalBill}>
                <p className={styles.TotalBillTitle}>{localizations['CheekoutStep.TotalBill']}</p>
                
                <div className={styles.TotalBillBlock}>
                  <div className={styles.TotalBillBlockItem}>
                    <p className={styles.TotalBillBlockItemTitleBold}>{localizations['CheekoutStep.CartSubtotal']}</p>
                    
                    <p className={styles.TotalBillBlockItemCostBold}>
                      {localizations["General.DollarSign"]?.replace(`{price}`, `${cartSubtotal.toFixed(2)}`)}
                    </p>
                  </div>
                  
                  <div className={styles.TotalBillBlockItem}>
                    <p className={styles.TotalBillBlockItemTitle}>{localizations['CheekoutStep.ShippingCharge']}</p>
                    
                    <p className={styles.TotalBillBlockItemCost}>
                      {localizations["General.DollarSign"]?.replace(`{price}`, `${shippingCharge.toFixed(2)}`)}
                    </p>
                  </div>
                  
                  <div className={styles.TotalBillBlockLine}></div>
                  
                  <div className={styles.TotalBillBlockItem}>
                    <p className={styles.TotalBillBlockItemTitleBold}>{localizations['CheekoutStep.TotalAmount']}</p>
                  
                    <p className={styles.TotalBillBlockItemCostBold}>
                      {localizations["General.DollarSign"]?.replace(`{price}`, `${(cartSubtotal - shippingCharge).toFixed(2)}`)}
                    </p>
                  </div>
                </div>
                
                <button className={styles.TotalBillButton} onClick={() => onChangeState('shippingStep')}>
                  {localizations["CheekoutStep.Button.Shipping"]}
                  <img className={styles.TotalBillButtonImg} src={CaretRight} alt="" />
                </button>
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default CheekoutStep;