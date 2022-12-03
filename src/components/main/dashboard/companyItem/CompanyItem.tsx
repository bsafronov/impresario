import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { shortBalance } from "../../../../functions/representation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { modalSlice } from "../../../../store/reducers/modal/modalSlice";
import Button from "../../../UI/button/Button";
import CircleDiagram from "../../../UI/svg/circleDiagram/CircleDiagram";
import { ICompanyItem } from "./CompanyItem.interface";
import s from "./CompanyItem.module.scss";

const CompanyItem: FC<ICompanyItem> = ({ company, operations }) => {
  const { t } = useTranslation();
  const { companies, freeMoney } = useAppSelector(
    state => state.companyReducer
  );
  const { tasksActive } = useAppSelector(state => state.tasksReducer);
  const { setManagingCompanyId, setIsCompanyManager } = modalSlice.actions;
  const dispatch = useAppDispatch();

  const allBalance = useMemo(
    () =>
      (company.balance /
        (companies.reduce((sum, company) => (sum += company.balance), 0) +
          freeMoney)) *
      100,
    [freeMoney, companies]
  );

  const activeTasksCount = useMemo(
    () => tasksActive.filter(task => task.companyId === company.id).length,
    [tasksActive]
  );

  const operationsByCompany = useMemo(
    () => operations.filter(operation => operation.companyId === company.id),
    [operations]
  );

  const costsSum = useMemo(
    () =>
      operationsByCompany
        .filter(operation => operation.type === "costs")
        .reduce((sum, operation) => sum + operation.amount, 0),
    [operationsByCompany]
  );

  const incomeSum = useMemo(
    () =>
      operationsByCompany
        .filter(operation => operation.type === "income")
        .reduce((sum, operation) => sum + operation.amount, 0),
    [operationsByCompany]
  );

  function openCompanyManager(id: number) {
    dispatch(setManagingCompanyId(id));
    dispatch(setIsCompanyManager(true));
  }

  return (
    <li className={s.item} key={company.id}>
      <div>
        <h4 className={s.title}>{company.name}</h4>
        <ul className={s.general}>
          <li>
            <span className={s.desc}>{t("company.balance")}</span>
            <span>${shortBalance(company.balance)}</span>
          </li>
          <li>
            <span className={s.desc}>{t("company.income")}</span>
            <span>${incomeSum}</span>
          </li>
          <li>
            <span className={s.desc}>{t("company.costs")}</span>
            <span>${costsSum}</span>
          </li>
          <li>
            <span className={s.desc}>Активные задачи: </span>
            <span>{activeTasksCount}</span>
          </li>
        </ul>
      </div>
      <div className={s.right}>
        <CircleDiagram
          data={[
            {
              percent: allBalance,
              id: company.id,
            },
            { percent: 0, id: company.id + 1 },
          ]}
        />
        <Button
          className={s.list__btn}
          onClick={() => openCompanyManager(company.id)}
        >
          {t("company.manage")}
        </Button>
      </div>
    </li>
  );
};

export default CompanyItem;
