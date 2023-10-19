import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';
import { Localizations } from '../../App';
import Title from '../../shared/components/panels-title/Title';

const NotFoundPage = () => {
  const localizations = useContext(Localizations);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.notFound}>
          <p className={styles.notFoundName}>{localizations["NotFoundPage.Name"]}</p>

          <Title title={localizations["NotFoundPage.Title"]} className={`${styles.notFoundTitle}`} />

          <p className={styles.notFoundInfo} dangerouslySetInnerHTML={{__html: localizations["NotFoundPage.Info"]}}></p>
          
          <Link className={styles.notFoundButton} to={'/'}>{localizations["NotFoundPage.Button"]}</Link>
        </div>
      </div>
    </>    
  )
}

export default NotFoundPage;