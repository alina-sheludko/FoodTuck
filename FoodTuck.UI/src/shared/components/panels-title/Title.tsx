import { useState, useEffect } from 'react';
import styles from './Title.module.scss';

interface IProps {
  title: string,
  className: string
}

const Title = ({title, className}: IProps) => {
  const [highlightedTitle, setHighlightedTitle] = useState('');
  const [mainTitle, setMainTitle] = useState('');
  
  useEffect(() => {
    if (title) {
      setHighlightedTitle(title.slice(0, 2));
      setMainTitle(title.slice(2));
    }
  }, [title]);

  return (
    <>
      {
        title &&
        <h2 className={`${className} ${styles.title}`}>
          <span className={styles.titleHighlightedText}>{highlightedTitle}</span>
          {mainTitle}
        </h2>
      }
    </>
  )
} 

export default Title;