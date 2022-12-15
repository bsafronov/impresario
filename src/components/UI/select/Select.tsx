import { FC, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { ISelect } from "./Select.interface";
import s from "./Select.module.scss";

const Select: FC<ISelect> = ({ options, action, initial }) => {
  const [current, setCurrent] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useAppDispatch();

  function setCurrentOption(value: string) {
    setIsSelect(false);
    dispatch(action(value));
  }
  return (
    <div className={s.box}>
      <h5
        className={isSelect ? [s.title, s.active].join(" ") : s.title}
        onClick={() => setIsSelect(!isSelect)}
      >
        <span>{initial ? initial : "Выбрать"}</span>
        <span
          className={isSelect ? [s.logo, s.logo__reversed].join(" ") : s.logo}
        >
          ▼
        </span>
      </h5>
      {isSelect && (
        <div className={s.box__outer}>
          <div className={s.box__inner}>
            <ul className={s.list}>
              {options.map(item => (
                <li
                  className={
                    item.title.length > 8
                      ? [s.item, s.item__long].join(" ")
                      : s.item
                  }
                  key={options.indexOf(item)}
                  onClick={() => setCurrentOption(item.action)}
                >
                  <span className={s.value}>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
