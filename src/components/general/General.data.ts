import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../functions/representation";
import { useAppSelector } from "../../hooks/redux";
import { IGenItemProps } from "../genItem/GenItem.interface";

export const useGeneralItemsData = () => {
  const { t } = useTranslation();
  const { companies, freeMoney } = useAppSelector(
    state => state.companyReducer
  );
  const { statisticBy, gameDay } = useAppSelector(state => state.rulesReducer);
  const { operations } = useAppSelector(state => state.operationReducer);
  const { daysByNumber } = useRepresentation();

  const companiesMoney = useMemo(
    () => companies.reduce((sum, company) => sum + company.balance, 0),
    [companies]
  );

  const allIncome = useMemo(
    () => operations.filter(op => op.type === "income"),
    [operations]
  );

  const allIncomeSum = useMemo(
    () => allIncome.reduce((sum, op) => (sum += op.amount), 0),
    [allIncome, operations]
  );

  const incomeByPeriod = useMemo(
    () =>
      allIncome
        .filter(op => gameDay - op.gameDay < daysByNumber())
        .reduce((sum, op) => (sum += op.amount), 0),
    [gameDay, statisticBy, allIncome]
  );

  const allCosts = useMemo(
    () => operations.filter(op => op.type === "costs"),
    [operations]
  );

  const allCostsSum = useMemo(
    () => allCosts.reduce((sum, op) => (sum += op.amount), 0),
    [allCosts]
  );

  const costsByPeriod = useMemo(
    () =>
      allCosts
        .filter(op => gameDay - op.gameDay < daysByNumber())
        .reduce((sum, op) => (sum += op.amount), 0),
    [gameDay, statisticBy, allCosts]
  );

  const items: IGenItemProps[] = [
    {
      title: t("stats.all"),
      value: companiesMoney + freeMoney,
      desc: ["Сумма на счету компаний", "Свободные деньги"],
      isByPeriod: false,
    },
    {
      title: t("stats.free"),
      value: freeMoney,
      desc: "Только свободные деньги",
      isByPeriod: false,
    },
    {
      title: t("title.companies"),
      value: companiesMoney,
      desc: "Все деньги на счету компаний",
      isByPeriod: false,
    },
    {
      title: t("stats.profit"),
      value: incomeByPeriod - costsByPeriod,
      desc: "Чистая прибыль за всё время",
      isByPeriod: true,
    },
    {
      title: t("stats.income"),
      value: incomeByPeriod,
      desc: "Доход за всё время",
      isByPeriod: true,
    },
    {
      title: t("stats.costs"),
      value: costsByPeriod,
      desc: "Расходы за всё время",
      isByPeriod: true,
    },
  ];

  return { items };
};
