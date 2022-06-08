import { Fragment, h, JSX } from "preact";
import styles from './style.module.css';

export const Navbar = (props: {
  onClose: () => void;
  errorCount: number;
}): JSX.Element => {
  return (
  <Fragment>
    <div className={[styles['nav'], styles['navbar']].join(' ')}>
      <div className={styles['navbar-content']}>Build with error ({ props.errorCount })</div>
      <div onClick={() => props.onClose()} className={styles['navbar-close']}>
        <span className={styles['navbar-close-icon']}></span>
      </div>
    </div>
    <nav className={styles['nav']}></nav>
  </Fragment>)
};