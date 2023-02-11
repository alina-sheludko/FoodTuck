import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";

import styles from "./Header.module.scss";
import Logo from "../../assets/images/logo.svg";
import User from '../../assets/images/user.svg';
import Handbag from "../../assets/images/handbag.svg";
import CloseIcon from "../../assets/images/icon_close.svg";
import { getTopNavigation } from "../../shared/services/navigation";

interface IProps {
  navigation: INavigationLink[];
}

interface INavigationLink {
  url: string;
  name: string;
}

const Header = (props: IProps): JSX.Element => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [linksList, setLinksList] = useState<INavigationLink[]>([]);
  const [activeUrl, setActiveUrl] = useState<string>();

  const duration = 500;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    left: "-100%",
  };

  const transitionStyles: any = {
    entering: { left: 0 },
    entered: { left: 0 },
    exiting: { left: "-100%" },
    exited: { left: "-100%" },
  };

  useEffect(() => {
    getTopNavigation().then(links => {
      setLinksList(links) 
    })
  }, []);

  let location = useLocation();
 
  useEffect(() => {
    const activeLink = linksList?.find(link => {
      if (link.url === '/') {
        return location.pathname === '/'
      }

      return location.pathname.startsWith(link.url);
    })

    setActiveUrl(activeLink ? activeLink.url : '')
    }, [location, linksList]);

  return (
    <>
      <Transition in={isBurgerMenuOpened} timeout={duration} unmountOnExit>
        {(state: any) => (
          <div
            className={styles.menu}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className={styles.menuWrapper}>
              <img className={styles.menuWrapperLogo} src={Logo} alt="logo" />
              <button
                className={styles.menuButton}
                onClick={() => setIsBurgerMenuOpened(!isBurgerMenuOpened)}
              >
                <img
                  className={styles.menuButtonClose}
                  src={CloseIcon}
                  alt="close"
                />
              </button>
            </div>
            <nav className={styles.menuItems}>
              {linksList.map((el, i) => (
                <NavLink 
                  className = {() => (activeUrl === el.url ? `${styles.menuItemsSelected} ` : `${styles.menuItemsEl}`)}
                  key={i}
                  to={el.url}
                >
                  {el.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </Transition>

      <header className={styles.header}>
        <button className={styles.headerMenu} onClick={() => setIsBurgerMenuOpened(!isBurgerMenuOpened)}>
          <div className={styles.headerMenuLine}></div>
          <div className={styles.headerMenuLine}></div>
          <div className={styles.headerMenuLine}></div>
        </button>
        <img className={styles.headerLogo} src={Logo} alt="logo" /> 
        <div>
          <button className={styles.headerUser}>
            <img src={User} alt="user" />
          </button>
          <button className={styles.headerBasket}>
            <img src={Handbag} alt="basket" />
          </button>
        </div>
        
        <div className={styles.navbar}>
          <img className={styles.navbarLogo} src={Logo} alt="logo" /> 
          <nav className={styles.navbarLinks}>
            {linksList.map((el, i) => (
              <NavLink
                className = {() => (activeUrl === el.url ? `${styles.navbarLinksSelected} ` : `${styles.navbarLinksItem}`)}
                key={i} 
                to={el.url}
              >
                {el.name}
              </NavLink>
            ))}
          </nav>
          <div className={styles.navbarRight}>
            <button className={styles.navbarUser}>
              <img src={User} alt="user" />
            </button>
            <button className={styles.navbarBasket}>
              <img src={Handbag} alt="basket" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
