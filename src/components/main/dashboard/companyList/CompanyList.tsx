import { useMemo } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import CompanyItem from "../companyItem/CompanyItem";
import s from "./CompanyList.module.scss";

const CompanyList = () => {
  const { companies } = useAppSelector(state => state.companyReducer);
  const { statisticBy, gameDay } = useAppSelector(state => state.rulesReducer);
  const { operations } = useAppSelector(state => state.operationReducer);

  const operationsByDate = useMemo(
    () =>
      operations.filter(operation => gameDay - operation.gameDay < statisticBy),
    [statisticBy, gameDay, operations]
  );

  return (
    <div className={s.box}>
      <ul className={s.list}>
        {companies.map(company => (
          <CompanyItem
            key={company.id}
            company={company}
            operations={operationsByDate}
          />
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
