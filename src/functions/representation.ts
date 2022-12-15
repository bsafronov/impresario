import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks/redux";

export function useRepresentation() {
  const { gameDay, statisticBy } = useAppSelector(state => state.rulesReducer);
  const { t } = useTranslation();

  function shortBalance(balance: number) {
    if (balance === 0) return 0;

    if (Math.abs(balance) >= 1000000000) {
      return `${(balance / 1000000000).toFixed(2)}KKK`;
    }
    if (Math.abs(balance) >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}KK`;
    }

    if (Math.abs(balance) >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    }

    return Math.round(balance);
  }

  function fullBalance(balance: number) {
    return `$ ${balance.toLocaleString("en-EN")}`;
  }

  function daysByNumber() {
    switch (statisticBy) {
      case "week":
        return 7;
      case "month":
        return 30;
      case "six months":
        return 180;
      case "year":
        return 365;
      case "all time":
        return gameDay;
    }
  }

  function daysByString() {
    switch (statisticBy) {
      case "week":
        return t("statistic.week");
      case "month":
        return t("statistic.month");
      case "six months":
        return t("statistic.six_months");
      case "year":
        return t("statistic.year");
      case "all time":
        return t("statistic.all_time");
    }
  }

  return { shortBalance, fullBalance, daysByNumber, daysByString };
}
