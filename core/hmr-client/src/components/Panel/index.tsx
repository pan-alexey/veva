import { h, JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import style from './style.module.css'
import uniqueId from 'lodash/uniqueId';
import { Item } from '../Item'
import type { ResultItems } from '@veva/utils/webpackStats'

export const Panel = (props: {
  warnings: Array<ResultItems>,
  errors: Array<ResultItems>
}): JSX.Element => {
  const [ key, setKey ] = useState(uniqueId('key'));
  const [ items, setItems ] = useState(props.errors);
  const [ select, setSelect ] = useState('errors');
  const [ open, setOpen ] = useState(true);

  const collapseAll = () => {
    setOpen(false)
    setKey(uniqueId('key'))
  }
  
  const expandAll = () => {
    setOpen(true)
    setKey(uniqueId('key'))
  }

  const onSelect = (value: 'errors' | 'warnings') => {
    setSelect(value)
    switch (value) {
      case 'errors':
        setItems(props.errors)
      break;
      case 'warnings':
        setItems(props.warnings)
      break;
    }
  }

  return (
  <div className={style['panel']}>
    <div className={style['panel-tabs']}>
      <div onClick={()=>onSelect('errors')} className={[style['tab-item'], select === 'errors' && style['tab-item-active']].join(' ')}>
        Errors ({props.errors.length})
      </div>
      <div onClick={()=>onSelect('warnings')} className={[style['tab-item'], select === 'warnings' && style['tab-item-active']].join(' ')}>
        Warnings ({props.warnings.length})
      </div>
    </div>
    <div className={style['panel-body']}>
      <div className={style['panel-header']}>
        <div className={style['panel-header-action']}>
          <div onClick={collapseAll} className={style['button']}>Collapse all</div>
          <div onClick={expandAll} className={style['button']}>Expand All</div>
        </div>
      </div>

      <div key={key} className={style['panel-content']}>
        {items.map(function({ title, message }, i){
          return <Item title={title} message={message} open={open} />;
        })}
      </div>
    </div>
  </div>)
};