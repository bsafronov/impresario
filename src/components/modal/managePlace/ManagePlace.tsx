import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { IPlaceOccupy } from "../../../store/reducers/place/place.interface";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import Button from "../../UI/button/Button";
import Modal from "../../UI/modal/Modal";
import s from "./ManagePlace.module.scss";

const ManagePlace = () => {
  const { t } = useTranslation();
  const { places } = useAppSelector(state => state.placeReducer);
  const { managingCompanyId } = useAppSelector(state => state.modalReducer);

  const { setIsPlaceManager, setIsCompanyManager, setIsCreatePlace } =
    modalSlice.actions;
  const { occupyPlace } = placeSlice.actions;
  const dispatch = useAppDispatch();

  const [choosenPlace, setChoosenPlace] = useState<number | null>(null);

  const availablePlaces = useMemo(
    () => places.filter(place => !place.companyId),
    [places]
  );

  function setCompanyPlace() {
    const data: IPlaceOccupy = {
      companyId: managingCompanyId as number,
      placeId: choosenPlace as number,
    };
    dispatch(occupyPlace(data));
    closeModal();
  }

  function openCreatePlace() {
    dispatch(setIsCreatePlace(true));
    dispatch(setIsPlaceManager(false));
  }

  function closeModal() {
    dispatch(setIsPlaceManager(false));
    dispatch(setIsCompanyManager(true));
  }

  return (
    <Modal closeFunc={closeModal} closeButton centered>
      <div className={s.box}>
        <h3 className={s.title}>{t("title.free_real_estate")}</h3>
        <ul className={s.list}>
          {availablePlaces.map(place => (
            <li className={s.item} key={place.id}>
              <input
                id={`${place.id}`}
                className={s.radio}
                type="radio"
                name="real-estate"
                checked={place.id === choosenPlace}
                onChange={() => setChoosenPlace(place.id)}
              />
              <label
                className={
                  place.id === choosenPlace
                    ? [s.field, s.active].join(" ")
                    : s.field
                }
                htmlFor={`${place.id}`}
              >
                {place.name}
              </label>
            </li>
          ))}
        </ul>
        {availablePlaces.length === 0 && (
          <p className={s.null}>{t("text.real_estate_null")}</p>
        )}
        <Button onClick={openCreatePlace}>{t("button.buy")}</Button>
        {choosenPlace && (
          <Button type="main-accept" onClick={setCompanyPlace}>
            {t("button.choose")}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ManagePlace;
