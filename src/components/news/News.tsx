import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRepresentation } from "../../functions/representation";
import { useAppSelector } from "../../hooks/redux";
import s from "./News.module.scss";

const News = () => {
  const { t } = useTranslation();
  const { news } = useAppSelector(state => state.newsReducer);
  const { companies } = useAppSelector(state => state.companyReducer);
  const { products } = useAppSelector(state => state.productReducer);
  const { gameDay, statisticBy } = useAppSelector(state => state.rulesReducer);
  const { daysByNumber, shortBalance } = useRepresentation();

  function getName(companyId: number, productId: number) {
    const companyName = companies.find(company => company.id === companyId)
      ?.name as string;
    const productName = products.find(product => product.id === productId)
      ?.name as string;

    return [companyName, productName].join("/");
  }

  const newsByPeriod = useMemo(
    () => news.filter(item => gameDay - item.gameDay < daysByNumber()),
    [gameDay, statisticBy, news]
  );

  if (companies.length === 0) return null;
  return (
    <div className={s.box}>
      <h3 className={s.title}>{t("title.news")}</h3>
      {newsByPeriod.length > 0 && (
        <div className={s.content}>
          <ul className={s.list}>
            {newsByPeriod.map(el => (
              <li key={el.id} className={s.item}>
                <h5 className={s.item__title}>
                  <span className={s.item__name}>
                    {getName(el.companyId, el.productId)}
                  </span>
                  <span>
                    {t("stats.day")} {el.gameDay}
                  </span>
                </h5>
                <p className={s.item__text}>
                  <span className={s.property_bright}>
                    {t("text.prod_completed")}
                  </span>
                  <span>
                    <span className={s.property}>{t("text.realised")}:</span>{" "}
                    {el.percent}%
                  </span>
                  <span>
                    <span className={s.property}>{t("stats.income")}: </span>
                    <span className={el.income > 0 ? s.green : s.red}>
                      $ {shortBalance(el.income)}
                    </span>
                  </span>
                  <span>
                    <span className={s.property}>{t("stats.ad")}:</span> +
                    {el.adLvlUp}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {news.length > 0 && newsByPeriod.length === 0 && (
        <p className={s.null}>{t("text.news_period")}</p>
      )}
      {news.length === 0 && <p className={s.null}>{t("text.no_news")}</p>}
    </div>
  );
};

export default News;
