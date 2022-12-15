import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../functions/representation";
import { useAppSelector } from "../../hooks/redux";
import CompanyItem from "../companyItem/CompanyItem";
import s from "./CompanyList.module.scss";

const CompanyList = () => {
  const { t } = useTranslation();
  const { companies } = useAppSelector(state => state.companyReducer);
  const { statisticBy, gameDay } = useAppSelector(state => state.rulesReducer);
  const { operations } = useAppSelector(state => state.operationReducer);
  const { daysByNumber } = useRepresentation();

  const operationsByDate = useMemo(
    () =>
      operations.filter(
        operation => gameDay - operation.gameDay < daysByNumber()
      ),
    [statisticBy, gameDay, operations]
  );

  return (
    <div className={s.box}>
      <h3 className={s.title}>{t("title.companies")}</h3>
      <div className={s.content}>
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
    </div>
  );
};

export default CompanyList;
