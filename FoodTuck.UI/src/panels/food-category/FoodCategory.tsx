import {useContext} from 'react';
import { Link } from 'react-router-dom'; 

import styles from './FoodCategory.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import Title from '../../shared/components/panels-title/Title';
import Picture, { IImage } from '../../shared/components/picture/Picture';
import { Localizations } from '../../App';

interface IProps {
  title: string,
  subtitle: string,
  items: IItem[]
}

interface IItem {
  category: string,
  discount: number,
  id: string,
  image: IImage
}

const FoodCategory = ({data}: IProps) => {
  const localizations = useContext(Localizations);

  return (
    <div className={`${styles.foodCategory} ${layoutStyles.container}`}>
      <p className={styles.foodCategorySectionTitle}>{data.title}</p>

      <Title title={data.subtitle} className={`${styles.foodCategoryTitle}`} />

      <div className={styles.wrapper}>
        {data.items.map((el, i) => (
          <Link className={styles.foodCards} to={el.url} key={i}>
            {el.image &&
              <Picture data={{...el.image, alt: `${el.category}` }} classForImg={`${styles.foodCardsItem}`}/>
            }

            <div className={styles.foodCardsInfo}>
              <p className={styles.foodCardsInfoText}>{localizations["FoodCategory.Info.Text"]}</p>
              
              <p className={styles.foodCardsInfoTitle}>{localizations["FoodCategory.Info.Title"]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FoodCategory;