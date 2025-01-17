export type UserParamsType = {
  pinpp: string;
  doctype: number;
  serialNumber: string;
  password: string;
  login: string;
  roles: [string];
  facilityId: number;
};

export type UserFilterType = {
  pageNumber: number | string;
  pageSize: number | string;
  uz: string;
  ru: string;
  date: string;
};
