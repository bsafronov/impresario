import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import s from "./Modal.module.scss";

interface IModal {
  children?: ReactNode | null;
  closeFunc: any;
  closeButton?: boolean;
}

const Modal: FC<IModal> = props => {
  const { t } = useTranslation();

  return (
    <div className={s.box} onMouseDown={props.closeFunc}>
      <div className={s.inner} onMouseDown={e => e.stopPropagation()}>
        {props.children}
        {props.closeButton && (
          <Button type="main-accept" onClick={props.closeFunc}>
            {t("all.close")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;
