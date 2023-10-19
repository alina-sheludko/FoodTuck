import {useContext} from 'react';
import { Localizations } from '../../../App';
import styles from './SuccessStep.module.scss';
import layoutStyles from '../../../styles/layout.module.scss';
import Title from '../../../shared/components/panels-title/Title'

const SuccessStep = ({orderNumber}) => {
  const localizations = useContext(Localizations);

  return (
    <div className={`${styles.successStep} ${layoutStyles.container}`}>
      <Title title={localizations["SuccessStep.Title"].replace('{number}', `${orderNumber}`)} className={`${styles.successStepTitle}`}/>
      
      <p className={styles.successStepText}>{localizations["SuccessStep.Text"]}</p>
    </div>
  )
}

export default SuccessStep;
