import { FC } from "react";
import { shortBalance } from "../../../../functions/representation";
import { useAppSelector } from "../../../../hooks/redux";
import LogoMore from "../../../UI/svg/logoMore/LogoMore";
import { IGenItem } from "./GenItem.interface";
import s from "./GenItem.module.scss";

const GenItem: FC<IGenItem> = ({ item }) => {
  const { statisticBy } = useAppSelector(state => state.rulesReducer);

  return (
    <li className={s.item}>
      <span className={s.title__box}>
        <h3 className={s.title}>{item.title}</h3>
        <LogoMore text={item.desc} />
      </span>
      <p className={s.sum}>$ {shortBalance(item.value)}</p>
      {item.isByPeriod && (
        <p className={s.income__desc}>За {statisticBy} дней</p>
      )}
    </li>
  );
};

export default GenItem;
