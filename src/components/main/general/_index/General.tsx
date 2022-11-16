import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../hooks/redux";
import Button from "../../../UI/button/Button";
import s from "./General.module.scss";

function General() {
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <section className={s.box}>
      <div className={s.desc}>
        <h3>{t("general.title")}</h3>
        <h3 className={s.day}>День {gameDay}</h3>
      </div>
      <ul className={s.list}>
        <div>
          <Button onClick={() => changeLanguage("en")}>EN</Button>
          <Button onClick={() => changeLanguage("ru")}>RU</Button>
        </div>
        {/* <GenItem title="All The Money"  /> */}
        {/* <GenItem title="Unused Money"  /> */}
      </ul>
    </section>
  );
}

export default General;
