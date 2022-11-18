import s from "./News.module.scss";

const News = () => {
  return (
    <div className={s.box}>
      <h3 className={s.title}>Новости</h3>
      <ul className={s.list}>
        <li className={s.item}>
          <h5 className={s.item__title}>Новость 1</h5>
          <p className={s.item__text}>Производство завершено. Прибыль: +25КК</p>
        </li>
      </ul>
    </div>
  );
};

export default News;
