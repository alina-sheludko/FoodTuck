import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage, FormikProvider  } from 'formik';
import { useState, useEffect, useContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Localizations } from '../../../App';
import axios from 'axios';
import {deleteAllItems} from '../../../store/actions';

import styles from './ShippingStep.module.scss';
import layoutStyles from '../../../styles/layout.module.scss';
import CaretLeft from '../../../assets/images/shipping-step-caret-left.svg';
import CaretRight from '../../../assets/images/shipping-step-caret-right.svg';

const selectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    paddingLeft: '15px',
    marginTop: "8px",
    marginBottom: "16px",
    width: "100%",
    height: '56px',
    borderRadius: '1px',
    border: '1px solid var(--line-main-color)',
    fontFamily: 'var(--font-title)',
    fontSize: '16px',
    lineHeight: '1.5',
    color: 'var(--text-more-info-color)',
    backgroundColor: 'var(--main-bg-color)',
    borderColor: 'var(--primary-color)',
    boxShadow: '0 0 0 1px transparent',
    
    ':hover': {
      ...baseStyles[':hover'],
      boxShadow: '0 0 0 1px var(--primary-color)',
      borderColor: 'var(--primary-color)',
      borderRadius: '4px'
    }
  }),

  valueContainer: (baseStyles: any, state: any) => ({
    ...baseStyles,
    padding: '0px',
  }),

  placeholder: (baseStyles: any, state: any) => ({
    ...baseStyles,
    margin: '0px',
    fontFamily: 'var(--font-title)',
    fontSize: '16px',
    lineHeight: '1.5',
    color: 'var(--text-more-info-color)',
  }),

  singleValue:  (baseStyles: any, state: any) => ({
    ...baseStyles,
    margin: '0px',
    fontFamily: 'var(--font-title)',
    fontSize: '16px',
    lineHeight: '1.5',
    color: 'var(--text-title-color)',
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
      width: '24px',
      height: '24px',
    }
  }),

  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: 'var(--main-bg-color)',
    color: 'var(--text-title-color)',
    ':active': {
      ...baseStyles[':active'],
      backgroundColor: 'var(--primary-color)',
    },
  }),
}

