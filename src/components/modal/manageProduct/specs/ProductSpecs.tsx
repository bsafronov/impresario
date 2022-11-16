import { FC } from "react";
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
        <li>
          <span>Баланс:</span> <span>${company.balance}</span>
        </li>
        <li>
          <span>Площадь:</span> <span>{product.area} усл.ед.</span>
        </li>
        <li>
          <span>Уровень рекламы:</span> <span>{company.adLevel}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductSpecs;
