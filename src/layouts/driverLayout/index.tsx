import {
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Image,
  message,
  Row,
  Spin,
  Switch,
  Tabs,
  TabsProps,
  Tag,
  theme,
  // Typography,
} from "antd";
import { Card, RevenueCard } from "../../components";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { DRIVER_PROFILE_ITEMS } from "../../constants";
import { useStylesContext } from "../../context";
import { useEffect, useState } from "react";
import useDrivers from "../../hooks/drivers/useDrivers.jsx";
import useRegions from "../../hooks/region/useRegion.jsx";

import "./styles.css";
import dayjs from "dayjs";

export const DriverAccountLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  const navigate = useNavigate();
  const stylesContext = useStylesContext();
  const { id } = useParams();
  const location = useLocation();
  const { getDetail, detail, detailLoading, update, updateLoading } =
    useDrivers();
  const { getRegions, regions,  } = useRegions();


  useEffect(() => {
    if (id) {
      getDetail(id);
      getRegions()
    }
  }, [id]);

  const handleStatusChange = async (checked) => {
    const newStatus = checked ? 2 : 1;
    try {
      await update(detail.id, {
        status: newStatus,
      });
      await getDetail(detail.id);
    } catch (error) {
      message.error("Statusni o'zgartirishda xatolik:", error);
    }
  };

  const driverRegion = regions.find((region)=>region.id ===detail.regionId)?.name


  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "fullName",
      label: "Ф.И.О",
      children: <span>{detail.fullName}</span>,
    },
    {
      key: "phone",
      label: "Номер телефона",
      children: <span>{detail.phone}</span>,
    },
    {
      key: "region",
      label: "Регион",
      children: <span>{driverRegion}</span>,
    },
    {
      key: "email",
      label: "Адрес электронной почты",
      children: (
        <span style={{ whiteSpace: "nowrap" }}>
          {detail.email || "Mavjud emas"}
        </span>
      ),
    },
    {
      key: "registrationDate",
      label: "Дата регистрации",
      children: (
        <span>{dayjs(detail?.registrationDate).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      children: (
        <Switch
          checked={detail.status === 2}
          checkedChildren={"Активный"}
          unCheckedChildren={
            (detail.status === 0 && "Созданный") ||
            (detail.status === 1 && "Неактивный")
          }
          disabled={updateLoading}
          onChange={handleStatusChange}
        />
      ),
    },
    {
      key: "balance",
      label: "Баланс счета",
      // children: <span></span>,
      children: <Tag color="success">{detail?.balance ? detail?.balance : 0} so'm</Tag>,
    },
  ];

  const TAB_ITEMS: TabsProps["items"] = DRIVER_PROFILE_ITEMS.map((u) => ({
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

  return detailLoading ? (
    <Spin />
  ) : (
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
          <Col xs={24} md={12} lg={6} xl={8}>
            <RevenueCard
              title="ВСЕГО ЗАГАСОВ"
              value={15}
              diff={20}
              // loading={listLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={5} xl={8}>
            <RevenueCard
              title="НОВЫХ"
              value={23}
              diff={-20}

              // loading={listLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6} xl={8}>
            <RevenueCard
              title="В ПРОГРЕССЕ"
              value={56}
              diff={20}

              // loading={listLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6} xl={8}>
            <RevenueCard
              title="ОТМЕННЫЕ"
              value={16}
              diff={13}

              // loading={listLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8}>
            <RevenueCard
              title="ВЫПОЛНЕННЫХ"
              value={121}
              diff={10}

              // loading={listLoading}
            />
          </Col>
          <Col xs={24} sm={12} lg={8} xl={8}>
            <RevenueCard
              title="СУММА ЗАКАЗОВ"
              value={4260000}
              diff={10}

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
