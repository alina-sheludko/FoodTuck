import { useState, useRef } from 'react';

import styles from './FAQPanel.module.scss';
import Plus from '../../assets/images/faq-panel-plus.svg';
import Minus from '../../assets/images/faq-panel-minus.svg';

interface IProps {
  el: IItem
}

interface IItem {
  answer: string,
  question: string
}

const FAQItem = ({el}: IProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const refItem = useRef<HTMLParagraphElement>(null);

  function toggle() {
    let element = refItem.current!;
    let height = element.scrollHeight;
    element.style.setProperty('--max-height', height + 'px');
    setIsOpened(!isOpened);
  }

  return (
    <>
      <li className={styles.faqItem}>
        <div className={styles.faqItemQuestion}>
          <h4 className={styles.faqItemQuestionText}>{el.question}</h4>

          <button className={styles.faqItemQuestionToggle} onClick={toggle} >
            <img  
              className={`${styles.faqItemQuestionTogglePlus}  ${isOpened && styles.hidden}`} 
              src={Plus} alt="" />

            <img 
              className={`${styles.faqItemQuestionToggleMinus} ${!isOpened && styles.hidden}`} 
              src={Minus} alt="" />
          </button>
        </div>

        <p className={`${styles.faqItemAnswer} ${!isOpened &&  styles.hidden}`} ref={refItem}>{el.answer}</p>
      </li>
    </>
  )
}

export default FAQItem;