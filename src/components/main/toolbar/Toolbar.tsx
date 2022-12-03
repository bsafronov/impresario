import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { rulesSlice } from "../../../store/reducers/rules/rulesSlice";
import Button from "../../UI/button/Button";
import s from "./Toolbar.module.scss";
import "./toolbar.scss";

function Toolbar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { statisticBy, gameDay } = useAppSelector(state => state.rulesReducer);
  const { setIsCreateCompany } = modalSlice.actions;
  const { setStatisticBy } = rulesSlice.actions;

  function setModalVisible() {
    dispatch(setIsCreateCompany(true));
  }

  function setStatisticByFn(value: number) {
    if (statisticBy === value) return;
    dispatch(setStatisticBy(value));
  }

  function setBtnStyles(value: number) {
    return [s.item__btn, statisticBy === value && s.item__btn_active].join(" ");
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
            <button
              className={setBtnStyles(7)}
              onClick={() => setStatisticByFn(7)}
            >
              {t("toolbar.7days")}
            </button>
          </li>
          <li>
            <button
              className={setBtnStyles(30)}
              onClick={() => setStatisticByFn(30)}
            >
              {t("toolbar.30days")}
            </button>
          </li>
          <li>
            <button
              className={setBtnStyles(365)}
              onClick={() => setStatisticByFn(365)}
            >
              {t("toolbar.1year")}
            </button>
          </li>
          <li>
            <button
              className={setBtnStyles(gameDay)}
              onClick={() => setStatisticByFn(gameDay)}
            >
              Всё время
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Toolbar;
