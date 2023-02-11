import { Link } from "react-router-dom";

import styles from './SpotPanel.module.scss';
import Item1 from '../../assets/images/spot-panel-item1.png';
import Item2 from '../../assets/images/spot-panel-item2.png';
import Item3 from '../../assets/images/spot-panel-item3.png';
import Check from '../../assets/images/spot-panel-check.svg';

const SpotPanel = () => {
  const spotPanel = [
    'Lacus nisi, et ac dapibus sit eu velit in consequat.',
    'Quisque diam pellentesque bibendum non dui volutpat fringilla',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  ]

  return (
    <div className={styles.spotPanel}>
      <div className={styles.aboutUs}>
        <p className={styles.aboutUsSectionTitle}>About us</p>
        <p className={styles.aboutUsTitle}>
          <span className={styles.aboutUsTitleHighlightedText}>We</span> Create the best foody product
        </p>
        <div className={styles.aboutUsImages}>
          <Gallery/>
        </div>
        <p className={styles.aboutUsDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</p>
        {spotPanel.map((el, i) => (
          <p className={styles.aboutUsInfo} key={i}> 
            <img className={styles.aboutUsCheck} src={Check} alt="check" />
            {el}
          </p>
        ))}
        <Link className={styles.aboutUsButton} to={'#'}>Read More</Link>
      </div>
      <div className={styles.images}>
        <Gallery/>
      </div>
    </div>
  )
}

const Gallery = () => {
  return (
    <>
      <img className={styles.imagesItem} src={Item1} alt="item1" />
      <div className={styles.wrapperImages}>
        <img className={styles.wrapperImagesItem} src={Item2} alt="item2" />
        <img className={styles.wrapperImagesItem} src={Item3} alt="item3" />
      </div>
    </>
  )
}

export default SpotPanel;

