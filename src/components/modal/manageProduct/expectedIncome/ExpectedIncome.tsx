import { FC } from "react";
import Preloader from "../../../UI/preloader/Preloader";
import LogoMore from "../../../UI/svg/logoMore/LogoMore";
import { expectedIncomeData } from "./ExpectedIncome.data";
import { IExpectedIncome } from "./ExpectedIncome.interface";
import s from "./ExpectedIncome.module.scss";

const ExpectedIncome: FC<IExpectedIncome> = ({ calc, isLoader }) => {
  const { content } = expectedIncomeData(calc);

  return (
    <div className={s.box}>
      <div className={s.title__box}>
        <h3 className={s.title}>Ожидаемые значения</h3>
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
                {[!item.sign ? "$" : "", item.value.toFixed(1), item.sign].join(
                  " "
                )}
              </span>
            </li>
          ))}
        </ul>
      </Preloader>
    </div>
  );
};

export default ExpectedIncome;
