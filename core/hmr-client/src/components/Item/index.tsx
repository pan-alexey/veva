import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import styles from './style.module.css';

var Convert = require('ansi-to-html');
var ansiToHtml = new Convert({
  newline: true
});

export const Item = (props: {
  message: {
    client?: string;
    server?: string
  }
  title: string;
  open: boolean;
}): JSX.Element => {
  const [ open, setOpen ] = useState(props.open);

  const toggle = () => {
    setOpen(!open)
  }

  return (
  <div onClick={toggle} className={styles['item']}>
    <div className={styles['item-title']}>
      <div className={styles['item-action']}>
        <i className={[styles['item-arrow'], open ? styles['down'] : styles['right']].join(' ')} />
      </div>
      <div className={styles['item-message']}>
        {props.title}
      </div>
      <div className={styles['item-tags']}>
        {props.message.client && (<span className={[styles['item-tag'], styles['client']].join(' ')}>client</span>)}
        {props.message.server && (<span className={[styles['item-tag'], styles['server']].join(' ')}>server</span>)}
      </div>
    </div>
    { open && (() => {
      if (props.message.client === props.message.server) {
        return <div className={styles['item-body']}>
          <div className={styles['item-body-message']} dangerouslySetInnerHTML={{__html: ansiToHtml.toHtml(props.message.client)}} />
        </div>
      } else if (props.message.client && props.message.server) {
        return <div className={styles['item-body']}>
          <div className={styles['item-body-message']}>
            <span  className={[styles['item-tag'], styles['client']].join(" ")}>client</span>
            <div dangerouslySetInnerHTML={{__html: ansiToHtml.toHtml(props.message.client)}} />
          </div>
          <div className={styles['item-body-message']}>
            <span  className={[styles['item-tag'], styles['server']].join(" ")}>client</span>
            <div dangerouslySetInnerHTML={{__html: ansiToHtml.toHtml(props.message.server)}} />
          </div>
        </div>
      }
      else if (props.message.client) {
        return <div className={styles['item-body']}>
          <div className={styles['item-body-message']} dangerouslySetInnerHTML={{__html: ansiToHtml.toHtml(props.message.client)}} />
        </div>
      }
      else if (props.message.server) {
        return <div className={styles['item-body']}>
          <div className={styles['item-body-message']} dangerouslySetInnerHTML={{__html: ansiToHtml.toHtml(props.message.server)}} />
        </div>
      }
    })()}
  </div>
  )
};