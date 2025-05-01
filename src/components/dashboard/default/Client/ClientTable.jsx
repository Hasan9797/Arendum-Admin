/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  addFilter,
  getDateTime,
  setColorFromRole,
} from "../../../../utils";
import TableTitle from "../../../TableTitle/TableTitle";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useClient from "../../../../hooks/client/useClient";
import useRegion from "../../../../hooks/region/useRegion";
import useStatics from "../../../../hooks/statics/useStatics";


const ClientTable = () => {
  const { clients, getList, remove, listLoading,update,updateLoading } = useClient();
  const { regions, getRegions, listLoading: regionLoading } = useRegion();
  const { activateStatus, getActivateStatus, statusLoading } = useStatics();

  // const { user } = useAuth();
  console.log(clients);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
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

  const handleStatusChange = async (checked, id) => {
    const newStatus = checked ? 2 : 1;
    try {
      await update(id, {
        status: newStatus,
      });
      await getList(params);
    } catch (error) {
      message.error("Statusni o'zgartirishda xatolik:", error);
    }
  };

  useEffect(() => {
    getList(params);
    getRegions(params);
    getActivateStatus();
  }, [params]);

  const columns = [
    {
      title: "Ид номер",
      width: "10%",
      children: [
        {
          title: (
            <Input
              onChange={(e) =>
                addFilter(setParams, "id", e.target.value, "equals")
              }
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "id",
          key: "id",
        },
      ],
    },
    {
      title: "Ф.И.О",
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
      title: "Номер телефона",
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
      title: "Баланс счета",
      width: "15%",
      children: [
        {
          title: (
            <Input
              type="tel"
              onChange={(e) => addFilter(setParams, "balance", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "balance",
          key: "balance",
        },
      ],
    },
    {
      title: "Адрес электронной почты",
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
      title: "Регион пользователя",
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
              onChange={(value) =>
                addFilter(setParams, "regionId", value, "equals")
              }
            />
          ),
          dataIndex: "region",
          render: (region) => region?.name,
          key: "region",
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
              className="w-100"
              showSearch
              allowClear
              loading={statusLoading}
              disabled={statusLoading}
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                activateStatus &&
                activateStatus.map((status) => ({
                  value: status.value,
                  label: status.label,
                }))
              }
              onChange={(value) =>
                addFilter(setParams, "status", value, "equals")
              }
            />
          ),
          dataIndex: "status",
          key: "status",
        },
      ],
    },
    {
      title: "Дата регистрации",
      width: "25%",
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
      title: "",
      width: "160px",
      dataIndex: "others",
      key: "others",
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
        status: (
          <Space>
            <Switch
              checked={item.status?.key === 2}
              checkedChildren={"Активный"}
              unCheckedChildren={
                (item.status?.key === 0 && "Созданный") ||
                (item.status?.key === 1 && "Неактивный")
              }
              disabled={updateLoading}
              onChange={(cheched) => handleStatusChange(cheched, item.id)}
            />
          </Space>
        ),
        others: (
          <Space>
            <Button disabled
              onClick={() => {
                navigate(`/dashboards/client/${item?.id}`);
              }}
              icon={<EyeOutlined />}
            />
            <Button
            disabled
              onClick={() => {
                navigate(`/dashboards/user/${item?.id}/update`);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
              placement="topLeft"
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => {
                remove(item?.id).then((res) => {
                  if (res.success === true) {
                    message.success("Успешно удалено");
                    getList(params);
                  } else {
                    message.error("Ошибка при удалении");
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
