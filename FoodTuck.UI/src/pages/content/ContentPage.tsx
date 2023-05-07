import HeroPanel from '../../panels/hero/HeroPanel';
import Panels from '../../panels/Panels';

interface IProps {
  pageData: IPageData
}

interface IPageData {
  panels: any[]
}

const ContentPage = ({pageData}: IProps) => {
  return (
    <div>
      <HeroPanel/>
      
      <Panels panels={pageData.panels}/>
    </div>
  )
}

export default ContentPage;