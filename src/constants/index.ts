import {
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_LAYOUT,
  PATH_USER_PROFILE,
} from "./routes.ts";

const DASHBOARD_ITEMS = [
  { title: "Главная", path: PATH_DASHBOARD.default },
  { title: "Аналитика", path: PATH_DASHBOARD.analitika },
  { title: "Заказы", path: PATH_DASHBOARD.orders },
  { title: "Пользователи", path: PATH_DASHBOARD.users },
  { title: "Водители", path: PATH_DASHBOARD.drivers },
  { title: "Мерчанты", path: PATH_DASHBOARD.merchants },
  { title: "Финансы", path: PATH_DASHBOARD.finances },
  { title: "Оценки пользователей", path: PATH_DASHBOARD.user_reviews },
  { title: "Регионы", path: PATH_DASHBOARD.work_regions },
  { title: "Район", path: PATH_DASHBOARD.work_districts },
  { title: "Категории техники", path: PATH_DASHBOARD.categories_of_equipment },
  { title: "Параметры техники", path: PATH_DASHBOARD.specifications },
  { title: "Ценообразование", path: PATH_DASHBOARD.pricing },
  { title: "Управление регионы", path: PATH_DASHBOARD.regional_management },
  { title: "Модераторы", path: PATH_DASHBOARD.moderators },
  { title: "Пользователь ID", path: PATH_DASHBOARD.user_detail },
];

const USER_PROFILE_ITEMS = [
  {
    title: "Заказов",
    label: "merchant-orders",
    path: PATH_USER_PROFILE.orders,
  },
  {
    title: "Техника",
    label: "merchant-equipment",
    path: PATH_USER_PROFILE.equipment,
  },
  {
    title: "Водители",
    label: "merchant-drivers",
    path: PATH_USER_PROFILE.drivers,
  },
  {
    title: "Редактировать мерчанты",
    label: "update-merchant",
    path: PATH_USER_PROFILE.update,
  },
];

const DIRECTORY_ITEMS = [];

const AUTHENTICATION_ITEMS = [{ title: "sign in", path: PATH_AUTH.signin }];

export {
  PATH_LAYOUT,
  PATH_DASHBOARD,
  PATH_AUTH,
  DASHBOARD_ITEMS,
  AUTHENTICATION_ITEMS,
  DIRECTORY_ITEMS,
  USER_PROFILE_ITEMS,
};

export const PricingTypes = [
  {
    name: "Бесплатные минуты ожидания",
    value: "waiting_time",
  },
  {
    name: "Стоимость минуты ожидания",
    value: "waiting_amount",
  },
  {
    name: "Бесплатные минуты ожидания",
    value: "fine_payment",
  },
  {
    name: "Другие",
    value: "another",
  },
];

export const Tranzactions = [
  {
    id: 1,
    driver: "Иванов И.И.",
    amount: 450000,
    payment: "Naqd",
    user: "Davron",
    date: "2022-01-15",
    status: "В обработке",
    type_order: "Экспресс",
    type_of_equipment: "Манипулятор",
    address:
      "63, Лутфи 5-й проезд, Лутфий махалля, Чиланзарский район, Ташкент, 100000, Узбекистан",
    detail_order: [
      { title: "Заказ создан", date: "2022-01-15" },
      { title: "Заказ принят", date: "2022-01-15" },
      { title: "На месте", date: "2022-01-15" },
      { title: "Начал работу", date: "2022-01-15" },
      { title: "ВЫПОЛНЕН" },
    ],
  },
  {
    id: 2,
    driver: "Иванов И.И.",
    amount: 450000,
    payment: "Naqd",
    user: "Davron",
    date: "2022-01-15",
    status: "В обработке",
    type_order: "Экспресс",
    type_of_equipment: "Манипулятор",
    address:
      "63, Лутфи 5-й проезд, Лутфий махалля, Чиланзарский район, Ташкент, 100000, Узбекистан",
    detail_order: [
      { title: "Заказ создан", date: "2022-01-15" },
      { title: "Заказ принят", date: "2022-01-15" },
      { title: "На месте", date: "2022-01-15" },
      { title: "Начал работу", date: "2022-01-15" },
      { title: "ВЫПОЛНЕН" },
    ],
  },
  {
    id: 3,
    driver: "Иванов И.И.",
    amount: 450000,
    payment: "Naqd",
    user: "Davron",
    date: "2022-01-15",
    status: "В обработке",
    type_order: "Экспресс",
    type_of_equipment: "Манипулятор",
    address:
      "63, Лутфи 5-й проезд, Лутфий махалля, Чиланзарский район, Ташкент, 100000, Узбекистан",
    detail_order: [
      { title: "Заказ создан", date: "2022-01-15" },
      { title: "Заказ принят", date: "2022-01-15" },
      { title: "На месте", date: "2022-01-15" },
      { title: "Начал работу", date: "2022-01-15" },
      { title: "ВЫПОЛНЕН" },
    ],
  },
  {
    id: 4,
    driver: "Иванов И.И.",
    amount: 450000,
    payment: "Naqd",
    type_order: "Экспресс",
    type_of_equipment: "Манипулятор",
    user: "Davron",
    date: "2022-01-15",
    status: "В обработке",
    address:
      "63, Лутфи 5-й проезд, Лутфий махалля, Чиланзарский район, Ташкент, 100000, Узбекистан",
    detail_order: [
      { title: "Заказ создан", date: "2022-01-15" },
      { title: "Заказ принят", date: "2022-01-15" },
      { title: "На месте", date: "2022-01-15" },
      { title: "Начал работу", date: "2022-01-15" },
      { title: "ВЫПОЛНЕН" },
    ],
  },
];

