import { FC } from "react";
import "./exchangeArrow.scss";

interface IExchangeArrow {
  reversed: boolean;
  onClick: React.MouseEventHandler<SVGElement>;
}

const ExchangeArrow: FC<IExchangeArrow> = ({ reversed, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={reversed ? "exchange-arrow" : "exchange-arrow reversed"}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
    >
      <path d="M1 4.9375637v-.375c0-.31066.2518359-.5625.5625-.5625H10v-1.125c0-.50079.607008-.75098.960258-.39776l1.875 1.875c.219656.21968.219656.57584 0 .79549l-1.875 1.875c-.351914.35185-.960258.10515-.960258-.39773v-1.125H1.5625c-.3106641 0-.5625-.25184-.5625-.5625Zm11.4375 3.5625H4v-1.125c0-.49955-.6061406-.75187-.9602578-.39776l-1.875 1.875c-.21965626.21968-.21965626.57584 0 .79549l1.875 1.8750003c.3522187.3522.9602578.1047.9602578-.39773v-1.125h8.4375c.310664 0 .5625-.2518403.5625-.5625003v-.375c0-.31066-.251836-.5625-.5625-.5625z" />
    </svg>
  );
};

export default ExchangeArrow;
