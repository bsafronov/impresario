export interface IPlaces {
  totalCreated: number,
  places: IPlace[]
}

export interface IPlace {
  id: number,
  companyId: number | null,
  name: string,
  rank: number,
  freeSpace: number
}

export interface IPlaceCreateNew {
  name: string,
  companyId?: number,
  rank: number
}

export interface IPlaceOccupy {
  placeId: number,
  companyId: number
}

export interface IPlaceAllocate {
  placeId: number,
  space: number,
}