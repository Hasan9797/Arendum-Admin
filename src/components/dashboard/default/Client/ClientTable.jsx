/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  addFilter,
  getDateTime,
  setColorFromRole,
  setColorFromStatus,
  setIconFromStatus,
} from "../../../../utils";
import TableTitle from "../../../TableTitle/TableTitle";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useClient from "../../../../hooks/client/useClient";
import useRegion from "../../../../hooks/region/useRegion";
import { render } from "react-dom";

const ClientTable = () => {
  const { clients, getList, remove, listLoading } = useClient();
  const { regions, getRegions, listLoading: regionLoading } = useRegion();
  // const { user } = useAuth();
  console.log(clients);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();

  const filter = () => {
    const newParams = { ...params };
    newParams["page"] = 1;
    setParams(newParams);
    getList(newParams);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      filter();
    }
  };

  useEffect(() => {
    getList(params);
    getRegions(params);
    // getStatus();
  }, [params]);

  const columns = [
    {
      title: "ID raqami",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "id",
          key: "id",
        },
      ],
    },
    {
      title: "F.I.Sh. / Tashkilot nomi",
      width: "20%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "fullName", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "fullName",
          key: "fullName",
        },
      ],
    },
    {
      title: "Telefon raqami",
      width: "15%",
      children: [
        {
          title: (
            <Input
              type="tel"
              onChange={(e) => addFilter(setParams, "phone", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "phone",
          key: "phone",
        },
      ],
    },
    {
      title: "Email manzili",
      width: "15%",
      children: [
        {
          title: (
            <Input
              type="email"
              onChange={(e) => addFilter(setParams, "email", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "email",
          key: "email",
        },
      ],
    },
    {
      title: "Foydalanuvchi mintaqasi",
      width: "15%",
      children: [
        {
          title: (
            <Select
              className="w-100"
              showSearch
              allowClear
              loading={regionLoading}
              disabled={regionLoading}
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                regions &&
                regions.map((region) => ({
                  value: region.id,
                  label: region.name,
                }))
              }
              onChange={(value) => addFilter(setParams, "regionId", value)}
            />
          ),
          dataIndex: "region",
          key: "region",
        },
      ],
    },
    {
      title: "Ro‘yxatdan o‘tish sanasi",
      width: "15%",
      children: [
        {
          title: (
            <DatePicker.RangePicker
              onChange={(e, v) =>
                addFilter(
                  setParams,
                  "registrationDate",
                  getDateTime(e, v),
                  "between"
                )
              }
            />
          ),
          dataIndex: "registrationDate",
          key: "registrationDate",
          render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm:ss"),
        },
      ],
    },
    {
      title: "Holati",
      width: "10%",
      children: [
        {
          title: (
            <Select
              className="w-100"
              showSearch
              allowClear
              // loading={listLoading}
              // disabled={listLoading}
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={[
                { value: "active", label: "Faol" },
                { value: "blocked", label: "Bloklangan" },
              ]}
              onChange={(value) => addFilter(setParams, "status", value)}
            />
          ),
          // dataIndex: "status",
          render: ({ status }) => (
            <Tag key={status} color={setColorFromStatus(status)}>
              {status.value}
            </Tag>
          ),
          key: "status",
        },
      ],
    },
    {
      title: "",
      width: "5%",
      children: [
        {
          title: "",
          dataIndex: "actions",
          key: "actions",
          render: (text, record) => (
            <Button
              type="primary"
              onClick={() => navigate(`/dashboards/user/${record?.id}`)}
            >
              Tahrirlash
            </Button>
          ),
        },
      ],
    },
  ];

  const data = useMemo(() => {
    return clients?.map((item) => {
      return {
        ...item,
        key: item?.id,
        roleColumn: {
          int: item?.role,
          string: (
            <>
              <Tag key={item?.role} color={setColorFromRole(item?.role)}>
                {item?.role}
              </Tag>
            </>
          ),
        },
        statusColumn: {
          int: item?.status,
          string: (
            <Tag
              icon={setIconFromStatus(item.status)}
              color={setColorFromStatus(item.status)}
            >
              {item.status}
            </Tag>
          ),
        },
        others: (
          <Space>
            <Button
              onClick={() => {
                navigate(`/dashboards/user/${item?.id}`);
              }}
              icon={<UserOutlined />}
            />
            <Popconfirm
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => {
                remove(item?.id).then((res) => {
                  if (!res) {
                    message.success("Успешно удалено");
                    getList(params);
                  }
                });
              }}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      };
    });
  }, [clients]);

  return (
    <>
      <Table
        scroll={{ x: 1200 }}
        className="card"
        columns={columns}
        dataSource={data}
        title={() => (
          <TableTitle>
            <Button type="primary" onClick={() => window.location.reload()}>
              Очистить
            </Button>
            <Button type="primary" onClick={filter}>
              Искать
            </Button>
          </TableTitle>
        )}
        loading={listLoading}
        pagination={{
          onChange: (page, pageSize) => {
            const newParams = { ...params };
            newParams.pageSize = pageSize;
            newParams.pageNumber = page;
            setParams(newParams);
            // getList(newParams);
          },
          total: 10,
          showTotal: (total, range) => (
            <div className="show-total-pagination">
              Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
              записи.
            </div>
          ),
          pageSize: 10,
          current: 1,
        }}
      />
    </>
  );
};

export default ClientTable;
