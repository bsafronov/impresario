import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { IProductTasks } from "./ProductTasks.interface";
import s from "./ProductTasks.module.scss";

const ProductTasks: FC<IProductTasks> = ({ tasks }) => {
  const { gameDay } = useAppSelector(state => state.rulesReducer);
  function deleteTask() {}
  return (
    <div className={s.box}>
      <h3 className={s.title}>Активное производство</h3>
      <div className={s.list}>
        {tasks.activeTasks.map(task => (
          <ul key={task.id} className={s.item}>
            <li className={s.line}>
              <span>Статус:</span>
              <span className={s.green}></span>
            </li>
            <li className={s.line}>
              <span>Деньги:</span>
              <span>${task.expectedIncome}</span>
            </li>
            <li className={s.line}>
              <span>Осталось:</span>
              <span>
                <span>
                  {task.productionTime - (gameDay - task.startedAtDay)}
                </span>
                <span> дней</span>
              </span>
            </li>
            <li className={s.line}>
              <span>Реклама:</span>
              <span>+{task.adLvlUp.toFixed(2)}</span>
            </li>
          </ul>
        ))}
        {tasks.pendingTasks.map(task => (
          <ul key={task.id} className={s.item}>
            <li className={s.line}>
              <span>Статус:</span>
              <span className={s.blue}></span>
            </li>
            <li className={s.line}>
              <span>Затраты:</span>
              <span>${task.costs}</span>
            </li>
            <li className={s.line}>
              <span>Реклама:</span>
              <span>+{task.adLvlUp.toFixed(2)}</span>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProductTasks;
