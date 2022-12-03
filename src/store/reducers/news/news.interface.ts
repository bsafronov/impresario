export interface INews {
  totalCreated: number;
  news: INewsItem[];
}

export interface INewsItem extends INewsItemForm {
  id: number;
}

export interface INewsItemForm {
  companyId: number;
  productId: number;
  percent: number;
  income: number;
  adLvlUp: number;
  gameDay: number;
}
