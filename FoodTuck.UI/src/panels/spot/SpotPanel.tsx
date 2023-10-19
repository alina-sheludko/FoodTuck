import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from './SpotPanel.module.scss';
import Check from '../../assets/images/spot-panel-check.svg';
import layoutStyles from '../../styles/layout.module.scss';
import { Localizations } from "../../App";
import Title from "../../shared/components/panels-title/Title";

interface IProps {
  subtitle: string,
  title: string,
  description: string,
  link: string,
  images: IImage[]
}

interface IImage {
  alt: string,
  sources: any[],
  src: string
}

const SpotPanel = ({data}: IProps) => {
  const localizations = useContext(Localizations);

  return (
    <div className={`${styles.spotPanel} ${layoutStyles.container}`}>
      <div className={styles.aboutUs}>
        <p className={styles.aboutUsSubTitle}>{data.title}</p>

        <Title title={data.subtitle} className={`${styles.aboutUsTitle}`} />

        <div className={styles.aboutUsImages}>
          <img className={styles.imagesItem} src={data.images[0].src.concat('?rw=660&rh=300')}
        alt={data.images[0].alt} />

          <div className={styles.wrapperImages}>
            <img className={styles.wrapperImagesItem} src={data.images[1].src.concat('?rw=332&rh=194')} alt={data.images[0].alt} />
            
            <img className={styles.wrapperImagesItem} src={data.images[2].src.concat('?rw=332&rh=194')} alt={data.images[0].alt} />
          </div>
        </div>

        <p className={styles.aboutUsDescription} dangerouslySetInnerHTML={{__html: data.description.slice(0, data.description.indexOf(`<ul><li>`))}}></p>

        <ul 
          className={styles.aboutUsInfo} 
          dangerouslySetInnerHTML={{__html:  data.description.slice(data.description.indexOf(`<li>`))
          .replaceAll('<li>', `<li><img class=${styles.aboutUsCheck} src=${Check} alt="check" />`)}}> 
        </ul>

        {data.link &&
          <Link className={styles.aboutUsButton} to={data.link}>{localizations["SpotPanel.Button"]}</Link>
        }
      </div>

      <div className={styles.images}>
        <img className={styles.imagesItem} src={data.images[0].src.concat('?rw=660&rh=300')}
        alt={data.images[0].alt} />

        <div className={styles.wrapperImages}>
          <img className={styles.wrapperImagesItem} src={data.images[1].src.concat('?rw=332&rh=194')} alt={data.images[0].alt} />
          
          <img className={styles.wrapperImagesItem} src={data.images[2].src.concat('?rw=332&rh=194')} alt={data.images[0].alt} />
        </div>
      </div>
    </div>
  )
}

export default SpotPanel;



