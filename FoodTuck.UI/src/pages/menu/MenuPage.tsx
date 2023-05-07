import HeroPanel from '../../panels/hero/HeroPanel';
import Panels from '../../panels/Panels';

interface IProps {
  pageData: IPageData
}
interface IPageData {
  pageAlias: string,
  pageTitle: string,
  panels: any[],
}

const MenuPage = ({pageData}: IProps) => {
  return (
    <div>
      <HeroPanel/>
      
      <Panels panels={pageData.panels}/>
    </div>
  )
}

export default MenuPage;