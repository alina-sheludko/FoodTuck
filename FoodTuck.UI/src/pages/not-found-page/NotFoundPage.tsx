import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';
import { Localizations } from '../../App';

const NotFoundPage = () => {
  const localizations = useContext(Localizations);

  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>
        <p className={styles.notFoundName}>{localizations["NotFoundPage.Name"]}</p>
        <p className={styles.notFoundTitle}>{localizations["NotFoundPage.Title"]}</p>
        <p className={styles.notFoundInfo} dangerouslySetInnerHTML={{__html: localizations["NotFoundPage.Info"]}}></p>
        <Link className={styles.notFoundButton} to={'/'}>Go to home</Link>
      </div>
    </div>
  )
}

export default NotFoundPage;