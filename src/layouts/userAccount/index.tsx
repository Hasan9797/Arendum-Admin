import {
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Image,
  Row,
  Switch,
  Tabs,
  TabsProps,
  theme,
  // Typography,
} from "antd";
import { Card, RevenueCard } from "../../components";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { MerchantsData, USER_PROFILE_ITEMS } from "../../constants";
import { useStylesContext } from "../../context";

// const { Link } = Typography;

import "./styles.css";
import { useEffect, useState } from "react";
import { CallIcon, UserIcon, WorkIcon } from "../../assets/icons";

export const UserAccountLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  const navigate = useNavigate();
  const stylesContext = useStylesContext();
  const { id } = useParams();
  const location = useLocation();

  const detail = MerchantsData.find((item) => item?.id.toString() === id);

  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "merchant",
      labelStyle: {
        display: "flex",
        alignItems: "center",
      },
      contentStyle: {
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      },
      label: (
        <div className="label-content">
          <span className="merchant__profile">
            <WorkIcon />
          </span>
          <span>НАИМЕНОВАНИЕ</span>
        </div>
      ),
      children: <span>{detail.merchant.toLocaleUpperCase()}</span>,
    },
    {
      key: "name",
      label: (
        <div className="label-content">
          <span className="merchant__profile">
            <UserIcon />
          </span>
          <span style={{ textTransform: "uppercase" }}>Руководитель</span>
        </div>
      ),
      labelStyle: {
        display: "flex",
        alignItems: "center",
      },
      contentStyle: {
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      },
      children: (
        <span style={{ fontWeight: "bold" }}>
          {detail?.name.toLocaleUpperCase()}
        </span>
      ),
    },
    {
      key: "tel",
      labelStyle: {
        display: "flex",
        alignItems: "center",
      },
      contentStyle: {
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      },
      label: (
        <div className="label-content">
          <span className="merchant__profile">
            <CallIcon />
          </span>
          <span style={{ textTransform: "uppercase" }}>Телефон (логин)</span>
        </div>
      ),
      children: (
        <span style={{ fontWeight: "bold" }}>
          {detail?.tel.toLocaleUpperCase()}
        </span>
      ),
    },
    {
      key: "status",
      labelStyle: {
        display: "flex",
        alignItems: "center",
      },
      contentStyle: {
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      },
      label: (
        <div className="label-content">
          <span className="merchant__profile">
            <UserIcon />
          </span>
          <span style={{ textTransform: "uppercase" }}>Статус</span>
        </div>
      ),
      children: (
        <Switch
          // checked={isActive}
          checkedChildren="АКТИВНИЫ"
          unCheckedChildren={"НЕАКТИВЕН"}
          // onChange={handleStatusChange}
          // disabled={
          //   (detail?.status?.length > 0 && detail?.status === "pending") ||
          //   detail?.status === "rejected"
          // }
        />
      ),
    },
  ];

  const TAB_ITEMS: TabsProps["items"] = USER_PROFILE_ITEMS.map((u) => ({
    key: u.label,
    label: u.title,
  }));
  const [activeKey, setActiveKey] = useState(TAB_ITEMS[0].key);

  const onChange = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    const k =
      TAB_ITEMS.find((d) => location.pathname.includes(d.key))?.key || "";
    setActiveKey(k);
  }, [location]);

  return (
    <>
      <Card
        className="user-profile-card-nav card"
        actions={[
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  colorBorderSecondary: "none",
                },
              },
            }}
          >
            <Tabs
              defaultActiveKey={activeKey}
              activeKey={activeKey}
              items={TAB_ITEMS}
              onChange={onChange}
              // style={{ textTransform: "capitalize" }}
            />
          </ConfigProvider>,
        ]}
      >
        <Row {...stylesContext?.rowProps}>
          <Col xs={24} sm={8} lg={4}>
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="user profile image"
              height="100%"
              width="100%"
              style={{ borderRadius }}
            />
          </Col>
          <Col xs={24} sm={16} lg={20}>
            <Descriptions
              title="User Info"
              items={DESCRIPTION_ITEMS}
              column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={6} xl={4} xxl={4}>
            <RevenueCard
              title="Техника"
              value={15}
              diff={20}
              // loading={listLoading}
            />
          </Col>
          <Col xs={24} md={12} lg={6} xl={4} xxl={4}>
            <RevenueCard
              title="Водители"
              value={23}
              diff={-20}
              // loading={listLoading}
            />
          </Col>
          <Col xs={24} md={12} lg={6} xl={4} xxl={4}>
            <RevenueCard
              title="Заказов"
              value={56}
              diff={20}

              // loading={listLoading}
            />
          </Col>
          <Col xs={24} md={12} lg={8} xl={6} xxl={6}>
            <RevenueCard
              title="Merchants.UZS"
              value={50794564}
              diff={20}

              // loading={listLoading}
            />
          </Col>
          <Col xs={24} md={12} lg={8} xl={6} xxl={6}>
            <RevenueCard
              title="Оборот.UZS"
              value={207922544}
              diff={20}

              // loading={listLoading}
            />
          </Col>
        </Row>
      </Card>
      <div style={{ marginTop: "1.5rem" }}>
        <Outlet />
      </div>
    </>
  );
};
