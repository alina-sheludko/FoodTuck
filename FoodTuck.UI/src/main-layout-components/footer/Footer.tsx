import { Link } from "react-router-dom";
import { useContext } from "react";


import styles from './Footer.module.scss';
import Watch from '../../assets/images/footer-watch.png';
import Facebook from '../../assets/images/footer-facebook.svg';
import Twitter from '../../assets/images/footer-twitter.svg';
import Instagram from '../../assets/images/footer-instagram.svg';
import Youtube from '../../assets/images/footer-youtube.svg';
import Pinterest from '../../assets/images/footer-pinterest.svg';
import { Localizations, SiteSettings } from '../../App';
import layoutStyles from '../../styles/layout.module.scss';
import Title from "../../shared/components/panels-title/Title";

const year = new Date().getFullYear();

const Footer = () => {
  const footer = {
    posts: [
      { url: "https://picsum.photos/50/50", title: "Keep Your Business", date: '20 Feb 2023' },
      { url: "https://picsum.photos/50/50", title: "Keep Your Business", date: '20 Feb 2023' },
      { url: "https://picsum.photos/50/50", title: "Keep Your Business", date: '20 Feb 2023' },
    ],
    socialLinks: [
      { url: "https://facebook.com", icon: `${Facebook}`, name: 'Facebook'},
      { url: "https://twitter.com", icon: `${Twitter}`, name: 'Twitter'},
      { url: "https://instagram.com", icon: `${Instagram}`, name: 'Instagram'},
      { url: "https://youtube.com", icon: `${Youtube}`, name: 'Youtube'},
      { url: "https://pinterest.com", icon: `${Pinterest}`, name: 'Pinterest'},
    ]
  }

  const localizations  = useContext(Localizations);
  const siteSettings = useContext(SiteSettings);

  if(!siteSettings) {
    return null; 
  } else {
    return (
      <footer>
        <div className={`${styles.footer} ${layoutStyles.container}`}>
          <div className={styles.support}>
            <div>
              <Title title={localizations["Footer.Support.Title"]} className={`${styles.supportTitle}`}/>

              <p className={styles.supportText}>{localizations["Footer.Support.Text"]}</p>
            </div>
            <form className={styles.mail}>
              <input className={styles.mailInput} type="text" placeholder={localizations["Footer.Support.Mail.Input.Placeholder"]}/>

              <button className={styles.mailButton}>{localizations["Footer.Support.Mail.Button"]}</button>
            </form>
          </div>
          <div className={styles.line}></div>
          <div className={styles.info}>
            <div className={styles.aboutUs}>
              <p className={styles.aboutUsTitle}>{localizations["Footer.Column.AboutUs.Title"]}</p>

              <p className={styles.aboutUsDescription}>{siteSettings.aboutUs.description}</p>

              <div className={styles.openingHours}>
                <img className={styles.openingHoursImg} src={Watch} alt="watch" />

                <div>
                  <p className={styles.openingHoursTitle}>Opening Hours</p>

                  <p className={styles.openingHoursInfo}>{siteSettings.workingHours}</p>

                  <p className={styles.openingHoursInfo}>{siteSettings.nonWorkingHours}</p>
                </div>
              </div>
            </div>

            <nav className={styles.links}>
              <p className={styles.linksTitle}>{localizations["Footer.Column.UsefulLinks.Title"]}</p>
              {siteSettings.footerLinks && siteSettings.footerLinks.map((el, i) => (
                <Link className={styles.linksItem} key={i} to={el.url}>{el.name}</Link>
              ))
              }
            </nav>

            <nav className={styles.moreInfoLinks}>
              <p className={styles.moreInfoLinksTitle}>{localizations["Footer.Column.Help.Title"]}</p>
              {siteSettings.learnMoreLinks.map((el,i) => (
                <Link className={styles.moreInfoLinksItem} key={i} to={el.url}>{el.name}</Link>
              ))
              }
            </nav>

            <div className={styles.posts}>
              <p className={styles.postsTitle}>{localizations["Footer.Column.Posts.Title"]}</p>

              {footer.posts.map((el, i) => (
                <div className={styles.postsCard} key={i}>
                  <img className={styles.postsCardImg} src={el.url} alt="img" />

                  <div className={styles.postsCardInfo}>
                    <p className={styles.postsCardInfoDate}>{el.date}</p>

                    <p className={styles.postsCardInfoTitle}>{el.title}</p>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
        </div>

        <div className={styles.footerPanelWrapper}>
          <div className={styles.footerPanel}>
            {localizations["Footer.Copyright"] && <p className={styles.footerPanelCopyright}>{localizations["Footer.Copyright"].replace('{year}', `${year}`)}</p>}

            <nav className={styles.socialLinks}>
              {footer.socialLinks.map((el, i) => (
                <a className={styles.socialLinksItem} href={el.url} key={i}>
                  <img className={styles.socialLinksImg} src={el.icon} alt={el.name} />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    )
  }  
}

export default Footer;