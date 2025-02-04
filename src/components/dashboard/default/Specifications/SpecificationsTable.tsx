/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  message,
} from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import useStatics from "../../../../hooks/statics/useStatics.jsx";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addFilter, getDateTime } from "../../../../utils";
import TableTitle from "../../../TableTitle/TableTitle.js";

const SpecificationsTable = () => {
  const navigate = useNavigate();

  const {
    getList,
    specifications,
    listLoading,
    update,
    updateLoading,
    remove,
    removeLoading,
    pagination,
  } = useSpecification();
  const { getMachines, machines, listLoading: machineLoading } = useMachines();
  const { getDriverStatus, driverStatus, driverLoading } = useStatics();

  const [params, setParams] = useState({
    page: 1,
    limit: 20,
    filters: [],
  });

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
    getMachines({ page: 1, limit: 200 });
    getDriverStatus();
  }, []);

  const columns = [
    {
      title: "Название параметра",
      width: "20%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "name", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          key: "name",
          render: (parametr) => (
            <p>{`${parametr?.name} (${parametr?.prefix?.toUpperCase()})`}</p>
          ),
        },
      ],
    },
    {
      title: "Значение",
      width: "40%",
      key: "params",
      render: (parametres) => {
        if (parametres && Array.isArray(parametres.params)) {
          return parametres.params.map((param, index) => (
            <Badge
              style={{ marginRight: "3px", paddingBottom: "2px" }}
              key={index}
              count={`${param.param}`}
              showZero
              color="blue"
              overflowCount={Infinity}
            />
          ));
        }
        return "No parameters available";
      },
    },
    {
      title: "Связь с категорией",
      dataIndex: "machine",
      width: "20%",
      key: "machine",
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
                String(option?.label)
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) >= 0
              }
              options={
                machines &&
                machines.map((machine) => ({
                  value: machine.id,
                  label: machine?.name,
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
      title: "Статус",
      width: "20%",
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
                String(option?.label)
                  .toUpperCase()
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
      width: "20%",
      dataIndex: "others",
      key: "others",
    },
  ];
  const data = useMemo(() => {
    return specifications?.map((item) => {
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            {/* <Button onClick={() => {}} icon={<EyeOutlined />} /> */}
            <Button
              onClick={() => {
                navigate(`/dashboards/specifications/${item?.id}`);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
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
              <Button
                loading={removeLoading}
                disabled={removeLoading}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        ),
        status: (
          <Space>
            <Switch
              checked={item.status === 2}
              checkedChildren={"Активный"}
              unCheckedChildren={
                (item.status === 0 && "Созданный") ||
                (item.status === 1 && "Неактивный")
              }
              disabled={updateLoading}
              onChange={(cheched) => handleStatusChange(cheched, item.id)}
            />
          </Space>
        ),
      };
    });
  }, [specifications]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={data}
        loading={listLoading}
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
        pagination={{
          onChange: (page, pageSize) => {
            const newParams = { ...params };
            newParams.page = page;
            newParams.limit = pageSize;
            setParams(newParams);
            getList(newParams);
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

export default SpecificationsTable;
