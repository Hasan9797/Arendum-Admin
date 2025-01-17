/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  DatePicker,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useMemo, useState } from "react";
import {
  addFilter,
  setColorFromApplicaionStatus,
  setIconFromApplicaionStatus,
} from "../../../../utils";
import React from "react";
import { MerchantsData, Statuses } from "../../../../constants";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getDateTime } from './../../../../utils/index';
import dayjs from "dayjs";

const MerchantsTable: React.FC = () => {
  // const { getApplications, application, listLoading, pagination } =
  //   useApplication();
  // const { services, listLoading: servicesLoading, getServices } = useServices();

  // const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 20,
  });

  const navigate = useNavigate();

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

  const onBlur = () => {
    filter();
  };

  // useEffect(() => {
  //   getApplications(params);
  //   getServices();
  // }, []);

  const columns = [
    {
      title: "№",
      children: [
        {
          title: (
            <Input
              type="number"
              onChange={(e) =>
                addFilter(setParams, "applicationId", e.target.value)
              }
              onKeyPress={onKeyPress}
              onBlur={onBlur}
            />
          ),
          key: "id",
          dataIndex: "id",
          width: "8%",
        },
      ],
    },
    {
      title: "Наименование",
      children: [
        {
          title: (
            <Input
              type="number"
              onChange={(e) =>
                addFilter(setParams, "invoiceNumber", e.target.value)
              }
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "merchant",
          key: "merchant",
          width: "18%",
        },
      ],
    },
    {
      title: "Контакт",
      children: [
        {
          title: (
            <Input
              type="number"
              onChange={(e) => addFilter(setParams, "tel", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "tel",
          key: "tel",
          width: "13%",
        },
      ],
    },
    {
      title: "Руководитель",
      children: [
        {
          title: (
            <Input
              onChange={(e) =>
                addFilter(setParams, "clientName", e.target.value)
              }
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "name",
          key: "name",
          width: "15%",
        },
      ],
    },
    {
      title: "Кол-во техники",
      children: [
        {
          title: (
            <Input
              onChange={(e) =>
                addFilter(setParams, "amount_equipment", e.target.value)
              }
              onKeyPress={onKeyPress}
              onBlur={onBlur}
            />
          ),
          key: "amount_equipment",
          dataIndex: "amount_equipment",
          width: "10%",
        },
      ],
    },
    {
      title: "Статус",
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
          width: "8%",
        },
      ],
    },
    {
      title: "Дата создания",
      children: [
        {
          title: (
            <DatePicker.RangePicker
              onChange={(e, v) =>
                addFilter(setParams, "filterDate", getDateTime(e, v), "between")
              }
            />
          ),
          dataIndex: "createdAt",
          key: "createdAt",
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
          width: "10%",
        },
      ],
    },
  ];

  const data = useMemo(() => {
    return MerchantsData?.map((item) => {
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
                // setDetailId(item?.id);
                navigate(`/dashboards/merchants/${item?.id}/merchant-orders`);
              }}
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() => {
                // setDetailId(item?.id);
                navigate(`/dashboards/merchants/${item?.id}/update-merchant`);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
              onOpenChange={(open) => {
                if (open) {
                  // setDetailId(item?.id);
                } else {
                  // setDetailId(null);
                }
              }}
              onConfirm={() => {
                // remove(item?.id).then(() => {
                //   message.success("Успешно удалено");
                //   getFacilities(params);
                // });
              }}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      };
    });
  }, [MerchantsData]);

  return (
    <>
      <Table
        scroll={{ x: 1000 }}
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
    </>
  );
};

export default MerchantsTable;
