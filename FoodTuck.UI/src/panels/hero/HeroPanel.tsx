import styles from './HeroPanel.module.scss';
import HeroBackground from '../../assets/images/hero-panels-background.png';
import CaretRight from '../../assets/images/hero-caret-right.svg';
import {IPageData} from '../../shared/components/page-resolver/PageResolver';

interface IProps {
  pageData: IPageData
}

const HeroPanel = ({pageData}: IProps) => {
  return (
    <div className={styles.heroPanel}>
      <img className={styles.heroPanelImg} src={HeroBackground} alt="" />

      <div className={styles.heroPanelInfo}>
        <h2 className={styles.heroPanelInfoTitle}>{pageData.pageTitle}</h2>

        <div className={styles.routes}>
          {pageData.breadcrumbs.map((el, i) => (
            i !== pageData.breadcrumbs.length-1 ?  
            <nobr key={i}>
              <span className={styles.routesItem}>{el.name}</span>
              <img src={CaretRight} alt="" />
            </nobr>
            :
            <nobr key={i}>
              <span className={styles.routesItemHighlightedText}>{el.name}</span>
            </nobr>
          ))} 
        </div>
      </div>
    </div>
  )
}

export default HeroPanel;