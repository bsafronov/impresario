import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import Button from "../../UI/button/Button";
import "./toolbar.scss";

function Toolbar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setIsCreateCompany } = modalSlice.actions;

  function setModalVisible() {
    dispatch(setIsCreateCompany(true));
  }

  return (
    <div className="toolbar">
      <div className="toolbar__companies">
        <h3 className="toolbar__title">{t("toolbar.title")}</h3>
        <Button
          type="main-accept"
          className="toolbar__accept"
          onClick={setModalVisible}
        >
          {t("toolbar.create-new")}
        </Button>
      </div>
      <div className="toolbar__statistics">
        <span>{t("toolbar.showfor")}</span>
        <ul className="toolbar__list">
          <li>
            <button className="toolbar__item-btn">{t("toolbar.7days")}</button>
          </li>
          <li>
            <button className="toolbar__item-btn">{t("toolbar.30days")}</button>
          </li>
          <li>
            <button className="toolbar__item-btn">{t("toolbar.1year")}</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Toolbar;
