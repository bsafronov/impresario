import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { modalSlice } from "../../../../store/reducers/modal/modalSlice";
import Button from "../../../UI/button/Button";

import ManageCompanyItemBox from "../../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import "./place.scss";

interface IPlace {
  id: number;
}

const Place: FC<IPlace> = ({ id }) => {
  const { t } = useTranslation();
  const { places } = useAppSelector(state => state.placeReducer);
  const { setIsPlaceManager, setIsCompanyManager } = modalSlice.actions;
  const dispatch = useAppDispatch();

  const currentPlaces = places.filter(place => place.companyId === id);

  function openPlaceManager() {
    dispatch(setIsPlaceManager(true));
    dispatch(setIsCompanyManager(false));
  }

  return (
    <ManageCompanyItemBox>
      <div className="place__box">
        <h3 className="place__title">{t("manage-company.places.title")}</h3>
        <ul className="place__list">
          {currentPlaces.map(place => (
            <li className="place__item" key={place.id}>
              <ul>
                <li>
                  <span className="place__property">
                    {t("manage-place.name")}
                  </span>
                  <span className="place__value">{place.name}</span>
                </li>
                <li>
                  <span className="place__property">
                    {t("manage-place.rank")}
                  </span>
                  <span className="place__value">{place.rank}</span>
                </li>
                <li>
                  <span className="place__property">
                    {t("manage-place.area")}
                  </span>
                  <span className="place__value">{place.rank ** 2}</span>
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <Button onClick={openPlaceManager}>
          {t("manage-company.places.add-place")}
        </Button>
      </div>
    </ManageCompanyItemBox>
  );
};

export default Place;
