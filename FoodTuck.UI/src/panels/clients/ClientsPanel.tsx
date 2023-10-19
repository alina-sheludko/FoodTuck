import styles from './ClientsPanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import Picture,  { IImage } from '../../shared/components/picture/Picture';

interface IProps {
  data: IPanelData
}

interface IPanelData {
  items: IItem[],
  backgroundImg: IImage
}

interface IItem {
  title: string,
  subtitle: string,
  description: string,
  icon: string
}

const ClientsPanel = ({data}: IProps) => {
  return (
    <div className={styles.clientsPanel}>
      <div className={styles.clientsPanelWrapper}>
        {data.backgroundImg &&
          <div className={styles.pictureWrapper}>
            <Picture data={data.backgroundImg} classForImg={`${styles.clientsPanelBackground}`}/>
          </div>
        }
      </div>

      <div className={layoutStyles.container}>
        <div className={data.backgroundImg ? styles.wrapperIconBox : styles.wrapperIconBoxNotBackground}>
          {data.items.map((el, i) => (
            <div className={data.backgroundImg ? styles.iconBox : `${styles.iconBox} ${styles.iconBoxNotBackground}`}   key={i}>
              <img className={styles.iconBoxImg} src={el.icon} alt={el.subtitle + ' ' + el.title} />

              {el.subtitle && <p className={ styles.iconBoxSubTitle}>{el.subtitle}</p>}

              {el.title && 
                <p className={data.backgroundImg ? `${styles.iconBoxTitle}` : `${styles.iconBoxTitleDark}`}>{el.title}</p>}

              {el.description && <p className={styles.iconBoxDescription}>{el.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientsPanel;