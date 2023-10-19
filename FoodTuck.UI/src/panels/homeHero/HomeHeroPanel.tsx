import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from './HomeHeroPanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import { Localizations } from '../../App';
import Picture, { IImage } from "../../shared/components/picture/Picture";
import Title from "../../shared/components/panels-title/Title";

interface IProps {
  data: IPanelData
}

interface IPanelData {
  img: IImage,
  title: string,
  subtitle: string,
  description: string,
  seeMoreLink: string
}

const HomeHeroPanel = ({data}: IProps) => {
  const localizations  = useContext(Localizations);

  return (
    <div className={`${styles.homeHeroPanel} ${layoutStyles.container}`}>
      <div className={styles.homeHeroPanelInfo}>
        <p className={styles.homeHeroPanelInfoSubTitle}>{data.subtitle}</p>

        <Title title={data.title} className={`${styles.homeHeroPanelInfoTitle}`} />

        <p className={styles.homeHeroPanelInfoDescription}>{data.description}</p>

        {data.seeMoreLink && 
          <Link className={styles.homeHeroPanelInfoButton} to={data.seeMoreLink}>{localizations["HomeHeroPanel.Button"]}
          </Link> 
        }
      </div>

      <Picture data={{...data.img, alt: `hero image` }} classForImg={`${styles.homeHeroPanelPictureImg}`} />
    </div>
  )
}

export default HomeHeroPanel;