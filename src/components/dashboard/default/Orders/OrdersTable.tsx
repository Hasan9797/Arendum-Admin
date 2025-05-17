/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
// import useAuth from "../../../../hooks/auth/useAuth";
import {
  getDateTime,
  addFilter,
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils/index";
import { TransactionTableType } from "../../../../types";
import OrdersDetailModal from "./OrdersDetailModal";
import useOrders from "../../../../hooks/orders/useOrders.jsx";
import useStatics from "../../../../hooks/statics/useStatics.jsx";

const OrdersTable = () => {
  const { getOrders, orders, pagination, listLoading } = useOrders();
  const { getOrderStatus, orderStatus, orderLoading } = useStatics();
  const [detailModal, setDetailModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
  });

  useEffect(() => {
    getOrders(params);
    getOrderStatus();
  }, []);

  const filter = () => {
    const newParams = { ...params };
    newParams["pageNumber"] = 1;
    setParams(newParams);
    getOrders(newParams);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      filter();
    }
  };
  const columns: TableColumnsType<TransactionTableType> = [
    {
      title: "ID заказа",
      width: "1%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          key: "id",
          dataIndex: "id",
        },
      ],
    },
    {
      title: "Заказчик",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "fullName", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          render: (client) => client?.fullName,
          key: "client",
          dataIndex: "client",
        },
      ],
    },
    {
      title: "Минимальная сумма",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "amount", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "amount",
          key: "amount",
        },
      ],
    },
    {
      title: "Сумма заказа",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) =>
                addFilter(setParams, "totalAmount", e.target.value)
              }
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "totalAmount",
          render: (totalAmount) => (totalAmount ? totalAmount : 0),
          key: "totalAmount",
        },
      ],
    },
    {
      title: "Тип оплаты",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) =>
                addFilter(setParams, "paymentType", e.target.value)
              }
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "paymentType",
          render: (paymentType) => paymentType?.text,
          key: "paymentType",
        },
      ],
    },
    {
      title: "Тип техники",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "machine", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "machine",
          key: "machine",
          render: (machine) => machine?.name,
        },
      ],
    },
    {
      title: "Исполнитель",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          key: "driver",
          dataIndex: "driver",
          render: (driver) => driver?.fullName,
        },
      ],
    },
    {
      title: "Статус",
      width: "10%",
      children: [
        {
          title: (
            <Select
              className="w-100 "
              loading={orderLoading}
              disabled={orderLoading}
              showSearch
              allowClear
              filterOption={(inputValue, option) =>
                String(option?.label) // `label` ni stringga aylantiramiz
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                orderStatus &&
                orderStatus?.map((status) => ({
                  value: status.value,
                  label: status.label,
                }))
              }
              onChange={(e) => addFilter(setParams, "status", e)}
            />
          ),
          dataIndex: ["statusColumn", "string"],
          key: "status",
        },
      ],
    },
    {
      title: "Дата и время заказа",
      width: "15%",
      children: [
        {
          title: (
            <DatePicker.RangePicker
              onChange={(e, v) =>
                addFilter(setParams, "createdAt", getDateTime(e, v), "between")
              }
            />
          ),
          dataIndex: "createdAt",
          key: "createdAt",
          render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY HH:mm:ss"),
        },
      ],
    },
    {
      title: "Действие",
      children: [
        {
          title: "",
          dataIndex: "others",
          key: "others",
        },
      ],
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
        className="card"
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
        loading={listLoading}
        title={() => (
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Col>
              <Typography.Title
                style={{
                  fontSize: "30px",
                  fontWeight: "500",
                  marginTop: 0,
                  marginBottom: "10px",
                }}
              >
                Заказы
              </Typography.Title>
              <Typography.Text style={{ fontSize: "16px", color: "gray" }}>
                База данных всех заказов
              </Typography.Text>
            </Col>

            <Col
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <Button type="primary" onClick={() => window.location.reload()}>
                Очистить
              </Button>
              <Button type="primary" onClick={filter}>
                Искать
              </Button>
            </Col>
          </Row>
        )}
        // pagination={{
        //   onChange: (page, pageSize) => {
        //     const newParams = { ...params };
        //     newParams.page = page;
        //     newParams.limit = pageSize;
        //     setParams(newParams);
        //     getOrders(newParams);
        //   },
        //   total: pagination?.total,
        //   showTotal: (total, range) => (
        //     <div className="show-total-pagination">
        //       Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
        //       записи.
        //     </div>
        //   ),
        //   pageSize: params.limit,
        //   current: pagination?.current_page,
        // }}
        pagination={{
          onChange: (page, pageSize) => {
            const newParams = { ...params };
            newParams.page = page;
            newParams.limit = pageSize;
            setParams(newParams);
            getOrders(newParams);
          },
          total: pagination?.total,
          showTotal: (total, range) => (
            <div className="show-total-pagination">
              Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
              записи.
            </div>
          ),
          pageSize: params.limit,
          current: pagination?.current_page,
        }}
      />
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

export default OrdersTable;
