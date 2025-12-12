export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
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
