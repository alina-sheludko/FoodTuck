import { useRef, useEffect, useState } from 'react';

import styles from './IconsPanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss';

interface IPageData {
 data: IPanelData
}

interface IPanelData {
  title: string,
  subtitle: string,
  items: string[]
}

const IconsPanel = ({data}: IPageData) => {
  const outerContainerRef = useRef<HTMLDivElement>();
  const innerContainerRef = useRef<HTMLDivElement>();
  const [widthOuterContainer, setWidthOuterContainer] = useState(0);
  const [widthInnerContainer, setWidthInnerContainer] = useState(0);
  const [loadedImages, setLoadedImages] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  let count = 0;
  function changeLoadedImages() {
    count++;
    if(count === data.items.length) {
      setLoadedImages(true);
    }
  }

  function useHandleResize() {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', useHandleResize);
    return () => window.removeEventListener('resize', useHandleResize);
  }, [])

  useEffect(() => {
    if(loadedImages) {
      setWidthInnerContainer(
        widthOuterContainer < widthInnerContainer 
          ? innerContainerRef.current!.getBoundingClientRect().width / 2
          : innerContainerRef.current!.getBoundingClientRect().width
      );
      setWidthOuterContainer(outerContainerRef.current!.getBoundingClientRect().width);
    }   
  },[loadedImages, windowWidth]);
    
  return (
    <div className={`${styles.iconsPanel} ${layoutStyles.container}`}>
      <p className={styles.iconsPanelSubTitle}>{data.subtitle}</p>

      <h2 className={styles.iconsPanelTitle}>{data.title}</h2>
      
      <div className={styles.iconsPanelImage}>
        <div 
          className={widthOuterContainer < widthInnerContainer ? styles.movingTextInfinite : styles.movingText} 
          ref={outerContainerRef}
        >
          <div className={styles.wrapperImage} ref={innerContainerRef}>
            {data.items.map((el, i) => (
              <img className={styles.wrapperImageItem} src={el} alt='' key={i} onLoad={() => changeLoadedImages()} />
            ))}
            
            {widthOuterContainer < widthInnerContainer && data.items.map((el, i) => (
              <img className={styles.wrapperImageItem} src={el} alt='' key={i}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconsPanel;