/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { FC, useMemo, useState } from "react";
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
} from "antd";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../utils";
import { TransactionTableType } from "../../types/transactions";
// import useApplication from "./../../hooks/application/useApplication";

// import { setColorFromRole } from "./../../utils/index";
import dayjs from "dayjs";
import { Statuses, Tranzactions } from "../../constants";
import { addFilter } from "./../../utils/index";
import { getDateTime } from "./../../utils/index";
import OrdersDetailModal from "../dashboard/default/Orders/OrdersDetailModal";
import { EyeOutlined } from "@ant-design/icons";

const LastTransactionsTable: FC = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 20,
  });
  // const { currentTransactions, listLoading, getStatisticsCurrentDate } =
  //   useApplication();

  // useEffect(() => {
  //   getStatisticsCurrentDate();
  // }, []);

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
      width: "10%",
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
      width: "20%",
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
      width: "20%",
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
      width: "20%",
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
        key: item?.id,
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
        scroll={{ x: 1625 }}
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
              Информацию из заказам
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
        // loading={listLoading}
        pagination={{
          onChange: (page, pageSize) => {
            const newParams = { ...params };
            newParams.pageSize = pageSize;
            newParams.pageNumber = page;
            setParams(newParams);
            // getList(newParams);
          },
          total: Tranzactions.length,
          showTotal: (total, range) => (
            <div className="show-total-pagination">
              Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
              записи.
            </div>
          ),
          pageSize: 4,
          current: 1,
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

export default LastTransactionsTable;
