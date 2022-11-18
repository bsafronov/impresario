import { FC } from "react";
import {
  fullBalance,
  shortBalance,
} from "../../../../functions/representation";
import LogoMore from "../../../UI/svg/logoMore/LogoMore";
import { IProductSpecs } from "./ProductSpecs.interface";
import s from "./ProductSpecs.module.scss";

const ProductSpecs: FC<IProductSpecs> = ({ company, product }) => {
  return (
    <div className={s.box}>
      <h3 className={s.title}>Данные продукта</h3>
      <ul className={s.list}>
        <li>
          <span>Название:</span> <span>{product.name}</span>
        </li>
        <li className={s.item}>
          <span>Баланс:</span>{" "}
          <span className={s.value}>${shortBalance(company.balance)}</span>
          <LogoMore text={fullBalance(company.balance)} />
        </li>
        <li>
          <span>Площадь:</span> <span>{product.area} усл.ед.</span>
        </li>
        <li>
          <span>Уровень рекламы: </span>
          <span>{company.adLevel.toFixed(1)}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductSpecs;
