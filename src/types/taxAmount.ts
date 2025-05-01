export type TaxAmountFilterType = {
  pageNumber: number | string;
  pageSize: number | string;
  arendumPercentage?: boolean;
  driverBalance?: string;
  ndsAmount?: string;
  ndsPercentage?: boolean;
  serviceAmount?: string;
};

export type TaxAmountFilterTypeParamsType = {
  serviceName: string;
};
