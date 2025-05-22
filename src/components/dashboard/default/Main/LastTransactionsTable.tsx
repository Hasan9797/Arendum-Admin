/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { FC, useEffect, useMemo, useState } from "react";
import { Button, Col, Row, Space, Table, TableColumnsType, Tag } from "antd";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils";
import { TransactionTableType } from "../../../../types/transactions";
import dayjs from "dayjs";
import OrdersDetailModal from "../../../dashboard/default/Orders/OrdersDetailModal";
import { EyeOutlined } from "@ant-design/icons";
import useOrders from "../../../../hooks/orders/useOrders.jsx";
import useStatics from "../../../../hooks/statics/useStatics.jsx";

const LastTransactionsTable: FC = () => {
  const [detailModal, setDetailModal] = useState(false);
  const { getOrders, orders, listLoading } = useOrders();
  const { getOrderStatus } = useStatics();

  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    getOrders({ page: 1, limit: 10 });
    getOrderStatus();
  }, []);

  const columns: TableColumnsType<TransactionTableType> = [
    {
      title: "ID заказа",
      width: "10%",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Заказчик",
      width: "10%",
      render: (client) => client?.fullName,
      key: "client",
      dataIndex: "client",
    },
    {
      title: "Минимальная сумма",
      width: "10%",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Сумма заказа",
      width: "10%",
      dataIndex: "totalAmount",
      render: (totalAmount) => (totalAmount ? totalAmount : 0),
      key: "totalAmount",
    },
    {
      title: "Тип оплаты",
      width: "10%",
      dataIndex: "paymentType",
      render: (paymentType) => paymentType?.text,
      key: "paymentType",
    },
    {
      title: "Тип техники",
      width: "10%",
      dataIndex: "machine",
      key: "machine",
      render: (machine) => machine?.name,
    },
    {
      title: "Исполнитель",
      width: "10%",
      key: "driver",
      dataIndex: "driver",
      render: (driver) => driver?.fullName,
    },
    {
      title: "Статус",
      width: "10%",
      dataIndex: ["statusColumn", "string"],
      key: "status",
    },
    {
      title: "Дата и время заказа",
      width: "15%",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Действие",
      dataIndex: "others",
      key: "others",
    },
  ];

  const data = useMemo(() => {
    return orders?.map((item) => {
      return {
        ...item,
        key: item.id,
        statusColumn: {
          int: item?.status?.id,
          string: (
            <Tag
              icon={setIconFromApplicaionStatus(item?.status?.text)}
              color={setColorFromApplicaionStatus(item?.status?.text)}
            >
              {item.status?.text}
            </Tag>
          ),
        },
        others: (
          <Space>
            <Button
              onClick={() => {
                setDetailModal(true);
                setDetailId(item?.id);
              }}
              icon={<EyeOutlined />}
            />
          </Space>
        ),
      };
    });
  }, [orders]);

  return (
    <>
      <Table
        scroll={{ x: "max-content"  }}
        className="card"
        columns={columns}
        dataSource={data}
        title={() => (
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Col style={{ fontSize: "24px", fontWeight: "bold" }}>
              Информация о заказах
            </Col>
          </Row>
        )}
        loading={listLoading}
        pagination={false}
        id={detailId}
      />{" "}
      <OrdersDetailModal
        open={detailModal}
        onCancel={() => {
          setDetailModal(false);
          setDetailId(null);
        }}
        id={detailId}
      />
    </>
  );
};

export default LastTransactionsTable;
