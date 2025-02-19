/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Descriptions,
  DescriptionsProps,
  Image,
  message,
  Row,
  Spin,
  Switch,
} from "antd";
import { Card, RevenueCard } from "../../../../components";
import { useStylesContext } from "../../../../context";
import { IMAGES } from "../../../../assets/images/images";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useDrivers from "../../../../hooks/drivers/useDrivers";
import LastApplicationsTable from "../../../../components/Transactions/LastTransactionsTable";
import { useEffect } from "react";

export const DriverDetailPage = () => {
  const { id } = useParams();
  const stylesContext = useStylesContext();
  const navigate = useNavigate();

  const { getDetail, detail, detailLoading, update, updateLoading } =
    useDrivers();

  useEffect(() => {
    if (id) {
      getDetail(id);
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

  console.log(detail);

  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "fullName",
      label: "F.I.Sh. / Tashkilot nomi",
      children: <span>{detail.fullName}</span>,
    },
    {
      key: "phone",
      label: "Telefon raqami",
      children: <span>{detail.phone}</span>,
    },
    {
      key: "region",
      label: "Foydalanuvchi mintaqasi",
      children: <span>{detail.regionId}</span>,
    },
    {
      key: "email",
      label: "Email manzili",
      children: (
        <span style={{ whiteSpace: "nowrap" }}>
          {detail.email || "Mavjud emas"}
        </span>
      ),
    },
    {
      key: "registrationDate",
      label: "Ro‘yxatdan o‘tish sanasi",
      children: (
        <span>{dayjs(detail?.registrationDate).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      key: "status",
      label: "Holati",
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
      key: "update",
      children: (
        <Button
          className="label-content"
          type="primary"
          onClick={() => navigate(`/dashboards/driver/${detail?.id}/update`)}
        >
          <FormOutlined />
          <span>Редактировать</span>
        </Button>
      ),
    },
  ];

  return (
    <>
      {detailLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Spin />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <Card>
            <Row {...stylesContext?.rowProps}>
              <Col
                xs={24}
                sm={6}
                lg={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={IMAGES.userIcon}
                  alt="user profile image"
                  height="100%"
                  width="100%"
                  style={{ borderRadius: "10px" }}
                />
              </Col>
              <Col xs={24} sm={16} lg={20}>
                <Descriptions
                  title={`Водители ИД:  ${detail.id} `}
                  items={DESCRIPTION_ITEMS}
                  column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
                />
              </Col>
            </Row>
          </Card>
          <Card style={{ width: "100%" }}>
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
          <Col style={{ marginBottom: "1.5rem" }}>
            <LastApplicationsTable />
          </Col>
        </Row>
      )}
    </>
  );
};
