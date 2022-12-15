import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IMainButton } from "./Button.interface";
import s from "./Button.module.scss";

const Button: FC<IMainButton> = props => {
  const { t } = useTranslation();
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
      {props.type === "remove" && !props.children && t("button.delete")}
      {props.children}
    </button>
  );
};

export default Button;
