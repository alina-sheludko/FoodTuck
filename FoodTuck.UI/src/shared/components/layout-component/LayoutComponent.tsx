import HeroPanel from '../../../panels/hero/HeroPanel';
import {IPageData} from '../../components/page-resolver/PageResolver';

interface IProps {
  pageData: IPageData
}

const LayoutComponent = ({children, pageData}: IProps) => {
  return (
    <div>
      <HeroPanel pageData={pageData}/>
      {children}
    </div>
  )
}

export default LayoutComponent;