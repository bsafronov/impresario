import { FC } from "react";
import "./circleDiagram.scss";

interface ICircleDiagram {
  data: { percent: number; id: number }[];
}

const CircleDiagram: FC<ICircleDiagram> = ({ data }) => {
  return (
    <div className="circle-diagram-box">
      {data.map(number => (
        <div key={number.id} className="circle-diagram-box__item">
          <svg
            viewBox="0 0 100 100"
            style={{ "--percent": number.percent } as React.CSSProperties}
          >
            <circle
              r="45"
              cx="50"
              cy="50"
              fill="transparent"
              strokeLinecap="round"
            />
            <circle
              r="45"
              cx="50"
              cy="50"
              fill="transparent"
              stroke="rgba(0, 0, 0, 0.05)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CircleDiagram;
