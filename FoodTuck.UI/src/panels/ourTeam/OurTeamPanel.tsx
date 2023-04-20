import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './OurTeamPanel.module.scss';
import layoutStyles from "../../styles/layout.module.scss";
import Picture, { IImage } from '../../shared/components/Picture';
import { Localizations } from '../../App';
import Title from '../../shared/helpers/Title';

interface IProps {
  data: IPanelData
}

interface IPanelData {
  teamMembers: ITeamMembers[],
  title: string,
  subtitle: string,
  seeMoreLink: string
}

interface ITeamMembers {
  name: string,
  surname: string,
  jobTitle: string,
  img: IImage
}

const OurTeamPanel = ({data}: IProps) => {
  const localizations = useContext(Localizations);

  return (
    <div className={`${styles.panel} ${layoutStyles.container}`}>
      <p className={styles.panelSubTitle}>{data.subtitle}</p>

      <Title title={data.title} className={`${styles.panelTitle}`} />
      
      <div className={styles.memberCard}>
        {data.teamMembers.map((el, i) => (
          <div className={styles.wrapper} key={i}>
            <Picture data={{...el.img, alt: `${el.name[0]}. ${el.surname}` }} classForImg={`${styles.memberCardItem}`}/>
            
            <div className={styles.memberCardItemInfo}>
              <p className={styles.memberCardItemInfoName}>{el.name[0]}. {el.surname}</p>
              
              <p className={styles.memberCardItemInfoJob}>{el.jobTitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link className={styles.panelButton} to={data.seeMoreLink}>{localizations["OurTeamPanel.Button"]}</Link>  
    </div>
  )
}

export default OurTeamPanel;