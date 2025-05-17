import {
  Button,
  /* eslint-disable react-hooks/exhaustive-deps */
  Card,
  Col,
  Descriptions,
  Row,
  Spin,
} from "antd";
import { FC, useEffect, useMemo } from "react";
import useDeposit from "../../../../hooks/deposit/useDeposit";
import dayjs from "dayjs";
import PageHeader from "../../../PageHeader/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const DepositDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detail, getDetail, detailLoading } = useDeposit();

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
  }, [id]);

  const detailItems = useMemo(() => {
    const parseRequest = (request: string | undefined) => {
      if (!request) return "No request data";
      try {
        const parsed = JSON.parse(request);
        // JSON ni formatlangan string sifatida qaytarish
        return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
      } catch (error) {
        console.error("JSON parse xatosi:", error);
        return "Invalid JSON format";
      }
    };
    return [
      {
        label: detail?.driverId
          ? "Driver ID"
          : detail?.clientId
            ? "Client ID"
            : "",
        children: detail?.driverId
          ? detail.driverId
          : detail?.clientId
            ? detail.clientId
            : "",
        span: 4,
      },
      {
        label: "Order ID",
        children: detail?.orderId,
        span: 4,
      },
      {
        label: "Amount",
        children: detail?.amount,
        span: 4,
      },
      {
        label: "Currency",
        children: detail?.currency,
        span: 4,
      },
      {
        label: "Type",
        children: detail?.type,
        span: 4,
      },
      {
        label: "Status",
        children: detail?.status,
        span: 4,
      },
      {
        label: "Partner ID",
        children: detail?.partnerId,
        span: 4,
      },
      {
        label: "Invoice",
        children: detail?.invoice,
        span: 4,
      },
      {
        label: "Card ID",
        children: detail?.cardId,
        span: 4,
      },
      {
        label: "Commission",
        children: detail?.commission,
        span: 4,
      },
      {
        label: "Deposit Amount",
        children: detail?.depositAmount,
        span: 4,
      },
      {
        label: "Description",
        children: detail?.description,
        span: 4,
      },
      {
        label: "Request",
        children: parseRequest(detail?.request),
        span: 4,
      },
      {
        label: "Response",
        children: parseRequest(detail?.response),
        span: 4,
      },

      {
        label: "Дата создания",
        children: detail?.createdAt
          ? dayjs(detail?.createdAt).format("DD-MM-YYYY HH:mm:ss")
          : "No date",
        span: 4,
      },
    ];
  }, [detail]);

  return detailLoading ? (
    <Spin />
  ) : (
    <>
      <Card style={{ display: "flex", marginBottom: "1.5rem" }}>
        <Row gutter={[24, 24]}>
          <Col>
            <Button
            type="primary"
            size="middle"
              danger
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
          </Col>
          <Col>
            <PageHeader
              title={
                detail?.client
                  ? `${detail?.client?.fullName} (User)`
                  : detail?.driver
                    ? `${detail?.driver?.fullName} (Driver)`
                    : "Odammas😩"
              }
            />
          </Col>
        </Row>
      </Card>
      <Card>
        <Descriptions bordered items={detailItems} />
      </Card>
    </>
  );
};

export default DepositDetail;
