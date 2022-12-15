import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../functions/representation";
import { useAppDispatch } from "../../hooks/redux";
import { modalSlice } from "../../store/reducers/modal/modalSlice";
import { rulesSlice } from "../../store/reducers/rules/rulesSlice";
import Button from "../UI/button/Button";
import Select from "../UI/select/Select";
import { useToolbarData } from "./Toolbar.data";
import s from "./Toolbar.module.scss";

function Toolbar() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setIsCreateCompany } = modalSlice.actions;
  const { setStatisticBy } = rulesSlice.actions;
  const options = useToolbarData();
  const { daysByString } = useRepresentation();

  function setModalVisible() {
    dispatch(setIsCreateCompany(true));
  }

  return (
    <div className={s.box}>
      <div className={s.companies}>
        <h3 className={s.title}>{t("title.companies")}</h3>
        <Button
          type="main-accept"
          className={s.accept}
          onClick={setModalVisible}
        >
          {t("button.new_company")}
        </Button>
      </div>
      <div className={s.statistics}>
        <span>{t("text.stats")}: </span>
        <Select
          options={options}
          action={setStatisticBy}
          initial={daysByString()}
        />
      </div>
    </div>
  );
}

export default Toolbar;
