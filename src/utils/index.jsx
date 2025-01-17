/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DingdingOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
  MediumOutlined,
  RollbackOutlined,
  SafetyCertificateOutlined,
  SketchOutlined,
  StopOutlined,
  SyncOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { message } from "antd";

export const getNameInitials = (fullName) => {
  const fInitial = Array.from(fullName.split(" ")[0])[0],
    lInitial = Array.from(fullName.split(" ")[1])[0];

  return `${fInitial}${lInitial}`;
};

export const colourNameToHex = (color) => {
  const colours = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    "indianred ": "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
  };

  if (typeof colours[color.toLowerCase()] != "undefined")
    return colours[color.toLowerCase()];

  return "#000";
};

export const isColorLight = (color) => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const addFilterDataTree = (setParams, key, value) => {
  setParams((prevParams) => {
    // Agar value bo'sh yoki undefined bo'lsa, keyni paramsdan o'chirib tashlaymiz
    if (!value || (Array.isArray(value) && value.length === 0)) {
      const { [key]: _, ...rest } = prevParams; // Keyni olib tashlash uchun
      return rest;
    }

    // Aks holda, key va value nыi qo'shamiz
    return {
      ...prevParams,
      [key]: Array.isArray(value) ? value.join(",") : value,
    };
  });
};

export const addFilter = (setParams, column, value) => {
  setParams((prevParams) => {
    const newFilters = { ...prevParams };

    // Agar qiymat mavjud bo'lmasa, filterni o'chiradi
    if (typeof value !== "number" && !value) {
      delete newFilters[column];
    } else {
      // Filter qo'shadi yoki mavjudini yangilaydi
      newFilters[column] = value;
    }

    // Faqat yangi filterlar obyektini qaytaradi
    return newFilters;
  });
};

export const addSort = (setParams, column, value) => {
  let switchValue = "";
  switch (value) {
    case "ascend":
      switchValue = "ASC";
      break;
    case "descend":
      switchValue = "DESC";
      break;
    default:
      switchValue = null;
      break;
  }
  setParams((prev) => ({
    ...prev,
    [column]: switchValue,
  }));
};

export const getDateTime = (e, values) => {
  if (e && e?.length === 2) {
    return `${values?.[0]}_${values?.[1]}`;
  }
};

export const generatePassword = (setPassword, form) => {
  const length = 6;
  const charset = "abcdefghijklmnopqrstuvwxyz";
  const password = Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)]
  ).join("");
  setPassword(password);
  form.setFieldValue("password", password);
};

export const generateLogin = (setLogin, form) => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyz";
  const password = Array.from(
    { length },
    () => charset[Math.floor(Math.random() * charset.length)]
  ).join("");
  setLogin(password);
  form.setFieldValue("login", password);
};

export const copyText = (text) => {
  navigator.clipboard.writeText(text);
  message.success({ content: "Копировано" });
};

export const setColorFrom2Status = (int) => {
  let color = "";
  switch (int) {
    case -1:
      color = "error";
      break;
    case 0:
      color = "red";
      break;
    case 1:
      color = "success";
      break;
    case 2:
      color = "success";
      break;
    default:
      color = "geekblue-inverse";
      break;
  }
  return color;
};

export const setColorFrom3Status = (int) => {
  let color = "";
  switch (int) {
    case -1:
      color = "error";
      break;
    case 0:
      color = "blue";
      break;
    case 1:
      color = "blue";
      break;
    case 2:
      color = "success";
      break;
    case 3:
      color = "success";
      break;
    case 4:
      color = "red";
      break;
    case 5:
      color = "orange";
      break;
    case 8:
      color = "red";
      break;
    case 9:
      color = "red";
      break;
    case 10:
      color = "red";
      break;
    default:
      color = "geekblue-inverse";
      break;
  }
  return color;
};
export const setColorFrom4Status = (int) => {
  let color = "";
  switch (int) {
    case -1:
      color = "error";
      break;
    case 0:
      color = "blue";
      break;
    case 1:
      color = "blue";
      break;
    case 2:
      color = "success";
      break;
    case 3:
      color = "red";
      break;
    case 4:
      color = "orange";
      break;
    case 5:
      color = "lime";
      break;
    case 6:
      color = "orange";
      break;
    default:
      color = "geekblue-inverse";
      break;
  }
  return color;
};

