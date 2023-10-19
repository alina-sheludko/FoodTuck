import styles from './OurTeamPage.module.scss';
import layoutStyles from '../../styles/layout.module.scss';
import Picture, { IImage } from '../../shared/components/picture/Picture';

interface IProps {
  pageData: IPageData
}

interface IPageData {
  teamMembers: ITeamMembers[]
}

interface ITeamMembers {
  name: string,
  surname: string,
  jobTitle: string,
  img: IImage
}

const OurTeamPage = ({pageData}: IProps) => {
  return (
    <>       
      <div className={`${styles.ourTeamPage} ${layoutStyles.container}`}>
        {pageData.teamMembers.map((el, i) => (
          <div className={styles.memberCard} key={i}>
            <Picture data={{...el.img, alt: `${el.name[0]}. ${el.surname}`}} classForImg={`${styles.memberCardImg}`}/>
            
            <p className={styles.memberCardName}>{el.name} {el.surname}</p>
            
            <p className={styles.memberCardJob}>{el.jobTitle}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default OurTeamPage;