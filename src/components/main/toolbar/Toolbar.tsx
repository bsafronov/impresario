import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import Button from "../../UI/button/Button";
import s from "./Toolbar.module.scss";
import "./toolbar.scss";

function Toolbar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setIsCreateCompany } = modalSlice.actions;

  function setModalVisible() {
    dispatch(setIsCreateCompany(true));
  }

  return (
    <div className={s.box}>
      <div className={s.companies}>
        <h3 className={s.title}>{t("toolbar.title")}</h3>
        <Button
          type="main-accept"
          className="toolbar__accept"
          onClick={setModalVisible}
        >
          {t("toolbar.create-new")}
        </Button>
      </div>
      <div className={s.statistics}>
        <span>{t("toolbar.showfor")}</span>
        <ul className={s.list}>
          <li>
            <button className={s.item__btn}>{t("toolbar.7days")}</button>
          </li>
          <li>
            <button className={s.item__btn}>{t("toolbar.30days")}</button>
          </li>
          <li>
            <button className={s.item__btn}>{t("toolbar.1year")}</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Toolbar;
