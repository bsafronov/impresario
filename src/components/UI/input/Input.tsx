import { FC, useRef } from "react";
import { IInput } from "./Input.interface";
import s from "./Input.module.scss";

const Input: FC<IInput> = props => {
  const ref = useRef<HTMLInputElement>(null);
  const style = props.type ? props.type : "text";
  const allStyles = [s[style], props.className].join(
    props.className ? " " : ""
  );

  function blur() {
    ref.current?.blur();
  }

  return <input {...props} ref={ref} className={allStyles} onWheel={blur} />;
};

export default Input;
