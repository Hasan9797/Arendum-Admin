function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboards";
const ROOTS_PROFILE = "/user-profile";
const ROOTS_DRIVER_PROFILE = "/driver-profile";
const ROOTS_LAYOUT = "/layouts";
const ROOTS_AUTH = "/auth";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, "/default"),
  analitika: path(ROOTS_DASHBOARD, "/analitika"),
  orders: path(ROOTS_DASHBOARD, `/orders`),
  drivers: path(ROOTS_DASHBOARD, `/drivers`),
  merchants: path(ROOTS_DASHBOARD, "/merchants"),
  clients: path(ROOTS_DASHBOARD, "/clients"),
  user_balance: path(ROOTS_DASHBOARD, "/user_balance"),
  deposit: path(ROOTS_DASHBOARD, "/deposit"),
  user_reviews: path(ROOTS_DASHBOARD, "/user_reviews"),
  work_regions: path(ROOTS_DASHBOARD, "/work_regions"),
  work_districts: path(ROOTS_DASHBOARD, "/work_districts"),
  categories_of_equipment: path(ROOTS_DASHBOARD, "/categories_of_equipment"),
  specifications: path(ROOTS_DASHBOARD, "/specifications"),
  pricing: path(ROOTS_DASHBOARD, "/pricing"),
  tax_amount: path(ROOTS_DASHBOARD, "/tax_amount"),
  moderators: path(ROOTS_DASHBOARD, "/moderators"),
  params_filter: path(ROOTS_DASHBOARD, "/params_filter"),
  user_detail: path(ROOTS_DASHBOARD, "/user/:id"),
};

export const PATH_USER_PROFILE = {
  root: ROOTS_PROFILE,
  orders: path(ROOTS_PROFILE, "/merchant-orders"),
  equipment: path(ROOTS_PROFILE, "/merchant-equipment"),
  drivers: path(ROOTS_PROFILE, "/merchant-drivers"),
  update: path(ROOTS_PROFILE, "/update-merchant"),
};
export const PATH_DRIVER_PROFILE = {
  root: ROOTS_DRIVER_PROFILE,
  orders: path(ROOTS_DRIVER_PROFILE, "/driver-orders"),
  depozit: path(ROOTS_DRIVER_PROFILE, "/driver-depozit"),
  tranzaction: path(ROOTS_DRIVER_PROFILE, "/driver-tranzactions"),
  // update: path(ROOTS_DRIVER_PROFILE, "/update-merchant"),
};

export const PATH_LAYOUT = {
  root: ROOTS_LAYOUT,
  sidebar: {
    light: path(ROOTS_LAYOUT, "/sidebar/light"),
    dark: path(ROOTS_LAYOUT, "/sidebar/dark"),
    minimized: path(ROOTS_LAYOUT, "/sidebar/minimized"),
  },
  header: {
    light: path(ROOTS_LAYOUT, "/header/light"),
    dark: path(ROOTS_LAYOUT, "/header/dark"),
    overlay: path(ROOTS_LAYOUT, "/header/overlay"),
  },
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, "/signin"),
};

export const PATH_CHANGELOG = {
  root: "",
};
