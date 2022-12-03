export interface IOperations {
  totalCreated: number;
  operations: IOperation[];
}

export interface IOperationForm {
  gameDay: number;
  companyId: number;
  productId?: number;
  type: OperationTypes;
  amount: number;
}

export interface IOperation extends IOperationForm {
  id: number;
}

export type OperationTypes = "costs" | "income";
