import { useState, useEffect} from 'react';

import styles from './FAQPanel.module.scss';
import layoutStyles from '../../styles/layout.module.scss';

import FAQItem from './FAQItem';

interface IProps {
  data: IPanelData
}

interface IPanelData {
  items: IItem[],
  title: string,
  description: string
}

interface IItem {
  answer: string,
  question: string
}

const FAQPanel = ({data}: IProps) => {
  const [questionsCol1, setQuestionsCol1] = useState<IItem[]>([]);
  const [questionsCol2, setQuestionsCol2] = useState<IItem[]>([]);


  useEffect(() => {
    setQuestionsCol1(data.items.slice(0, data.items.length/2));
    setQuestionsCol2(data.items.slice(data.items.length/2));
  }, [data.items]);

  return (
    <div className={`${layoutStyles.container} ${styles.faqPanel}`}>
      <h2 className={styles.faqPanelTitle}>{data.title}</h2>

      <p className={styles.faqPanelDescription}>{data.description}</p>
      
      <div className={styles.faqPanelWrapper}>
        <ul className={styles.faqPanelQuestions}>
          {
            questionsCol1.map((el, i) => (
              <FAQItem el={el} key={el.question}/>
            ))
          } 
        </ul>

        <ul className={styles.faqPanelQuestions}>
          {
           questionsCol2.map((el, i) => (
            <FAQItem el={el} key={el.question}/>
            ))
          } 
        </ul>
      </div>
    </div>
  )
}

export default FAQPanel;