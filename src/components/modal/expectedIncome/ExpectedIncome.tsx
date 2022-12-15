import { t } from "i18next";
import { FC } from "react";
import { useRepresentation } from "../../../functions/representation";
import Preloader from "../../UI/preloader/Preloader";
import LogoMore from "../../UI/svg/logoMore/LogoMore";
import { useExpectedIncomeData } from "./ExpectedIncome.data";
import { IExpectedIncome } from "./ExpectedIncome.interface";
import s from "./ExpectedIncome.module.scss";

const ExpectedIncome: FC<IExpectedIncome> = ({ calc, isLoader }) => {
  const { content } = useExpectedIncomeData(calc);
  const { shortBalance } = useRepresentation();
  return (
    <div className={s.box}>
      <div className={s.title__box}>
        <h3 className={s.title}>{t("title.expected")}</h3>
        <LogoMore text={"При реализации 100% продукции"} />
      </div>
      <Preloader isLoader={isLoader}>
        <ul className={s.list}>
          {content.map(item => (
            <li className={s.item} key={content.indexOf(item)}>
              <span className={item.value >= 0 ? s.property : s.property__red}>
                {item.text}
              </span>
              <span className={s.value}>
                {[
                  !item.sign ? "$" : "",
                  shortBalance(item.value),
                  item.sign,
                ].join(" ")}
              </span>
            </li>
          ))}
        </ul>
      </Preloader>
    </div>
  );
};

export default ExpectedIncome;
