export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

export type Paginated<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};
