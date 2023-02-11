import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import HomePage from "../../pages/home/HomePage";
import MenuPage from "../../pages/menu/MenuPage";
import ContentPage from "../../pages/content/ContentPage";
import NotFoundPage from "../../pages/not-found-page/NotFoundPage";

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
    axios.get(`http://localhost:3000/api/node/getByUrl?url=${window.location.href}`)
    .then(({data}) => {
      return setPageData(data)
    })
    .catch(() => setPageData(null))
    .finally(() => setIsLoading(false))
  }, [location]);
  
  return (
    <main>
      {!isLoading &&
        (() => {
          switch (pageData?.pageAlias){
            case "homePage":
              return <HomePage/>
            case 'menuPage':
              return <MenuPage/>
            case 'contentPage':
              return <ContentPage/>
            case 'notFoundPage':
              return <NotFoundPage/>
            default:
              return <NotFoundPage/>
          }
        })()
      }
    </main>
  )
}

export default PageResolver;
