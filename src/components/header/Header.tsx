import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProgressDeleter } from "../../hooks/progressDeleter/progressDeleter";
import i18n from "../../i18n";
import Button from "../UI/button/Button";
import LogoOptions from "../UI/svg/LogoOptions";
import s from "./Header.module.scss";

function Header() {
  const { t } = useTranslation();
  const [isOptions, setIsOptions] = useState(false);
  const { deleteAllProgress } = useProgressDeleter();

  const languageStyle = [
    s.language__bg,
    i18n.language === "ru" ? s.language__ru : null,
  ].join(" ");

  const changeLanguage = () => {
    if (i18n.language === "ru") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ru");
    }
  };

  return (
    <header className={s.header}>
      <p className={s.title}>
        <span className={s.logo}>
          IMPRE<span className={s.logo_s}>$</span>ARIO
        </span>
        <span className={s.status}>В разработке</span>
      </p>
      <div className={s.options}>
        <span
          className={s.options__title}
          onClick={() => setIsOptions(!isOptions)}
        >
          <span>{t("header.options")}</span>
          <LogoOptions />
        </span>
        <div
          className={[s.options__list, isOptions ? null : s.hidden].join(" ")}
        >
          <p className={s.option}>
            <span>Язык: </span>
            <button className={s.language} onClick={changeLanguage}>
              <span>EN</span>
              <span>RU</span>
              <span className={languageStyle}></span>
            </button>
          </p>
          <p className={s.option}>
            <Button onClick={deleteAllProgress} type="remove">
              Стереть прогресс
            </Button>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
