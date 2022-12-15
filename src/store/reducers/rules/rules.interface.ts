export interface IRules {
  inflation: number;
  gameDay: number;
  createdAt: number;
  statisticBy: IRulesStatisticBy;
}

export interface IRulesInflation {
  createdAt: number;
  dynamicPerYear: number;
}

export type IRulesStatisticBy =
  | "week"
  | "month"
  | "six months"
  | "year"
  | "all time";
