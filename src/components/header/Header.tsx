import { useTranslation } from "react-i18next";
import { useProgressDeleter } from "../../hooks/progressDeleter/progressDeleter";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import i18n from "../../i18n";
import { modalSlice } from "../../store/reducers/modal/modalSlice";

import Button from "../UI/button/Button";
import LogoOptions from "../UI/svg/LogoOptions";
import s from "./Header.module.scss";

function Header() {
  const { t } = useTranslation();
  const { isOptionsManager } = useAppSelector(state => state.modalReducer);
  const { setIsOptionsManager } = modalSlice.actions;
  const { deleteAllProgress } = useProgressDeleter();
  const dispatch = useAppDispatch();

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
        <span className={s.status}>{t("text.status")}</span>
      </p>
      <div className={s.options}>
        <span
          className={s.options__title}
          onClick={() => dispatch(setIsOptionsManager(!isOptionsManager))}
        >
          <span>{t("title.options")}</span>
          <LogoOptions />
        </span>
        <div
          className={[s.options__list, isOptionsManager ? null : s.hidden].join(
            " "
          )}
        >
          <p className={s.option}>
            <span>{t("text.language")}: </span>
            <button className={s.language} onClick={changeLanguage}>
              <span>EN</span>
              <span>RU</span>
              <span className={languageStyle}></span>
            </button>
          </p>
          <p className={s.option}>
            <Button onClick={deleteAllProgress} type="remove">
              {t("text.clear_progress")}
            </Button>
          </p>
        </div>
        <div
          className={
            isOptionsManager ? [s.fixed, s.fixed__active].join(" ") : s.fixed
          }
          onClick={() => dispatch(setIsOptionsManager(false))}
        ></div>
      </div>
    </header>
  );
}

export default Header;
