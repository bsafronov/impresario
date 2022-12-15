import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../../functions/representation";
import { useCurrentCompany } from "../../../hooks/findCurrent/findCurrent";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ICompanyMoney } from "../../../store/reducers/company/company.interface";
import { companySlice } from "../../../store/reducers/company/companySlice";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { IPlaceCreateNew } from "../../../store/reducers/place/place.interface";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Modal from "../../UI/modal/Modal";
import s from "./CreatePlace.module.scss";

const CreatePlace = () => {
  const { t } = useTranslation();
  const { setIsCreatePlace, setIsPlaceManager } = modalSlice.actions;
  const { addPlace } = placeSlice.actions;
  const { moneyFromAll, moneyFromCompany } = companySlice.actions;
  const { shortBalance } = useRepresentation();

  const { freeMoney } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [rank, setRank] = useState<number>(0);
  const [isFromCompany, setIsFromCompany] = useState<boolean>(true);

  const currentCompany = useCurrentCompany();

  const balance = isFromCompany ? currentCompany.balance : freeMoney;
  const price = rank ** 3 * 3000;

  function submitCreatePlace() {
    const data: IPlaceCreateNew = {
      name,
      rank,
    };
    const moneyData: ICompanyMoney = {
      amount: price,
      companyId: currentCompany.id,
    };

    dispatch(addPlace(data));
    isFromCompany
      ? dispatch(moneyFromCompany(moneyData))
      : dispatch(moneyFromAll(moneyData));

    closeModal();
  }

  function isValidated() {
    return name !== "" && rank !== 0;
  }

  function changeOption(isTrue: boolean) {
    setIsFromCompany(isTrue);
    setRank(0);
  }

  function closeModal() {
    dispatch(setIsCreatePlace(false));
    dispatch(setIsPlaceManager(true));
  }

  return (
    <Modal closeFunc={closeModal} closeButton centered>
      <div className={s.box}>
        <h3 className={s.title}>{t("title.buy_real_estate")}</h3>
        <div className={s.select__box}>
          <p className={s.label}>{t("text.from_where")}</p>
          <p className={s.select}>
            <button
              className={isFromCompany ? s.option__active : s.option}
              onClick={() => changeOption(true)}
            >
              {t("stats.company")}
            </button>
            <button
              className={!isFromCompany ? s.option__active : s.option}
              onClick={() => changeOption(false)}
            >
              {t("stats.free")}
            </button>
          </p>
          <p className={s.balance}>
            <span className={s.label}>{t("stats.balance")}: </span>
            <span className={s.value}>
              ${shortBalance(balance)}
              <span className={s.costs}>{rank > 0 && ` -${price}$`}</span>
            </span>
          </p>
        </div>
        <ul className={s.form}>
          <li className={s.item}>
            <span className={s.label}>{t("stats.name")}:</span>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </li>
          <li className={s.item}>
            <span className={s.label}>{t("stats.rank")}: </span>
            <Input
              type="range"
              min={0}
              max={Math.floor(Math.pow(balance / 3000, 1 / 3))}
              value={rank}
              onChange={e => setRank(+e.target.value)}
            />
            <span>{rank}</span>
          </li>
        </ul>
        {isValidated() && (
          <Button onClick={submitCreatePlace}>{t("button.buy")}</Button>
        )}
      </div>
    </Modal>
  );
};

export default CreatePlace;
