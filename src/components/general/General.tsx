import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/redux";
import GenItem from "../genItem/GenItem";
import { useGeneralItemsData } from "./General.data";
import s from "./General.module.scss";

function General() {
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  const { items } = useGeneralItemsData();
  const { t } = useTranslation();

  return (
    <section className={s.box}>
      <div className={s.desc}>
        <h3 className={s.title}>{t("title.general")}</h3>
        <h3 className={s.day}>
          {t("stats.day")} {gameDay}
        </h3>
      </div>
      <div className={s.list__box}>
        <ul className={s.list}>
          {items.map(item => (
            <GenItem key={items.indexOf(item)} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default General;