export const Statuses = [
  {
    id: 1,
    title: "В обработке",
  },
  {
    id: 2,
    title: "Отправлено в работу",
  },
  {
    id: 3,
    title: "Выполнено",
  },
];

export const dailyStatistics = [
  {
    name: "Пользователей",
    period: "Today",
    value: 15,
  },
  {
    name: "Водителей",
    period: "Today",
    value: 23,
  },

  {
    name: "Мерчанты",
    period: "Today",
    value: 16,
  },
  {
    name: "Заказов",
    period: "Today",
    value: 56,
  },
];
export const weeklyStatistics = [
  {
    name: "Пользователей",
    period: "Mon",
    value: 18.9,
  },
  {
    name: "Пользователей",
    period: "Tue",
    value: 20,
  },
  {
    name: "Пользователей",
    period: "Wed",
    value: 10.3,
  },
  {
    name: "Пользователей",
    period: "Thur",
    value: 41.4,
  },
  {
    name: "Пользователей",
    period: "Fri",
    value: 17,
  },
  {
    name: "Пользователей",
    period: "Sat",
    value: 25,
  },
  {
    name: "Пользователей",
    period: "Sun",
    value: 14,
  },
  {
    name: "Водителей",
    period: "Mon",
    value: 18,
  },
  {
    name: "Водителей",
    period: "Tue",
    value: 15,
  },
  {
    name: "Водителей",
    period: "Wed",
    value: 9,
  },
  {
    name: "Водителей",
    period: "Thur",
    value: 13,
  },
  {
    name: "Водителей",
    period: "Fri",
    value: 17,
  },
  {
    name: "Водителей",
    period: "Sat",
    value: 10,
  },
  {
    name: "Водителей",
    period: "Sun",
    value: 24,
  },
  {
    name: "Заказов",
    period: "Mon",
    value: 18.9,
  },
  {
    name: "Заказов",
    period: "Tue",
    value: 21,
  },
  {
    name: "Заказов",
    period: "Wed",
    value: 31,
  },
  {
    name: "Заказов",
    period: "Thur",
    value: 51,
  },
  {
    name: "Заказов",
    period: "Fri",
    value: 47,
  },
  {
    name: "Заказов",
    period: "Sat",
    value: 23,
  },
  {
    name: "Заказов",
    period: "Sun",
    value: 4,
  },
  {
    name: "Мерчанты",
    period: "Mon",
    value: 8,
  },
  {
    name: "Мерчанты",
    period: "Tue",
    value: 2,
  },
  {
    name: "Мерчанты",
    period: "Wed",
    value: 4,
  },
  {
    name: "Мерчанты",
    period: "Thur",
    value: 29,
  },
  {
    name: "Мерчанты",
    period: "Fri",
    value: 17,
  },
  {
    name: "Мерчанты",
    period: "Sat",
    value: 20,
  },
  {
    name: "Мерчанты",
    period: "Sun",
    value: 24,
  },
];
export const monthlyStatistics = [
  {
    name: "Пользователей",
    period: "1",
    value: 18.9,
  },
  {
    name: "Пользователей",
    period: "2",
    value: 20,
  },
  {
    name: "Пользователей",
    period: "3",
    value: 10.3,
  },
  {
    name: "Пользователей",
    period: "4",
    value: 41.4,
  },
  {
    name: "Пользователей",
    period: "5",
    value: 17,
  },
  {
    name: "Пользователей",
    period: "6",
    value: 25,
  },
  {
    name: "Пользователей",
    period: "7",
    value: 14,
  },
  {
    name: "Пользователей",
    period: "8",
    value: 22,
  },
  {
    name: "Пользователей",
    period: "9",
    value: 18,
  },
  {
    name: "Пользователей",
    period: "10",
    value: 34,
  },
  {
    name: "Водителей",
    period: "1",
    value: 18.9,
  },
  {
    name: "Водителей",
    period: "2",
    value: 20,
  },
  {
    name: "Водителей",
    period: "3",
    value: 10.3,
  },
  {
    name: "Водителей",
    period: "4",
    value: 41.4,
  },
  {
    name: "Водителей",
    period: "5",
    value: 17,
  },
  {
    name: "Водителей",
    period: "6",
    value: 25,
  },
  {
    name: "Водителей",
    period: "7",
    value: 14,
  },
  {
    name: "Водителей",
    period: "8",
    value: 22,
  },
  {
    name: "Водителей",
    period: "9",
    value: 18,
  },
  {
    name: "Водителей",
    period: "10",
    value: 34,
  },
  {
    name: "Заказов",
    period: "1",
    value: 18.9,
  },
  {
    name: "Заказов",
    period: "2",
    value: 20,
  },
  {
    name: "Заказов",
    period: "3",
    value: 10.3,
  },
  {
    name: "Заказов",
    period: "4",
    value: 41.4,
  },
  {
    name: "Заказов",
    period: "5",
    value: 17,
  },
  {
    name: "Заказов",
    period: "6",
    value: 25,
  },
  {
    name: "Заказов",
    period: "7",
    value: 14,
  },
  {
    name: "Заказов",
    period: "8",
    value: 22,
  },
  {
    name: "Заказов",
    period: "9",
    value: 18,
  },
  {
    name: "Заказов",
    period: "10",
    value: 34,
  },
  {
    name: "Мерчанты",
    period: "1",
    value: 18.9,
  },
  {
    name: "Мерчанты",
    period: "2",
    value: 20,
  },
  {
    name: "Мерчанты",
    period: "3",
    value: 10.3,
  },
  {
    name: "Мерчанты",
    period: "4",
    value: 41.4,
  },
  {
    name: "Мерчанты",
    period: "5",
    value: 17,
  },
  {
    name: "Мерчанты",
    period: "6",
    value: 25,
  },
  {
    name: "Мерчанты",
    period: "7",
    value: 14,
  },
  {
    name: "Мерчанты",
    period: "8",
    value: 22,
  },
  {
    name: "Мерчанты",
    period: "9",
    value: 18,
  },
  {
    name: "Мерчанты",
    period: "10",
    value: 34,
  },
];

