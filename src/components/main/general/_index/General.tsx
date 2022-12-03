import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../hooks/redux";
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
        <h3>{t("general.title")}</h3>
        <h3 className={s.day}>День {gameDay}</h3>
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
