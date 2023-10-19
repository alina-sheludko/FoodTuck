import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Location, useLocation } from "react-router-dom";

import HomePage from "../../../pages/home/HomePage";
import MenuPage from "../../../pages/menu/MenuPage";
import ContentPage from "../../../pages/content/ContentPage";
import NotFoundPage from "../../../pages/not-found-page/NotFoundPage";
import OurTeamPage from "../../../pages/ourTeam/OurTeamPage";
import ShopPage from "../../../pages/shop/ShopPage";
import ShopDetails from "../../../pages/shop-details/ShopDetails";
import BasketPage from '../../../pages/basket/BasketPage';
import LayoutComponent from "../layout-component/LayoutComponent";

export interface IPageData {
  breadcrumbs: any[],
  cities: any[],
  pageAlias: string,
  pageTitle: string,
  panels: any[]
}

const PageResolver = () => {
  let location = useLocation();
  const prevLocation = useRef<Location | null>(null);
  const [pageData, setPageData] = useState<IPageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`/api/node/getByUrl?url=${encodeURIComponent(window.location.href)}`)
      .then(({data}) => {
        return setPageData(data)
      })
      .catch(() => setPageData(null))
      .finally(() => setIsLoading(false))
    
    if(prevLocation.current?.pathname !== location.pathname) {
      scroll({ top: 0, behavior: 'smooth' })
    }

    return () => {
      prevLocation.current = location
    }
  }, [location]);
  
  return (
    <>
      {!isLoading &&
        (() => {
          switch (pageData?.pageAlias){
            case "homePage":
              return <HomePage pageData={pageData}/>
            case 'menuPage':
              return <LayoutComponent pageData={pageData}><MenuPage pageData={pageData}/></LayoutComponent>
            case 'contentPage':
              return <LayoutComponent pageData={pageData}><ContentPage pageData={pageData}/></LayoutComponent> 
            case 'notFoundPage':
              return  <LayoutComponent pageData={pageData}><NotFoundPage/></LayoutComponent>
            case 'ourTeamPage':
              return  <LayoutComponent pageData={pageData}><OurTeamPage pageData={pageData}/></LayoutComponent> 
            case 'shopOverviewPage':
              return  <LayoutComponent pageData={pageData}><ShopPage pageData={pageData}/></LayoutComponent>  
            case 'shopDetailsPage':
              return  <LayoutComponent pageData={pageData}><ShopDetails pageData={pageData}/></LayoutComponent>  
            case 'basketPage':
              return  <LayoutComponent pageData={pageData}><BasketPage pageData={pageData}/></LayoutComponent> 
            default:
              return <LayoutComponent pageData={pageData}><NotFoundPage/></LayoutComponent>
          }
        })()
      }
    </>
  )
}

export default PageResolver;
