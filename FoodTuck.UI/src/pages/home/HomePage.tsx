import styles from './HomePage.module.scss';
import Panels from '../../panels/Panels';

interface IProps { 
  pageData: IPageData
}
interface IPageData {
  pageAlias: string,
  pageTitle: string,
  panels: any[],
}

export default function HomePage({pageData}: IProps) {
  return (
    <div className={styles.homePage}>
      <Panels panels={pageData.panels}/>
    </div>
  )
}