const ShippingStep = ({onChangeState, onChangeOrderNumber, cities}) => {   
  const localizations = useContext(Localizations);
  const productsInBasket = useSelector(state => state.productsInBasket);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const optionsCities = cities.map(el => {
    return {value: `${el}`, label: `${el}`}
  })

  useEffect(() => {
    Promise.all(
      productsInBasket.map(el => {
        const productId = {
          id: el.id
        }
        return axios.post('/api/products/getById', productId).then(res => res.data);
      })
    ).then((data) => {
      setProducts(data)
    })
  }, []);

  let subTotal = products.reduce((sum, current, i) => sum + ((current.price + current.discount) * productsInBasket[i].value), 0);

  let discount = products.reduce((sum, current, i) => sum + (current.discount * productsInBasket[i].value), 0);

   return (
    <>
      <div className={`${styles.shipping} ${layoutStyles.container}`}>
        <div className={styles.shippingContainer}>
          <p className={styles.shippingContainerTitle}>{localizations["ShippingStep.Title"]}</p>

          <div className={styles.shippingAddress}>
            <Formik
              initialValues = {{
                fullName: '',
                phone: '',
                email: '',
                city: '',
                address: '',
              }}
              validate = {values=> {
                const errors: IError = {};
              
                if(!values.fullName) {
                  errors.fullName = ' Required field!';
                } else if (values.fullName.length < 2) {
                  errors.fullName = 'At least 2 characters to fill!'
                }

                if(!values.phone) {
                  errors.phone = 'Enter the phone number!'
                } else if(!/^\+380\d{3}\d{2}\d{2}\d{2}$/.test(values.phone)) {
                  errors.phone = 'Phone number entered incorrectly!';
                }

                if(!values.email) {
                  errors.email = 'Required field!';
                } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                  errors.email = 'Email entered incorrectly!';
                }

                if(!values.city) {
                  errors.city = 'Required field!';
                }

                if(!values.address) {
                  errors.address =  'Required field!';
                }
                return errors;
              }}
              onSubmit = {values => {
                values.city = values.city.value;
                let idProducts = [];
                for(let i = 0; i < productsInBasket.length; i++) {
                  let count = productsInBasket[i].value;
                  while(count !== 0) {
                    idProducts.push(productsInBasket[i].id);
                    count--;
                  }
                }
                let order = {
                  address: values,
                  products: idProducts,
                }
                onChangeState('successStep');
                dispatch(deleteAllItems())
                axios.post('/api/orders/create', order)
                .then(({data}) => {
                  return onChangeOrderNumber(data.orderNumber);
                })
                return order;
                }
              }
            >
              {({ values, handleSubmit, setFieldValue }) => (
              <Form className={styles.shippingAddressForm}>
                <div className={styles.shippingAddressFormWrapper}>
                  <label className={styles.shippingAddressFormLabel}>{localizations["ShippingStep.FullName"]}<br/> 
                    <Field 
                      className={styles.shippingAddressFormInput} 
                      type="text" 
                      name='fullName'
                    />

                    <ErrorMessage className={styles.error} name='fullName' component='div'/>
                  </label>

                  <label className={styles.shippingAddressFormLabel}>{localizations["ShippingStep.PhoneNumber"]}<br/> 
                    <Field 
                      className={styles.shippingAddressFormInput} 
                      type="text" 
                      name='phone'
                    />

                    <ErrorMessage className={styles.error} name='phone' component='div'/> 
                  </label>
                </div>

                <div className={styles.shippingAddressFormWrapper}>
                  <label className={styles.shippingAddressFormLabel}>{localizations["ShippingStep.Email"]}<br/> 
                    <Field 
                      className={styles.shippingAddressFormInput} 
                      type="text" 
                      name='email'
                    />

                    <ErrorMessage className={styles.error} name='email' component='div'/>  
                  </label>

                  <label className={styles.shippingAddressFormLabel}>{localizations["ShippingStep.City"]}<br/> 
                    <Select 
                      styles={selectStyles}
                      placeholder={'Choose city'}
                      options={optionsCities}
                      onChange={(val) => setFieldValue('city', val)}
                      value={values.city}
                    />

                    <ErrorMessage className={styles.error} name='city' component='div'/>  
                  </label>
                </div>

                <div className={styles.shippingAddressFormWrapper}>
                  <label className={styles.shippingAddressFormLabel}>{localizations["ShippingStep.Address"]}<br/> 
                    <Field 
                      className={styles.shippingAddressFormInput} 
                      type="text" 
                      name='address'
                    />   

                    <ErrorMessage className={styles.error} name='address' component='div'/>  
                  </label>

                </div> 
                <form className={styles.shippingAddressForm} action="">
                  <div className={styles.shippingAddressFormContainer}>
                    <button 
                      className={styles.shippingAddressFormContainerButton}
                      onClick={() => onChangeState('cheekoutStep')}
                    >
                      <img className={styles.shippingAddressFormContainerButtonImg} src={CaretLeft} alt="caret left" />
                      {localizations["ShippingStep.Button.Back"]}
                    </button>

                    <button
                      className={styles.shippingAddressFormContainerBtn}
                      onClick={handleSubmit}
                      type='submit'
                    >
                      {localizations["ShippingStep.Button.Order"]}
                      <img className={styles.shippingAddressFormContainerBtnImg} src={CaretRight} alt="caret right" />
                    </button>
                  </div>
                </form>
              </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className={styles.sideBar}>
          {products.map((el, i) => (
            <>
              <div className={styles.sideBarProduct} key={i}>
                <img className={styles.sideBarProductImg} src={el.images[0].concat('?rw=84&rh=88')} alt={el.name}/>

                <div className={styles.sideBarProductInfo}>
                  <p className={styles.sideBarProductInfoName}>{el.name}</p>

                  <p className={styles.sideBarProductInfoWeight}>
                    {localizations["CheekoutStep.Quantity"]}: {productsInBasket[i].value}
                  </p>
                  
                  {el.discount ?
                    <p className={styles.sideBarProductInfoPrice}>
                      {localizations["General.DollarSign"].replace('${price}', `${el.price.toFixed(2)}$`)}

                      <s className={styles.sideBarProductInfoFullPrice}>
                        {localizations["General.DollarSign"].replace('${price}', `${(el.price+el.discount).toFixed(2)}$`)}
                      </s>
                    </p>
                      :
                    <p className={styles.sideBarProductInfoPrice}>
                       {localizations["General.DollarSign"].replace('${price}', `${el.price.toFixed(2)}$`)}
                    </p>
                  }
                </div>
              </div>

              <div className={styles.sideBarProductLine}></div>
            </>
          ))}
            
          <div className={styles.sideBarContainer}>
            <div className={styles.sideBarContainerRow}>
              <p className={styles.sideBarContainerRowTitle}>{localizations["ShippingStep.SubTotal"]}</p>

              <p className={styles.sideBarContainerRowInfo}>
                {localizations["General.DollarSign"].replace('${price}', `${subTotal.toFixed(2)}$`)}
              </p>
            </div>

            <div className={styles.sideBarContainerRow}>
              <p className={styles.sideBarContainerRowTitle}>{localizations["ShippingStep.Shipping"]}</p>

              <p className={styles.sideBarContainerRowInfo}>{localizations["ShippingStep.ShippingValue"]}</p>
            </div>

            <div className={styles.sideBarContainerRow}>
              <p className={styles.sideBarContainerRowTitle}>{localizations["ShippingStep.Discount"]}</p>

              <p className={styles.sideBarContainerRowInfo}>
                {localizations["General.DollarSign"].replace('${price}', `${discount.toFixed(2)}$`)}
              </p>
            </div>

            <div className={styles.sideBarProductLine}></div>

            <div className={styles.sideBarContainerRow}>
              <p className={styles.sideBarContainerRowTitleHighlighted}>{localizations["ShippingStep.Total"]}</p>
              
              <p className={styles.sideBarContainerRowInfoHighlighted}>
                {localizations["General.DollarSign"].replace('${price}', `${(subTotal-discount).toFixed(2)}$`)}
              </p>
            </div>
          </div>          
        </div>
      </div>
    </>
  )
}

export default ShippingStep;