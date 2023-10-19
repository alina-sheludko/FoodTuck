import styles from './MenuPanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss';

interface IProps {
  items: IItem[],
  sideForImage: string,
  title: string,
  topIcon: string
}

interface IItem {
  calories: number,
  ingredients: string,
  name: string,
  price: number,
  images: any[]
}

const MenuPanel = ({data}: IProps) => {
  return (
    <>
      <div className={`${styles.menuPanel} ${layoutStyles.container}`}>
        {
          data.sideForImage === 'left' &&
          <img className={`${styles.menuPanelDish} ${styles.menuPanelDishRight}`} src={data.items[0].images[0]} alt="dish from the menu" />
        }
        <div className={styles.menu}>
          <img className={styles.menuLogo} src={data.topIcon} alt={data.title} /> 

          <h2 className={styles.menuTitle}>{data.title}</h2>
            {data.items.map((el, i) => (
              <div key={i}>
                <div className={styles.menuItem}>
                  <div>
                    <p className={styles.menuItemName}>{el.name}</p>

                    <p className={styles.menuItemIngredients}>{el.ingredients}</p>

                    <p className={styles.menuItemCal}>{el.calories} CAL</p>
                  </div>

                  <p className={styles.menuItemPrice}>{el.price}$</p>
                </div>
                
                <div className={styles.menuItemLine}></div>
              </div>
            ))
          }
        </div>
        {
          data.sideForImage === 'right' &&
          <img className={styles.menuPanelDish} src={data.items[0].images[0]} alt="dish from the menu" />
        }
      </div>
    </>
  )
}

export default MenuPanel;