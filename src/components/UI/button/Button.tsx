import { FC } from "react";
import { IMainButton } from "./Button.interface";
import s from "./Button.module.scss";

const Button: FC<IMainButton> = props => {
  const style = props.type ? props.type : "add-accept";
  const allStyles = [s[style], props.className].join(
    props.className ? " " : ""
  );

  return (
    <button
      className={allStyles}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.type === "remove" && "Удалить"}
      {props.children}
    </button>
  );
};

export default Button;
