import { useMemo } from "react";
import { shortBalance } from "../../../../functions/representation";
import { useAppSelector } from "../../../../hooks/redux";
import s from "./News.module.scss";

const News = () => {
  const { news } = useAppSelector(state => state.newsReducer);
  const { companies } = useAppSelector(state => state.companyReducer);
  const { products } = useAppSelector(state => state.productReducer);
  const { gameDay, statisticBy } = useAppSelector(state => state.rulesReducer);

  function getName(companyId: number, productId: number) {
    const companyName = companies.find(company => company.id === companyId)
      ?.name as string;
    const productName = products.find(product => product.id === productId)
      ?.name as string;

    return [companyName, productName].join("/");
  }

  const newsByPeriod = useMemo(
    () => news.filter(item => gameDay - item.gameDay < statisticBy),
    [gameDay, statisticBy, news]
  );

  if (companies.length === 0) return null;
  return (
    <div className={s.box}>
      <h3 className={s.title}>Новости</h3>
      <div className={s.content}>
        <ul className={s.list}>
          {newsByPeriod.map(el => (
            <li key={el.id} className={s.item}>
              <h5 className={s.item__title}>
                <span>{getName(el.companyId, el.productId)}</span>
                <span>День {el.gameDay}</span>
              </h5>
              <p className={s.item__text}>
                <span>Производство завершено.</span>
                <span>Реализовано: {el.percent}%</span>
                <span>
                  Прибыль:{" "}
                  <span className={el.income > 0 ? s.green : s.red}>
                    $ {shortBalance(el.income)}
                  </span>
                </span>
                <span>Реклама: +{el.adLvlUp}</span>
              </p>
            </li>
          ))}
          {news.length === 0 && <p>Милорд, известий нет</p>}
        </ul>
      </div>
    </div>
  );
};

export default News;
