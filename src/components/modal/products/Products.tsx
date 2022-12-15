import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import Button from "../../UI/button/Button";
import ManageCompanyItemBox from "../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import s from "./Products.module.scss";

interface IProducts {
  id: number;
}

const Products: FC<IProducts> = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.productReducer);
  const {
    setIsCreateProduct,
    setIsCompanyManager,
    setIsProductManager,
    setManagingProductId,
  } = modalSlice.actions;

  const currentProducts = products.filter(product => product.companyId === id);
  function openModalCreateProduct() {
    dispatch(setIsCreateProduct(true));
    dispatch(setIsCompanyManager(false));
  }

  function openModalUpdateProduct(id: number) {
    dispatch(setIsProductManager(true));
    dispatch(setIsCompanyManager(false));
    dispatch(setManagingProductId(id));
  }

  return (
    <ManageCompanyItemBox>
      <div className={s.box}>
        <div className={s.content}>
          <h3 className={s.title}>{t("title.products")}</h3>
          {currentProducts.length > 0 ? (
            <div className={s.list__box}>
              {currentProducts.map(product => (
                <ul
                  className={s.item__box}
                  key={product.id}
                  onClick={() => openModalUpdateProduct(product.id)}
                >
                  <li className={s.item__line}>
                    <span className={s.item__property}>
                      {t("stats.name")}:{" "}
                    </span>
                    <span className={s.item__value}>{product.name}</span>
                  </li>
                </ul>
              ))}
            </div>
          ) : (
            <p className={s.null}>{t("text.null")}</p>
          )}
        </div>
        <Button onClick={openModalCreateProduct}>{t("button.create")}</Button>
      </div>
    </ManageCompanyItemBox>
  );
};

export default Products;
