import { FC } from "react";
import LogoMore from "../../../UI/svg/logoMore/LogoMore";
import "./genItem.scss";

interface IGenItem {
  title: string;
  value: number | string;
}

const GenItem: FC<IGenItem> = ({ title, value }) => {
  return (
    <li className="general__item">
      <span className="general__item-title-box">
        <h3 className="general__item-title">{title}</h3>
        <LogoMore />
      </span>
      <p className="general__item-sum">${value}</p>
      {/* <p className="general__item-income-desc">By last month</p>
      <p className="general__item-income increase">
        <span>$2850</span>
        <LogoArrow />
      </p> */}
    </li>
  );
};

export default GenItem;
