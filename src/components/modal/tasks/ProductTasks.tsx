import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../../functions/representation";
import { useAppSelector } from "../../../hooks/redux";
import LogoMore from "../../UI/svg/logoMore/LogoMore";
import { IProductTasks } from "./ProductTasks.interface";
import s from "./ProductTasks.module.scss";

const ProductTasks: FC<IProductTasks> = ({ tasks }) => {
  const { t } = useTranslation();
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  const { shortBalance, fullBalance } = useRepresentation();
  return (
    <div className={s.box}>
      <h3 className={s.title}>{t("title.active_prod")}</h3>
      <div className={s.list}>
        {tasks.activeTasks.map(task => (
          <ul key={task.id} className={s.item}>
            <li className={s.line}>
              <span className={s.property}>{t("stats.status")}:</span>
              <span className={s.green}></span>
            </li>
            <li className={s.line}>
              <span className={s.property}>{t("stats.costs")}:</span>
              <span className={s.value}>
                <span>{shortBalance(task.costs + task.salary)}</span>
                <LogoMore text={fullBalance(task.costs + task.salary)} />
              </span>
            </li>
            <li className={s.line}>
              <span className={s.property}>{t("stats.expected_profit")}:</span>
              <span className={s.value}>
                <span>{shortBalance(task.expectedIncome)}</span>
                <LogoMore text={fullBalance(task.expectedIncome)} />
              </span>
            </li>
            <li className={s.line}>
              <span className={s.property}>{t("stats.time_left")}:</span>
              <span>
                <span>{task.finishedByDay - gameDay}</span>
                <span> {t("text.days")}</span>
              </span>
            </li>
            <li className={s.line}>
              <span className={s.property}>{t("stats.ad")}:</span>
              <span>+{task.adLvlUp.toFixed(2)}</span>
            </li>
          </ul>
        ))}
        {tasks.pendingTasks.map(task => (
          <ul key={task.id} className={s.item}>
            <li className={s.line}>
              <span className={s.property}>{t("stats.status")}:</span>
              <span className={s.blue}></span>
            </li>
            <li className={s.line}>
              <span className={s.property}>{t("stats.costs")}:</span>
              <span className={s.value}>
                <span>{shortBalance(task.costs * 0.5)}</span>
                <LogoMore text={fullBalance(task.costs * 0.5)} />
              </span>
            </li>
            <li className={s.line}>
              <span className={s.property}>{t("stats.ad")}:</span>
              <span>+{task.adLvlUp.toFixed(2)}</span>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProductTasks;
