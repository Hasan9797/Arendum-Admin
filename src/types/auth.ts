export type LoginParamsType = {
  login: string;
  password: string;
  // remember: boolean;
};

export type MeType = {
  id: number;
  name: string;
  code: string;
  username: string;
  role: {
    int: number;
    string: string;
  };
  status: {
    int: string;
    string: string;
  };
};
