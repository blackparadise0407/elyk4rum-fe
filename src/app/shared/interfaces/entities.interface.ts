export type Comparer<T> = (a: T, b: T) => number;

export type IdSelectorStr<T> = (model: T) => string;
export type IdSelectorNum<T> = (model: T) => number;

export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export interface UpdateStr<T> {
  id: string;
  changes: Partial<T>;
}

export interface UpdateNum<T> {
  id: number;
  changes: Partial<T>;
}

export type Update<T> = UpdateStr<T> | UpdateNum<T>;
