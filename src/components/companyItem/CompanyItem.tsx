import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../functions/representation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalSlice } from "../../store/reducers/modal/modalSlice";
import Button from "../UI/button/Button";
import CircleDiagram from "../UI/svg/circleDiagram/CircleDiagram";
import { ICompanyItem } from "./CompanyItem.interface";
import s from "./CompanyItem.module.scss";

const CompanyItem: FC<ICompanyItem> = ({ company, operations }) => {
  const { t } = useTranslation();
  const { companies, freeMoney } = useAppSelector(
    state => state.companyReducer
  );
  const { tasks } = useAppSelector(state => state.tasksReducer);
  const { setManagingCompanyId, setIsCompanyManager } = modalSlice.actions;
  const { shortBalance, daysByString } = useRepresentation();
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
    () =>
      tasks.filter(
        task => task.companyId === company.id && task.type === "active"
      ).length,
    [tasks]
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
      <div className={s.content}>
        <h4 className={s.title}>{company.name}</h4>
        <ul className={s.general}>
          <li>
            <span className={s.desc}>{t("stats.balance")}: </span>
            <span>${shortBalance(company.balance)}</span>
          </li>
          <li>
            <span className={s.desc}>{t("stats.active_tasks")}: </span>
            <span>{activeTasksCount}</span>
          </li>
          <li className={s.bytime}>
            <h5 className={s.bytime__title}>{daysByString()}</h5>
            <ul className={s.bytime__list}>
              <li>
                <span className={s.desc}>{t("stats.income")}: </span>
                <span>${incomeSum}</span>
              </li>
              <li>
                <span className={s.desc}>{t("stats.costs")}: </span>
                <span>${costsSum}</span>
              </li>
              <li>
                <span className={s.desc}>{t("stats.profit")}: </span>
                <span
                  className={
                    incomeSum - costsSum > 0
                      ? s.green
                      : incomeSum - costsSum < 0 && s.red
                  }
                >
                  $ {incomeSum - costsSum}
                </span>
              </li>
            </ul>
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
          {t("button.manage")}
        </Button>
      </div>
    </li>
  );
};

export default CompanyItem;