export const setIconFrom2Status = (int) => {
  let icon = "";
  switch (int) {
    case -1:
      icon = <CloseCircleOutlined />;
      break;
    case 0:
      icon = <StopOutlined spin />;
      break;
    case 1:
      icon = <CheckCircleOutlined />;
      break;
    case 2:
      icon = <CheckCircleOutlined />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};
export const setIconFrom3Status = (int) => {
  let icon = "";
  switch (int) {
    case -1:
      icon = <CloseCircleOutlined />;
      break;
    case 0:
      icon = <SyncOutlined spin />;
      break;
    case 1:
      icon = <CheckCircleOutlined />;
      break;
    case 2:
      icon = <SyncOutlined spin />;
      break;
    case 3:
      icon = <CheckCircleOutlined />;
      break;
    case 4:
      icon = <CloseCircleOutlined />;
      break;
    case 5:
      icon = <FieldTimeOutlined />;
      break;
    case 8:
      icon = <CloseCircleOutlined />;
      break;
    case 9:
      icon = <DeleteOutlined />;
      break;
    case 10:
      icon = <CheckCircleOutlined spin />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};
export const setIconFrom4Status = (int) => {
  let icon = "";
  switch (int) {
    case -1:
      icon = <CloseCircleOutlined />;
      break;
    case 0:
      icon = <LoadingOutlined />;
      break;
    case 1:
      icon = <LoadingOutlined />;
      break;
    case 2:
      icon = <CheckCircleOutlined />;
      break;
    case 3:
      icon = <CloseCircleOutlined />;
      break;
    case 4:
      icon = <FieldTimeOutlined />;
      break;
    case 5:
      icon = <RollbackOutlined />;
      break;
    case 6:
      icon = <LoadingOutlined />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};

//? Tegma

export const setColorFromRole = (int) => {
  let color = "";
  switch (int) {
    case "super_admin":
      color = "processing";
      break;
    case "admin":
      color = "success";
      break;
    case "user":
      color = "gold";
      break;
    case "accountant":
      color = "purple";
      break;
    case "moderator":
      color = "error";
      break;
    case "operator":
      color = "orange";
      break;
    default:
      color = "geekblue-inverse";
      break;
  }
  return color;
};

export const setIconFromRole = (int) => {
  let icon = "";
  switch (int) {
    case "super_admin":
      icon = <SafetyCertificateOutlined />;
      break;
    case "admin":
      icon = <DingdingOutlined />;
      break;
    case "user":
      icon = <SketchOutlined />;
      break;
    case "accountant":
      icon = <WhatsAppOutlined />;
      break;
    case "moderator":
      icon = <MediumOutlined />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};

export const setIconFromStatus = (int) => {
  let icon = "";
  switch (int) {
    case "active":
      icon = <CheckCircleOutlined />;
      break;
    case "pending":
      icon = <SyncOutlined spin />;
      break;
    case "non_active":
      icon = <StopOutlined />;
      break;
    case "rejected":
      icon = <CloseCircleOutlined />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};

export const setColorFromStatus = (int) => {
  let color = "";
  switch (int) {
    case "2":
      color = "success";
      break;
    case "pending":
      color = "processing";
      break;
    case "non_active":
      color = "purple";
      break;
    case "rejected":
      color = "error";
      break;
    default:
      color = "geekblue-inverse";
      break;
  }
  return color;
};

export const setIconFromApplicaionStatus = (int) => {
  let icon = "";
  switch (int) {
    case "payment_accepted":
      icon = <CheckCircleOutlined />;
      break;
    case "pending":
      icon = <SyncOutlined spin />;
      break;
    case "cancelled":
      icon = <CloseCircleOutlined />;
      break;
    case "new":
      icon = <BellOutlined />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};

export const setColorFromApplicaionStatus = (int) => {
  let color = "";
  switch (int) {
    case "payment_accepted":
      color = "success";
      break;
    case "pending":
      color = "processing";
      break;
    case "cancelled":
      color = "error";
      break;
    case "new":
      color = "warning";
      break;
    default:
      color = "geekblue-inverse";
      break;
  }
  return color;
};
