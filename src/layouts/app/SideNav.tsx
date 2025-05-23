import React, { useEffect, useRef, useState } from "react";
import {
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  SiderProps,
} from "antd";
import {
  FileTextOutlined,
  HomeOutlined,
  SlidersOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { PATH_DASHBOARD } from "../../constants";
import { COLOR } from "../../App.tsx";
import { Logo } from "../../components/index.ts";
import useAuth from "../../hooks/auth/useAuth.jsx";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const SideNav = ({ ...others }: SiderProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");
  const { getMe, user } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  const ROLE = {
    is_admin: user && user?.role === 1,
    is_super_admin: user && user?.role === 1,
    is_finansist: user && user?.role === 9,
    is_moderator: user && user?.role === 7,
    is_accauntant: user && user?.role === 3,
    is_operator: user && user?.role === 8,
  };

  const items: MenuProps["items"] = [
    getItem("Основные данные", "main", null, [], "group"),
    getItem(
      <Link to={PATH_DASHBOARD.default}>Главная</Link>,
      "default",
      <HomeOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.analitika}>Аналитика</Link>,
      "analitika",
      <SlidersOutlined />
    ),
    getItem(
      "Финансы",
      "finances",
      null,
      [
        getItem(
          <Link to={PATH_DASHBOARD.user_balance}>Балансы пользователей</Link>,
          "user_balance",
          <FileTextOutlined />
        ),
        getItem(
          <Link to={PATH_DASHBOARD.deposit}>Депозиты</Link>,
          "deposit",
          <FileTextOutlined />
        ),
      ],
      "group"
    ),
    getItem(
      "Управление",
      "management",
      null,
      [
        getItem(
          <Link to={PATH_DASHBOARD.orders}>Заказы</Link>,
          "orders",
          <SlidersOutlined />
        ),
        getItem(
          <Link to={PATH_DASHBOARD.clients}>Пользователи</Link>,
          "clients",
          <UserOutlined />
        ),
        getItem(
          <Link to={PATH_DASHBOARD.drivers}>Водители</Link>,
          "drivers",
          <SlidersOutlined />
        ),
        getItem(
          <Link to={PATH_DASHBOARD.merchants}>Мерчанты</Link>,
          "merchants",
          <UnorderedListOutlined />
        ),
        getItem(
          <Link to={PATH_DASHBOARD.user_reviews}>Оценки пользователей </Link>,
          "user_reviews",
          <FileTextOutlined />
        ),
      ],
      "group"
    ),

    getItem(
      "Справочники",
      "manuals",
      null,
      [
        // (ROLE.is_accauntant && ROLE.is_moderator) &&
          getItem(
            <Link to={PATH_DASHBOARD.work_regions}>Регионы</Link>,
            "work_regions",
            <FileTextOutlined />
          ),
        // (ROLE.is_accauntant || ROLE.is_moderator) &&
          getItem(
            <Link to={PATH_DASHBOARD.work_districts}>Районы</Link>,
            "work_districts",
            <FileTextOutlined />
          ),
        // (ROLE.is_accauntant || ROLE.is_moderator) &&
          getItem(
            <Link to={PATH_DASHBOARD.categories_of_equipment}>
              Категории техники
            </Link>,
            "categories_of_equipment",
            <FileTextOutlined />
          ),
        // (ROLE.is_accauntant || ROLE.is_moderator) &&
          getItem(
            <Link to={PATH_DASHBOARD.specifications}>Параметры техники</Link>,
            "specifications",
            <FileTextOutlined />
          ),
        getItem(
          <Link to={PATH_DASHBOARD.pricing}>Ценообразование</Link>,
          "pricing",
          <FileTextOutlined />
        ),
        // (ROLE.is_accauntant || ROLE.is_moderator) &&
          getItem(
            <Link to={PATH_DASHBOARD.params_filter}>Фильтр параметров</Link>,
            "params_filter",
            <FileTextOutlined />
          ),
        // (ROLE.is_accauntant || ROLE.is_moderator) &&
          getItem("Роли", "role", null, [], "group"),
        (!ROLE.is_accauntant || !ROLE.is_moderator) &&
          getItem(
            <Link to={PATH_DASHBOARD.moderators}>Модераторы</Link>,
            "moderators",
            <FileTextOutlined />
          ),
      ],
      "group"
    ),
  ];

  const rootSubmenuKeys = ["dashboards"];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Link to={"/dashboards/default"} className="logo-link">
        <Flex gap={"small"} align="center" justify="center">
          {/* <Typography.Title
            level={3}
            type="secondary"
            style={{
              color: "black",
              marginBottom: 0,
              marginTop: "10px",
              padding: `4px 8px`,
            }}
          >
            Arendum
          </Typography.Title> */}
          <Logo
            color="blue"
            asLink
            href={PATH_DASHBOARD.default}
            justify="center"
            gap="small"
            imgSize={{ h: 28, w: 28 }}
            style={{ padding: "1rem 0" }}
          />
        </Flex>
      </Link>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              subMenuItemBg: COLOR && COLOR["50"],
              itemSelectedBg: COLOR && COLOR["100"],
              itemHoverBg: COLOR && COLOR["100"],
              itemSelectedColor: COLOR && COLOR["600"],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: "none", width: 220 }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
