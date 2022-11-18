import { useTranslation } from "react-i18next";
import { shortBalance } from "../../../../functions/representation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { modalSlice } from "../../../../store/reducers/modal/modalSlice";
import Button from "../../../UI/button/Button";
import CircleDiagram from "../../../UI/svg/circleDiagram/CircleDiagram";
import s from "./CompanyList.module.scss";

const CompanyList = () => {
  const { t } = useTranslation();
  const { companies, freeMoney } = useAppSelector(
    state => state.companyReducer
  );
  const { setManagingCompanyId, setIsCompanyManager } = modalSlice.actions;
  const dispatch = useAppDispatch();

  function calculateCompanyBalanceByAll(companyBalance: number) {
    const allBalance =
      companies.reduce((sum, company) => (sum += company.balance), 0) +
      freeMoney;
    return (companyBalance / allBalance) * 100;
  }

  function openCompanyManager(id: number) {
    dispatch(setManagingCompanyId(id));
    dispatch(setIsCompanyManager(true));
  }

  return (
    <div className={s.list}>
      {companies.map(company => (
        <div className={s.item} key={company.id}>
          <div>
            <h4 className={s.title}>{company.name}</h4>
            <div className={s.general}>
              <p>
                <span className={s.desc}>{t("company.balance")}</span>
                <span>${shortBalance(company.balance)}</span>
              </p>
              <p>
                <span className={s.desc}>{t("company.income")}</span>
                <span>$0</span>
              </p>
              <p>
                <span className={s.desc}>{t("company.costs")}</span>
                <span>$0</span>
              </p>
              <p>
                <span className={s.desc}>{t("company.workers")}</span>
                <span>0</span>
              </p>
            </div>
          </div>
          <div className={s.right}>
            <CircleDiagram
              data={[
                {
                  percent: calculateCompanyBalanceByAll(company.balance),
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
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
