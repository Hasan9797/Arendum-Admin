export type AccountFilterType = {
  page: number | string;
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
    },
  ];
};
