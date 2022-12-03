import { FC } from "react";

interface IInnerBox {
  children: any;
}
const InnerBox: FC<IInnerBox> = props => {
  return <div>{props.children}</div>;
};

export default InnerBox;
