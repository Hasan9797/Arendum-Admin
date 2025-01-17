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
import { useMemo, useState } from "react";
import dayjs from "dayjs";
// import useAuth from "../../../../hooks/auth/useAuth";
import { Statuses, Tranzactions } from "../../../../constants";
import {
  getDateTime,
  addFilter,
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils/index";
import { TransactionTableType } from "../../../../types";
import OrdersDetailModal from "./OrdersDetailModal";

const OrdersTable = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 20,
  });
  const filter = () => {
    const newParams = { ...params };
    newParams["pageNumber"] = 1;
    setParams(newParams);
    // getList(newParams);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      filter();
    }
  };

  const columns: TableColumnsType<TransactionTableType> = [
    {
      title: "ID заказа",
      width: "5%",
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
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          key: "driver",
          dataIndex: "driver",
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
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "amount",
          key: "amount",
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
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "payment",
          key: "payment",
        },
      ],
    },
    {
      title: "Тип заказа",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "type_order",
          key: "type_order",
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
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "type_of_equipment",
          key: "type_of_equipment",
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
          key: "user",
          dataIndex: "user",
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
              // loading={listLoading}
              // disabled={listLoading}
              showSearch
              allowClear
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                Statuses &&
                Statuses?.map((item) => ({
                  value: item.title,
                  label: item.title,
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
                addFilter(setParams, "filterDate", getDateTime(e, v), "between")
              }
            />
          ),
          dataIndex: "date",
          key: "date",
          render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm:ss"),
        },
      ],
    },
    {
      title: "Actions",
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
    return Tranzactions?.map((item) => {
      return {
        ...item,
        key: item.id,
        statusColumn: {
          int: item?.status,
          string: (
            <Tag
              icon={setIconFromApplicaionStatus(item?.status)}
              color={setColorFromApplicaionStatus(item?.status)}
            >
              {item.status}
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
  }, [Tranzactions]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: 1600 }}
        columns={columns}
        dataSource={data}
        // loading={listLoading}
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
        pagination={false}
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
