export type StructureFilterType = {
  page: number | string;
  limit: number | string;
  sortUz: string;
  sortRu: string;
  filter: [
    {
      column: string;
      value: string;
      operator: string;
    },
  ];
};
export type ClientParamsType = {
  status: boolean;
};
