import { Fragment, h, JSX } from "preact";
import { Bug, Close } from '~/components/svg'
import styles from "./styles/index.css";
import { cssClassName } from '~/utils';

export const Navbar = (props: {
  onClose: () => void;
}): JSX.Element => {
  return (
  <Fragment>
    <div className={cssClassName(styles, ['navbar'])}>
      <div  className={cssClassName(styles, ['logo'])}><Bug size="18px" className={cssClassName(styles, ['icon'])}/> Compile with error</div>
      <div className={cssClassName(styles, ['action'])} onClick={props.onClose} data-testid={"navbar-close"}><Close /></div>
    </div>
  </Fragment>)
};