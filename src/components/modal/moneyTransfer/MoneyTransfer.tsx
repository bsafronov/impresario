import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../../functions/representation";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  ICompany,
  ICompanyMoney,
} from "../../../store/reducers/company/company.interface";
import { companySlice } from "../../../store/reducers/company/companySlice";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import ManageCompanyItemBox from "../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import ExchangeArrow from "../../UI/svg/exchangeArrow/ExchangeArrow";
import s from "./MoneyTransfer.module.scss";

interface IMoneyTransfer {
  company: ICompany;
}

const MoneyTransfer: FC<IMoneyTransfer> = ({ company }) => {
  const { t } = useTranslation();
  const { moneyFromCompanyToAll, moneyFromAllToCompany } = companySlice.actions;
  const { freeMoney } = useAppSelector(state => state.companyReducer);
  const [isTransferToCompany, setIsTransferToCompany] = useState<boolean>(true);
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const { shortBalance } = useRepresentation();
  const dispatch = useAppDispatch();

  function transferToFrom() {
    const data: ICompanyMoney = {
      amount: +currentBalance,
      companyId: company.id,
    };

    isTransferToCompany
      ? dispatch(moneyFromAllToCompany(data))
      : dispatch(moneyFromCompanyToAll(data));

    setCurrentBalance("");
  }

  function isValidated() {
    if (+currentBalance < 1) return;

    if (isTransferToCompany) {
      return freeMoney >= +currentBalance;
    }

    if (!isTransferToCompany) {
      return company.balance >= +currentBalance;
    }
  }

  return (
    <ManageCompanyItemBox>
      <div className={s.exchange}>
        <ExchangeArrow
          reversed={isTransferToCompany}
          onClick={() => setIsTransferToCompany(!isTransferToCompany)}
        />
        <p className={s.label}>
          {isTransferToCompany ? (
            <>
              <span className={s.property}>{t("stats.free")}: </span>
              <span className={s.value}>${shortBalance(freeMoney)}</span>
            </>
          ) : (
            <>
              <span className={s.property}>{t("stats.company")}: </span>
              <span className={s.value}>${shortBalance(company.balance)}</span>
            </>
          )}
          <br />

          {isTransferToCompany ? (
            <>
              <span className={s.property}>{t("stats.company")}: </span>
              <span className={s.value}>${shortBalance(company.balance)}</span>
            </>
          ) : (
            <>
              <span className={s.property}>{t("stats.free")}: </span>
              <span className={s.value}>${shortBalance(freeMoney)}</span>
            </>
          )}
        </p>
      </div>
      <p className={s.form}>
        <Input
          className={s.input}
          type="number"
          placeholder={
            isTransferToCompany ? t("text.to_company") : t("text.from_company")
          }
          min={0}
          max={isTransferToCompany ? freeMoney : company.balance}
          value={currentBalance}
          onChange={e => setCurrentBalance(e.target.value)}
        />
        <Button
          className={s.accept}
          onClick={() => transferToFrom()}
          disabled={!isValidated()}
        >
          {t("button.transfer")}
        </Button>
      </p>
    </ManageCompanyItemBox>
  );
};

export default MoneyTransfer;