export const MerchantsData = [
  {
    id: 1,
    merchant: "Arendum Stroytech",
    tel: "+998991231212",
    name: "Kamol Kamilov",
    status: "Активниы",
    amount_equipment: 12,
  },
];

export const regions = [
  {
    id: 1,
    name: "Toshkent",
  },
  {
    id: 2,
    name: "Samarqand",
  },
  {
    id: 3,
    name: "Andijon",
  },
  {
    id: 4,
    name: "Buxoro",
  },
  {
    id: 5,
    name: "Farg‘ona",
  },
  {
    id: 6,
    name: "Qashqadaryo",
  },
  {
    id: 7,
    name: "Surxondaryo",
  },
  {
    id: 8,
    name: "Navoiy",
  },
  {
    id: 9,
    name: "Qoraqalpog‘iston",
  },
  {
    id: 10,
    name: "Xorazm",
  },
];

export const users = [
  {
    id: 101,
    fullName: "Alisher Karimov",
    phone: "+998901234567",
    email: "alisher.karimov@example.com",
    region: "Toshkent",
    registrationDate: "2024-01-15T10:00:00",
    status: "active",
  },
  {
    id: 102,
    fullName: "Nodira Tursunova",
    phone: "+998901234568",
    email: "nodira.tursunova@example.com",
    region: "Samarqand",
    registrationDate: "2023-12-10T08:30:00",
    status: "blocked",
  },
  {
    id: 103,
    fullName: "Rustam Sobirov",
    phone: "+998901234569",
    email: "rustam.sobirov@example.com",
    region: "Andijon",
    registrationDate: "2024-02-20T14:45:00",
    status: "active",
  },
  {
    id: 104,
    fullName: "Dilshod To‘rayev",
    phone: "+998901234570",
    email: "dilshod.turayev@example.com",
    region: "Buxoro",
    registrationDate: "2024-03-05T11:15:00",
    status: "active",
  },
  {
    id: 105,
    fullName: "Shahnoza Raximova",
    phone: "+998901234571",
    email: "shahnoza.rahimova@example.com",
    region: "Farg‘ona",
    registrationDate: "2023-11-25T09:00:00",
    status: "blocked",
  },
];

export const equipmentTypes = [
  {
    id: 1,
    name: "Кран",
  },
  {
    id: 2,
    name: "Стиральные машины",
  },
  {
    id: 3,
    name: "Отопители",
  },
  {
    id: 4,
    name: "Вытяжки",
  },
];

export const categories = [
  "Экскаватор",
  "Автовышка",
  "Автокран",
  "Автолифт",
  "Манипулятор",
  "Длинномер",
  "Погрузчик",
  "Самосвал",
  "Тонар",
  "Авторейлер",
  "Звакуатор",
  "Водовоз",
  "Автомиксер",
  "Бетонасос стац.",
  "Бетонасос",
  "Погрузчик",
  "автовышка 48",
  "awdwwa",
  "kran",
  "5555555555",
];
