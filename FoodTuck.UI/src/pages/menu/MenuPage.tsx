import Panels from '../../panels/Panels';

interface IProps {
  pageData: IPageData
}
interface IPageData {
  pageAlias: string,
  pageTitle: string,
  panels: any[],
  products: IProducts
}

export interface IProducts {
  items: IItem,
  totalCount: number
}

interface IItem {
  calories: number,
  category: string,
  description: string,
  discount: number,
  images: any[],
  ingredients: string,
  name: string,
  price: number,
  shortDescription: string
}

const MenuPage = ({pageData}: IProps) => {

  return (
    <div>
      <Panels panels={pageData.panels}/>
    </div>
  )
}

export default MenuPage;