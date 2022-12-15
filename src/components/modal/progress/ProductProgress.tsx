import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSetupProduction } from "../../../hooks/setupProduction/setupProduction";
import Button from "../../UI/button/Button";
import Preloader from "../../UI/preloader/Preloader";
import LogoMore from "../../UI/svg/logoMore/LogoMore";
import { useProductProgressData } from "./ProductProgress.data";
import { IProductProgress } from "./ProductProgress.interface";
import s from "./ProductProgress.module.scss";

const ProductProgress: FC<IProductProgress> = ({
  calc,
  isLoader,
  costs,
  salary,
}) => {
  const { content, income } = useProductProgressData(calc);
  const { createNewTask } = useSetupProduction(calc, costs, salary);
  const { t } = useTranslation();

  return (
    <div className={s.progress}>
      <Preloader isLoader={isLoader}>
        <ul className={s.list}>
          {content.map(item => (
            <li key={content.indexOf(item)} className={s.item}>
              <span className={s.property}>
                <span className={s.name}>{item.property}</span>
                <LogoMore text={item.prompt} />
              </span>

              <span className={s.value}>{item.value}</span>
            </li>
          ))}
        </ul>
      </Preloader>
      <Preloader isLoader={isLoader}>
        <ul className={s.list}>
          {income.map(item => (
            <li key={income.indexOf(item)} className={s.item}>
              <span className={s.property}>
                <span className={s.name}>{item.property}</span>
                <LogoMore text={item.prompt} />
              </span>

              <span className={s.value}>{item.value}</span>
            </li>
          ))}
        </ul>
      </Preloader>
      <Preloader isLoader={isLoader}>
        <Button onClick={createNewTask}>{t("button.start")}</Button>
      </Preloader>
    </div>
  );
};

export default ProductProgress;
