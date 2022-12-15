import { useTranslation } from "react-i18next";
import { ISelectOption } from "../UI/select/Select.interface";

export const useToolbarData = () => {
  const { t } = useTranslation();

  const data: ISelectOption[] = [
    {
      title: t("statistic.week"),
      action: "week",
    },
    {
      title: t("statistic.month"),
      action: "month",
    },
    {
      title: t("statistic.six_months"),
      action: "six months",
    },
    {
      title: t("statistic.year"),
      action: "year",
    },
    {
      title: t("statistic.all_time"),
      action: "all time",
    },
  ];

  return data;
};
