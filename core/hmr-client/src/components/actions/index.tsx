import { h, JSX } from "preact";
import { cssClassName } from '~/utils';
import styles from './styles.css';
import { Collapse, Expand } from '~/components/svg'
import { Items } from '@veva/utils/webpackHmrStats';

export interface ActionsProps {
  items: Items[],
  selectFilter: string,
  setFilter: (filter: string) => void,
  onExpand: (expand: boolean) => void
}

export const Actions = ({ items, selectFilter, setFilter, onExpand }: ActionsProps): JSX.Element => {
  const onClick = (filter: string) => {
    if (filter !== selectFilter) {
      setFilter(filter);
    }
  };

  const filters = ['all'];
  if (items.findIndex(item => item.isServer) > -1) {
    filters.push('server')
  }

  if (items.findIndex(item => item.isClinet) > -1) {
    filters.push('client')
  }

  return (
    <div className={cssClassName(styles, ['actions'])}>
      <div className={cssClassName(styles, ['action-block'])}>
        <div data-testid={`filters`} className={cssClassName(styles, ['btn-group'])}>
          {filters.length > 2 && filters.map(name => 
            <div data-testid={`filter-${name}`} key={name} onClick={() => onClick(name)} className={cssClassName(styles, ['btn', selectFilter === name ? 'active' : ''])}>{ name }</div>
          )}
        </div>
      </div>
      <div className={cssClassName(styles, ['action-block'])}>
        <div className={cssClassName(styles, ['btn-actions'])}>
          <div data-testid={"expand-all"} onClick={() => onExpand(true)} className={cssClassName(styles, ['btn'])}>
            <Expand />
            <span className={cssClassName(styles, ['tooltip'])}>Expand all</span>
          </div>
          <div data-testid={"collapse-all"} onClick={() => onExpand(false)} className={cssClassName(styles, ['btn'])}>
            <Collapse />
            <span className={cssClassName(styles, ['tooltip'])}>Collapse all</span>
          </div>
        </div>
      </div>
    </div>
  );
};