import { h, JSX } from "preact";
import { Items } from '@veva/utils/webpackHmrStats';
import { Tabs, TabProps } from '~/components/tabs'
import { Item } from '~/components/item'
import { Actions } from '~/components/actions'

import { cssClassName } from '~/utils';
import styles from './styles.css';
import { useState } from "preact/hooks";

interface State {
  errors: Items[],
  warnings?: Items[],
}

export interface StateItem {
  title: string;
  descriptions: string;
  type: 'error' | 'warning'
  items: Items[];
}

export const getTabs = (stateItems: Array<StateItem>): Array<{
  title: string;
  description: string;
}> => {
  return stateItems.map(e => {
    return {
      title: e.title,
      description: e.descriptions,
    }
  });
}

export const Content = ({ state }: { state: State} ): JSX.Element => {
  const [activeTab, setActiveTab ] = useState<number>(0);
  const [filter, setFilter] = useState<string>('all');

  const [expand, setExpand] = useState<boolean>(true);
  const [renderKey, setRenderKey] = useState<number>(new Date().getTime());

  const setTabs = (index: number) => {
    setActiveTab(index);
    setFilter('all');
    setExpand(true)
    setRenderKey(new Date().getTime())
  }

  const onExpand = (value: boolean) => {
    setExpand(value);
    setRenderKey(new Date().getTime())
  }

  const stateItems: Array<{
    title: string;
    descriptions: string;
    type: 'error' | 'warning'
    items: Items[];
  }> = [];
  stateItems.push({
    title: 'Error',
    descriptions: `compile with ${state.errors.length} errors`,
    type: 'error',
    items: state.errors
  })
  if (state.warnings?.length) {
    stateItems.push({
      title: 'Warnings',
      descriptions: `compile with ${state.warnings.length} warnings`,
      type: 'warning',
      items: state.warnings
    })
  }
  const selectItem = stateItems[activeTab];

  return (
    <div className={cssClassName(styles, ['content'])}>
      <Tabs activeTab={activeTab} setTabs={setTabs} tabs={getTabs(stateItems)}/>
      <div className={cssClassName(styles, ['panel'])}>
      <div className={cssClassName(styles, ['panel-actions'])}>
        <Actions selectFilter={filter} setFilter={setFilter} items={selectItem.items} onExpand={onExpand}/>
      </div>
      <div key={renderKey} className={cssClassName(styles, ['panel-items'])}>
        { selectItem.items.filter(item => {
          switch (filter) {
            case 'client':
              return item.isClinet;
            case 'server':
              return item.isServer;
            default:
              return true;
          }
        }).map((item, i) => {
          return <Item item={item} expand={expand} type={selectItem.type}/>
        })}
      </div>
    </div>
    </div>
  );
};