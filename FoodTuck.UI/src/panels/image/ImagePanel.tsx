import styles from './ImagePanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss'
import Picture, { IImage } from '../../shared/components/picture/Picture';

interface IProps {
  data: IPanelData
} 

interface IPanelData {
  title: string,
  description: string,
  img: IImage,
}

const ImagePanel = ({data}: IProps) => {
  return (
    <div className={`${styles.imagePanel} ${layoutStyles.container}`}>
      <h2 className={styles.imagePanelTitle}>{data.title}</h2>

      <p className={styles.imagePanelDescription}>{data.description}</p>
      
      <Picture data={data.img} classForImg={`${styles.imagePanelImage}`} />
    </div>
  )
}

export default ImagePanel;