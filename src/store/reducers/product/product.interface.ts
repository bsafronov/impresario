export interface IProducts {
  totalCreated: number,
  products: IProduct[]
}

export interface IProduct {
  id: number,
  companyId: number,
  placeId: number,
  name: string,
  status: IProductStatus,
  pending: number,
  area: number,
}

export interface IProductCreateNew {
  companyId: number,
  name: string,
  placeId: number,
  area: number
}

export interface IProductModifyAmount {
  productId: number,
  amount: number
}

export interface IProductSetStatus {
  id: number,
  status: IProductStatus
}
export type IProductStatus = 'in progress' | 'await' | 'fulfilled';

