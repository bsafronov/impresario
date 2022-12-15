import { FC } from "react";
import { useRepresentation } from "../../functions/representation";
import { IGenItem } from "./GenItem.interface";
import s from "./GenItem.module.scss";

const GenItem: FC<IGenItem> = ({ item }) => {
  const { shortBalance, daysByString } = useRepresentation();

  return (
    <li className={s.item}>
      <span className={s.title__box}>
        <h3 className={s.title}>{item.title}</h3>
      </span>
      <p className={s.sum}>$ {shortBalance(item.value)}</p>
      {item.isByPeriod && <p className={s.income__desc}>{daysByString()}</p>}
    </li>
  );
};

export default GenItem;
