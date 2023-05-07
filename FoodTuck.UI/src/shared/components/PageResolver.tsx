import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import HomePage from "../../pages/home/HomePage";
import MenuPage from "../../pages/menu/MenuPage";
import ContentPage from "../../pages/content/ContentPage";
import NotFoundPage from "../../pages/not-found-page/NotFoundPage";
import OurTeamPage from "../../pages/ourTeam/OurTeamPage";

interface IPageData {
  pageAlias: string,
  pageTitle: string,
  panels: any[],
}

const PageResolver = () => {
  let location = useLocation();
  const [pageData, setPageData] = useState<IPageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`/api/node/getByUrl?url=${window.location.href}`)
      .then(({data}) => {
        return setPageData(data)
      })
      .catch(() => setPageData(null))
      .finally(() => setIsLoading(false))
    
    scroll({ top: 0, behavior: 'smooth' })
  }, [location]);
  
  return (
    <>
      {!isLoading &&
        (() => {
          switch (pageData?.pageAlias){
            case "homePage":
              return <HomePage pageData={pageData}/>
            case 'menuPage':
              return <MenuPage pageData={pageData}/>
            case 'contentPage':
              return <ContentPage pageData={pageData}/>
            case 'notFoundPage':
              return <NotFoundPage/>
            case 'ourTeamPage':
              return <OurTeamPage pageData={pageData}/>
            default:
              return <NotFoundPage/>
          }
        })()
      }
    </>
  )
}

export default PageResolver;
