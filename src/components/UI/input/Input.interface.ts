export interface IInput {
  className?: string,
  type?: IInputType,
  min?: number,
  max?: number,
  value: number | string,
  onChange: (e: any) => void,
  placeholder?: string
}

export type IInputType = 'text' | 'range' | 'number'