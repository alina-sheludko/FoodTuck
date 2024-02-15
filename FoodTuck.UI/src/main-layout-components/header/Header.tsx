import { NavLink, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import {useSelector} from 'react-redux';

import styles from "./Header.module.scss";
import Logo from "../../assets/images/logo.svg";
import User from '../../assets/images/user.svg';
import Handbag from "../../assets/images/handbag.svg";
import CloseIcon from "../../assets/images/icon_close.svg";
import { getTopNavigation } from "../../shared/services/navigation";
import layoutStyles from '../../styles/layout.module.scss';


interface IProps {
  navigation: INavigationLink[];
}

interface INavigationLink {
  url: string;
  name: string;
}

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

const Header = ({props}: IProps): JSX.Element => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [linksList, setLinksList] = useState<INavigationLink[]>([]);
  const [activeUrl, setActiveUrl] = useState<string>();
  const store = useSelector(state => state);

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
                  onClick={() => setIsBurgerMenuOpened(false)}
                >
                  {el.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </Transition>
			
      <div className={styles.wrapper}>
         <header className={`${styles.header} ${layoutStyles.container}`}>
          <button className={styles.headerMenu} onClick={() => setIsBurgerMenuOpened(!isBurgerMenuOpened)}>
            <div className={styles.headerMenuLine}></div>
            <div className={styles.headerMenuLine}></div>
            <div className={styles.headerMenuLine}></div>
          </button>

          <Link to='/'>
            <img className={styles.headerLogo} src={Logo} alt="logo" /> 
          </Link>

          <div>
            <button className={styles.headerUser}>
              <img src={User} alt="user" />
            </button>

            <Link className={styles.headerBasket} to='/basket/'>
              <img src={Handbag} alt="basket" />
              {store.productsInBasket.length !== 0 && 
                <span className={styles.headerBasketCounter}>
                  {store.productsInBasket.reduce((sum, current) => sum + current.value, 0)}
                </span>
              }
            </Link>
          </div>
          
          <div className={styles.navbar}>
            <Link to='/'>
              <img className={styles.navbarLogo} src={Logo} alt="logo" /> 
            </Link>

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
              {/*DO NOT DELETE!!! This is user button */}
              {/* <button className={styles.navbarUser}>
                <img src={User} alt="user" />
              </button> */}
              
              <Link className={styles.navbarBasket} to='/basket/'>
                <img src={Handbag} alt="basket" />
                {store.productsInBasket.length !== 0 && 
                  <span className={styles.navbarBasketCounter}>
                    {store.productsInBasket.reduce((sum, current) => sum + current.value, 0)}
                  </span>
                }
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;

