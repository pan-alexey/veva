import { h, JSX } from "preact";
import { Items } from '@veva/utils/webpackHmrStats';
import { cssClassName } from '~/utils';
import styles from './styles.css';

import { Carret } from '~/components/svg'
import { useState } from "preact/hooks";
import Convert from 'ansi-to-html'

const ansiToHtml = new Convert({
  newline: true,
  colors: {
    0: '#000',
    1: '#FF3333',
    // 2: '#0A0',
    // 3: '#A50',
    // 4: '#00A',
    // 5: '#A0A',
    // 6: '#0AA',
    // 7: '#AAA',
    // 8: '#555',
    // 9: '#F55',
    // 10: '#5F5',
    // 11: '#FF5',
    // 12: '#55F',
    // 13: '#F5F',
    // 14: '#5FF',
    // 15: '#FFF'
  }
});


export const Item = ({expand = true, type, item}: {
  expand: boolean;
  type: string;
  item: Items;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(expand)
  const collapse = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={cssClassName(styles, ['item'])}>
      <div className={cssClassName(styles, ['item-title'])}>
        <div className={cssClassName(styles, ['item-title-content'])}>
          <span className={cssClassName(styles, ['ellipsis'])}>
            <span className={cssClassName(styles, [type])}>{ type.toUpperCase() }</span>
            <span> in </span>
            <span>{ item.name }</span>
          </span>
        </div>
        <div className={cssClassName(styles, ['item-title-tags'])}>
          { item.isServer && <span className={cssClassName(styles, ['tag'])}>server</span> }
          { item.isClinet && <span className={cssClassName(styles, ['tag'])}>clinet</span> }
        </div>
        <div onClick={collapse} className={cssClassName(styles, ['item-title-actions'])}>
          <Carret className={cssClassName(styles, ['item-carret', !isOpen ? 'open': ''])}/>
        </div>
      </div>
      { isOpen && <div className={cssClassName(styles, ['item-body'])} 
        dangerouslySetInnerHTML={{__html: ansiToHtml.toHtml(item.message)}}
      />}
    </div>
  );
};