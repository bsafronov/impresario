import { useTranslation } from "react-i18next";
import LogoOptions from "../UI/svg/LogoOptions";
import s from "./Header.module.scss";

function Header() {
  const { t } = useTranslation();
  return (
    <header className={s.header}>
      <p className={s.title}>
        <span className={s.logo}>
          IMPRE<span className={s.logo_s}>$</span>ARIO
        </span>
        <span className={s.status}>В разработке</span>
      </p>
      {/* <ul className="header__nav">
        <li className="header__item">Dashboard</li>
        <li className="header__item">Statistic</li>
      </ul> */}
      <span className={s.options}>
        <span>{t("header.options")}</span>
        <LogoOptions />
      </span>
    </header>
  );
}

export default Header;
