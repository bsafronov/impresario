import { FC } from "react";
import { useSetupProduction } from "../../../../hooks/setupProduction/_index";
import Button from "../../../UI/button/Button";
import Preloader from "../../../UI/preloader/Preloader";
import LogoMore from "../../../UI/svg/logoMore/LogoMore";
import { productProgressData } from "./ProductProgress.data";
import { IProductProgress } from "./ProductProgress.interface";
import s from "./ProductProgress.module.scss";

const ProductProgress: FC<IProductProgress> = ({
  calc,
  isLoader,
  costs,
  salary,
}) => {
  const { content, income } = productProgressData(calc);
  const { createNewTask } = useSetupProduction(calc, costs, salary);

  return (
    <div className={s.progress}>
      <Preloader isLoader={isLoader}>
        <ul className={s.list}>
          {content.map(item => (
            <li key={content.indexOf(item)}>
              <span className={s.property}>
                <span>{item.property}</span>
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
            <li key={income.indexOf(item)}>
              <span className={s.property}>
                <span>{item.property}</span>
                <LogoMore text={item.prompt} />
              </span>

              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </Preloader>
      <Preloader isLoader={isLoader}>
        <Button onClick={createNewTask}>Запустить</Button>
      </Preloader>
    </div>
  );
};

export default ProductProgress;
