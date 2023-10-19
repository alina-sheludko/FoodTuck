import {useState} from 'react';
import CheekoutStep from "./components/CheekoutStep";
import ShippingStep from "./components/ShippingStep";
import SuccessStep from './components/SuccessStep';
import {IPageData} from '../../shared/components/page-resolver/PageResolver';

interface IProps {
  pageData: IPageData
}

const BasketPage = ({pageData}: IProps) => {
  const [stateOrder, setStateOrder] = useState('cheekoutStep');
  const [orderNumber, setOrderNumber] = useState('');

  const handleChangeOrderNumber = (number) => {
    setOrderNumber(number);
  }

  return (
    (() => {
      switch (stateOrder){
        case "cheekoutStep":
          return <CheekoutStep onChangeState={setStateOrder}/>
        case 'shippingStep':
          return <ShippingStep onChangeState={setStateOrder} onChangeOrderNumber={handleChangeOrderNumber} cities={pageData.cities}/>
        case 'successStep':
          return <SuccessStep orderNumber={orderNumber} />
      }
    })()
  )
}

export default BasketPage;