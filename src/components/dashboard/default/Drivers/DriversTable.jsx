/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { addFilter, getDateTime } from "../../../../utils";
import { useEffect } from "react";
import TableTitle from "../../../TableTitle/TableTitle";
import dayjs from "dayjs";
import useDrivers from "../../../../hooks/drivers/useDrivers";
import useRegions from "../../../../hooks/region/useRegion";
import { useNavigate } from "react-router-dom";
import useStatics from "../../../../hooks/statics/useStatics";
import useMachines from "../../../../hooks/machines/useMachines";

const DriversTable = () => {
  const { getDrivers, drivers, pagination, listLoading, remove } = useDrivers();
  const { getRegions, regions, listLoading: regionLoading } = useRegions();
  const { getDriverStatus, driverStatus, driverLoading } = useStatics();
  const { getMachines, machines, listLoading: machineLoading } = useMachines();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
  });

  const filter = () => {
    const newParams = { ...params };
    newParams["page"] = 1;
    setParams(newParams);
    getDrivers(newParams);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      filter();
    }
  };

  useEffect(() => {
    getDrivers(params);
    getRegions(params);
    getDriverStatus();
    getMachines();
  }, []);
  console.log(drivers);
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
      title: "Ф.И.О. / Название организации",
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
      title: "Техника",
      width: "15%",
      children: [
        {
          title: (
            <Select
              className="w-100"
              showSearch
              allowClear
              loading={machineLoading}
              disabled={machineLoading}
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                machines &&
                machines.map((machine) => ({
                  value: machine.id,
                  label: machine.name,
                }))
              }
              onChange={(value) =>
                addFilter(setParams, "machineId", value, "equals")
              }
            />
          ),
          dataIndex: "machine",
          render: (machine) => machine?.name,
          key: "machine",
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
      title: "ИНН организации",
      width: "15%",
      children: [
        {
          title: (
            <Input
              type="string"
              onChange={(e) => addFilter(setParams, "email", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "inn",
          key: "inn",
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
                addFilter(setParams, "region", value, "equals")
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
              loading={driverLoading}
              disabled={driverLoading}
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                driverStatus &&
                driverStatus.map((status) => ({
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
          render: (status) => status.value,
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
          dataIndex: "registrationDate",
          key: "registrationDate",
          render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm:ss"),
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
    return drivers?.map((item) => {
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            <Button
              onClick={() => {
                navigate(`/dashboards/driver/${item?.id}/detail`);
              }}
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() => {
                navigate(`/dashboards/driver/${item?.id}/update`);
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
                    getDrivers(params);
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
  }, [drivers]);
  return (
    <>
      <Table
        scroll={{ x: 1000 }}
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
            newParams.page = page;
            newParams.limit = pageSize;
            setParams(newParams);
            getDrivers(newParams);
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
    </>
  );
};

export default DriversTable;
