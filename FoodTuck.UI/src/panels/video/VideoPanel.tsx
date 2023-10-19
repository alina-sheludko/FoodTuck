import { useContext } from 'react';

import styles from './VideoPanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import PlayVideo from '../../assets/images/restaurant-active-process-playVideo.svg';
import Picture, { IImage } from '../../shared/components/picture/Picture';
import { Localizations } from '../../App';
import Title from '../../shared/components/panels-title/Title';

interface IProps {
  data: IPanelData
}

interface IPanelData {
  title: string,
  subtitle: string,
  description: string,
  videoLink: string,
  img: IImage
}

const VideoPanel = ({data}: IProps) => {
  const localizations  = useContext(Localizations);

  function activateModal() {
    document.querySelector(`.${styles.modal}`)?.classList.add(`${styles.modalActive}`);
  } 
  function deactivateModal() {
    document.querySelector(`.${styles.modal}`)?.classList.remove(`${styles.modalActive}`);
  }

  return (
    <div className={styles.wrapper}>
      <Picture data={data.img} classForImg={styles.wrapperBackground}/>

      <div className={`${styles.videoPanel} ${layoutStyles.container}`}>
        <p className={styles.videoPanelSubTitle}>{data.subtitle}</p>

        <Title title={data.title} className={`${styles.videoPanelTitle}`}/>

        <p className={styles.videoPanelDescription}>{data.description}</p>

        <button className={styles.videoPanelButton} onClick={() => activateModal()}>
          <img className={styles.videoPanelButtonImg} src={PlayVideo} alt="Button Play Video" />
          {localizations["VideoPanel.Button"]}
        </button>
      </div>

        
      <div className={styles.modal} onClick={() => deactivateModal()}>
        <div className={styles.modalContent} onClick={(e) => {e.stopPropagation()}}>
          
        <iframe 
          className={styles.modalContentVideo} 
          src={data.videoLink} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
        </iframe>
        </div>
      </div>
    </div>
  )
}

export default VideoPanel;