/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Spin,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useUser from "../../../../hooks/user/useUser";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Space } from "antd";
import { Statuses, Tranzactions } from "../../../../constants";
import "./index.css";
import { TransactionTableType } from "../../../../types";
import { addFilter } from "../../../../utils/index";
import { getDateTime } from "../../../../utils/index";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils/index";
import OrdersDetailModal from "../Orders/OrdersDetailModal";

export const MerchantDriversPage = () => {
  const { id } = useParams();
  const { detailLoading } = useUser();
  const [detailModal, setDetailModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  console.log(id);

  // const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // const [isActive, setIsActive] = useState(detail?.status === "Активниы");
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 20,
  });
  // useEffect(() => {
  //   if (id && open) {
  //     getDetail(id);
  //     getRoles();
  //     getPermissions();
  //   }
  // }, [id]);

  // useEffect(() => {
  //   setIsActive(detail?.status === "Активниы");
  // }, [detail]);

  // const handleStatusChange = async (checked) => {
  //   try {
  //     setIsActive(checked);
  //     await changeUserStatus(detail.id, {
  //       status: checked ? "active" : "non_active",
  //     });
  //     await getDetail(detail.id);
  //   } catch (error) {
  //     setIsActive(!checked);
  //     console.error("Statusni o'zgartirishda xatolik:", error);
  //   }
  // };

  const filter = () => {
    const newParams = { ...params };
    newParams["pageNumber"] = 1;
    setParams(newParams);
    // getApplications(newParams);
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
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Table
            scroll={{ x: 1640 }}
            className="card"
            columns={columns}
            dataSource={data}
            title={() => (
              <Row
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => window.location.reload()}
                  >
                    Очистить
                  </Button>
                  <Button type="primary" onClick={filter}>
                    Искать
                  </Button>
                </Col>
              </Row>
            )}
            // loading={listLoading}
            // pagination={{
            //   onChange: (page, pageSize) => {
            //     const newParams = { ...params };
            //     newParams.pageSize = pageSize;
            //     newParams.pageNumber = page;
            //     setParams(newParams);
            //     // getApplications(newParams);
            //   },
            //   total: pagination?.total,
            //   showTotal: (total, range) => (
            //     <div className="show-total-pagination">
            //       Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
            //       записи.
            //     </div>
            //   ),
            //   pageSize: pagination.pageSize,
            //   current: pagination?.pageNumber,
            // }}
          />

          {/* <Card style={{ width: "100%", alignItems: "center" }}>
            <Row
              gutter={[16, 0]}
              style={{ marginBottom: "16px" }}
              align="middle"
              justify="space-between"
            >
              <Col>
                <Button
                  type="primary"
                  onClick={() => navigate(-1)}
                  icon={<ArrowLeftOutlined />}
                ></Button>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => setIsDisabled(false)}
                    icon={<EditOutlined />}
                    disabled={detail?.status === "pending" ? true : false}
                  >
                    Edit User
                  </Button>
                </Col>
              </Col>
            </Row>
            <Form form={form} labelCol={{ span: 4 }} onFinish={onSave}>
              {forms.map((item, idx) => (
                <Form.Item
                  key={idx}
                  label={item.label}
                  name={item.name}
                  rules={[{ required: item.required, message: item.message }]}
                >
                  {item.child}
                </Form.Item>
              ))}
            </Form>
          </Card> */}
        </Row>
      )}
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
