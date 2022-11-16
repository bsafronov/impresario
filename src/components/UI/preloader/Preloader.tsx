import { FC } from "react";
import { IPreloader } from "./Preloader.interface";
import s from "./Preloader.module.scss";

const Preloader: FC<IPreloader> = props => {
  return (
    <div className={props.isLoader ? s.box : s.box__animated}>
      <div className={props.isLoader ? s.visible : s.hidden}>
        {props.children}
      </div>
    </div>
  );
};

export default Preloader;
