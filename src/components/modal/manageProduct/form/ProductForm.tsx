import { FC } from "react";
import Input from "../../../UI/input/Input";
import LogoMore from "../../../UI/svg/logoMore/LogoMore";
import { productTaskData } from "./ProductForm.data";
import { IProductForm } from "./ProductForm.interface";
import s from "./ProductForm.module.scss";

const ProductForm: FC<IProductForm> = (props: IProductForm) => {
  const { content } = productTaskData(props);

  return (
    <div className={s.box}>
      <ul className={s.list}>
        {content.map(item => (
          <li className={s.item} key={content.indexOf(item)}>
            <div className={s.item__title}>
              <span>{item.text}</span>
              <LogoMore text={item.prompt} />
            </div>
            <div className={s.input__box}>
              <Input
                className={s.input}
                max={item.max}
                min={item.min}
                type="number"
                value={item.value}
                onChange={e => item.set(e.target.value)}
              />
              <span className={s.placeholder}>{item.placeholder}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;
