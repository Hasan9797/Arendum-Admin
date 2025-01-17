export type DriversFilterType = {
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

export type DriversParamsType = {
  facilityNameRU: string;
  facilityNameUZ: string;
  regionId: string;
};
export type UploadImgType = {
  img: FormData;
};
