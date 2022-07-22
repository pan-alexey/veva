import { h, JSX } from "preact";
import { cssClassName } from '~/utils';
import styles from './styles.css';

export interface TabProps {
  title: string;
  description: string;
}

export const Tabs = ({ tabs, activeTab, setTabs }: {tabs: Array<TabProps>, activeTab: number, setTabs: (tabindex: number) => void}): JSX.Element => {
  const onClick = (tabindex: number) => {
    if (tabindex !== activeTab) {
      setTabs(tabindex)
    }
  }

  return (
    <div className={cssClassName(styles, ['tabs'])}>
      {tabs.map((tab, i) =>
        <div data-testid={"tab"} key={i} onClick={() => onClick(i)} className={cssClassName(styles, ['tab',  i === activeTab ? 'active': ''])}>
          <div className={cssClassName(styles, ['tab-title'])}>{ tab.title }</div>
          <div className={cssClassName(styles, ['tab-description'])}>{ tab.description }</div>
        </div>
      )}
    </div>
  );
};