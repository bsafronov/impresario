import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../../functions/representation";
import LogoMore from "../../UI/svg/logoMore/LogoMore";
import { IProductSpecs } from "./ProductSpecs.interface";
import s from "./ProductSpecs.module.scss";

const ProductSpecs: FC<IProductSpecs> = ({ company, product }) => {
  const { shortBalance, fullBalance } = useRepresentation();
  const { t } = useTranslation();
  return (
    <div className={s.box}>
      <h3 className={s.title}>{t("title.product_data")}</h3>
      <ul className={s.list}>
        <li>
          <span className={s.property}>{t("stats.name")}:</span>{" "}
          <span className={s.value}>{product.name}</span>
        </li>
        <li className={s.item}>
          <span className={s.property}>{t("stats.balance")}:</span>{" "}
          <span className={s.value}>${shortBalance(company.balance)}</span>
          <LogoMore text={fullBalance(company.balance)} />
        </li>
        <li>
          <span className={s.property}>{t("stats.area")}:</span>{" "}
          <span className={s.value}>
            {product.area} {t("text.units")}
          </span>
        </li>
        <li>
          <span className={s.property}>{t("stats.ad_level")}: </span>
          <span className={s.value}>{company.adLevel.toFixed(1)}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductSpecs;
