import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { IPlaceAllocate } from "../../../store/reducers/place/place.interface";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import { IProductCreateNew } from "../../../store/reducers/product/product.interface";
import { productSlice } from "../../../store/reducers/product/productSlice";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Modal from "../../UI/modal/Modal";
import SvgTriangle from "../../UI/svg/triangle/SvgTriangle";
import "./createProduct.scss";

interface IPlace {
  id: number | null;
  freeUnits: number | null;
  name: string | null;
}

const CreateProduct = () => {
  const { t } = useTranslation();
  const { setIsCompanyManager, setIsCreateProduct } = modalSlice.actions;
  const { createProduct } = productSlice.actions;
  const { giveSpaceToProduct } = placeSlice.actions;

  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  const { places } = useAppSelector(state => state.placeReducer);

  const [name, setName] = useState<string>("");
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [choosenPlace, setChoosenPlace] = useState<IPlace>();
  const [productArea, setProductArea] = useState<number>(0);
  const dispatch = useAppDispatch();

  const freePlaces = places.filter(
    place => place.freeSpace > 0 && place.companyId === managingCompanyId
  );

  function createNewProduct() {
    const data: IProductCreateNew = {
      name,
      companyId: managingCompanyId as number,
      placeId: choosenPlace?.id as number,
      area: productArea,
    };

    const placeData: IPlaceAllocate = {
      placeId: choosenPlace?.id as number,
      space: productArea,
    };

    dispatch(createProduct(data));
    dispatch(giveSpaceToProduct(placeData));
    closeModal();
  }

  function choosePlace(id: number, units: number, name: string) {
    const placeData: IPlace = {
      id,
      freeUnits: units,
      name,
    };
    setChoosenPlace(placeData);
    setIsSelect(false);
  }

  function isValidated() {
    return name !== "" && productArea > 0;
  }

  function closeModal() {
    dispatch(setIsCreateProduct(false));
    dispatch(setIsCompanyManager(true));
  }

  return (
    <Modal closeFunc={closeModal} closeButton>
      <div className="create-product__box">
        <p>
          <span>{t("create-product.name")}</span>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
        </p>
        <div className="create-product__select-box">
          <span>{t("create-product.place")}</span>
          {freePlaces.length > 0 ? (
            <div className="create-product__select">
              <div
                className={
                  isSelect
                    ? "create-product__select-title active"
                    : "create-product__select-title"
                }
                onClick={() => setIsSelect(!isSelect)}
              >
                <span>
                  {choosenPlace
                    ? choosenPlace.name
                    : t("create-product.select-desc")}
                </span>
                <span className="create-product__select-svg">
                  <SvgTriangle />
                </span>
              </div>
              <ul
                className={
                  isSelect
                    ? "create-product__options active"
                    : "create-product__options"
                }
              >
                {freePlaces.map(place => (
                  <li
                    className="create-product__options-item"
                    key={place.id}
                    onClick={() =>
                      choosePlace(place.id, place.freeSpace, place.name)
                    }
                  >
                    {place.name}
                    <span className="create-product__options-desc">
                      ({place.freeSpace} {t("create-product.select-area")})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span>{t("create-product.desc-null")}</span>
          )}
        </div>
        {choosenPlace && (
          <p className="create-product__area">
            <span>{t("create-product.area")}</span>
            <input
              className="input"
              type="range"
              min={0}
              max={(choosenPlace && choosenPlace.freeUnits) || 1}
              value={productArea}
              onChange={e => setProductArea(+e.target.value)}
            />
            <span>{productArea}</span>
          </p>
        )}
        <Button onClick={createNewProduct} disabled={!isValidated()}>
          {t("create-product.create")}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateProduct;
