export type CategoryKioskFilterType = {
  limit: number | string;
  sort: {
      column: string;
      value: string;
  };
  filters: [
      {
          column: string;
          value: string;
          operator: string;
      }
  ]
}

export type CategoryKioskParamsType = {
  name: string;
  order: string;
  status: string | number;
  logo: File;
}
