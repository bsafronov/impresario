export interface IGenItem {
  item: IGenItemProps;
}

export interface IGenItemProps {
  title: string;
  value: number;
  desc: string | string[];
  isByPeriod: boolean;
}
