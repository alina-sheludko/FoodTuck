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
      <Panels panels={pageData.panels}/>
    </div>
  )
}

export default ContentPage;