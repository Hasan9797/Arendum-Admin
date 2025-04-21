export type UserParamsType = {
  fullName: string;
  phone: string;
  role: number;
  login: string;
  password: string;
};

export type UserFilterType = {
  page: number | string;
  limit: number | string;
  uz: string;
  ru: string;
  date: string;
};
