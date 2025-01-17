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
import { useNavigate } from "react-router-dom";
import { regions } from "../../../../constants";
const DriversTable = () => {
  const { getDrivers, drivers, pagination, listLoading, remove } = useDrivers();
  const navigate = useNavigate();
  const [detailId, setDetailId] = useState();
  const [params, setParams] = useState({
    page: 1,
    limit: 20,
    filters: [],
  });

  console.log(drivers)

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

  // const onBlur = () => {
  //   filter();
  // };

  useEffect(() => {
    getDrivers(params);
  }, []);

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
              loading={listLoading}
              disabled={listLoading}
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
              onChange={(value) => addFilter(setParams, "region", value)}
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
              loading={listLoading}
              disabled={listLoading}
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
          dataIndex: "status",
          key: "status",
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
              onOpenChange={(open) => {
                if (open) {
                  setDetailId(item?.id);
                } else {
                  setDetailId(null);
                }
              }}
              onConfirm={() => {
                remove(item?.id).then(() => {
                  message.success("Успешно удалено");
                  getDrivers(params);
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
            newParams.limit = pageSize;
            newParams.page = page;
            setParams(newParams);
            getDrivers(newParams);
          },
          total: pagination?.totalPages,
          showTotal: (total, range) => (
            <div className="show-total-pagination">
              Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
              записи.
            </div>
          ),
          pageSize: pagination.pageSize,
          current: pagination?.currentPage,
        }}
      />

      {/* <DriverEditModal
        open={editModal}
        onCancel={() => {
          setEditModal(false);
          setDetailId(null);
        }}
        id={detailId}
      /> */}
    </>
  );
};

export default DriversTable;
