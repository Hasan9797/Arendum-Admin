/* eslint-disable react-hooks/exhaustive-deps */
import {
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
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useStructure from "../../../../hooks/structure/useStructure";
import { useEffect } from "react";
import dayjs from "dayjs";
import { addFilter, getDateTime } from "../../../../utils";
import StructureDetailModal from "./DistrictDetailModal";
import StructureEditModal from "./DistrictEditModal";
import TableTitle from "../../../TableTitle/TableTitle";
import useStatics from "../../../../hooks/statics/useStatics";

const DistrictTable = () => {
  const {
    structure,
    getStructure,
    remove,
    listLoading,
    update,
    updateLoading,
    pagination,
  } = useStructure();
  const { getDriverStatus, driverStatus, driverLoading } = useStatics();

  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
  });

  useEffect(() => {
    getStructure(params);
    getDriverStatus();
  }, []);

  const filter = () => {
    const newParams = { ...params };
    newParams["page"] = 1;
    setParams(newParams);
    getStructure(newParams);
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
      await getStructure(params);
    } catch (error) {
      message.error("Statusni o'zgartirishda xatolik:", error);
    }
  };

  const columns = [
    {
      title: "Имя",
      width: "30%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "name", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "name",
          key: "name",
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
          key: "status",
        },
      ],
    },
    {
      title: "Дата создания",
      width: "20%",
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
          render: (createdAt) =>
            dayjs(createdAt).format("DD-MM-YYYY  HH:mm:ss"),
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
    return structure?.map((item) => {
      console.log(item);
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            <Button
              onClick={() => {
                setDetailModal(true);
                setDetailId(item?.id);
              }}
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() => {
                setEditModal(true);
                setDetailId(item?.id);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
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
                remove(item?.id).then((res) => {
                  if (res.success === true) {
                    message.success("Успешно удалено");
                    getStructure(params);
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
              onChange={(checked) => handleStatusChange(checked, item.id)}
            />
          </Space>
        ),
      };
    });
  }, [structure]);

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
            newParams.pageSize = pageSize;
            newParams.pageNumber = page;
            setParams(newParams);
            getStructure(newParams);
          },
          total: pagination.totalUsers,
          showTotal: (total, range) => (
            <div className="show-total-pagination">
              Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
              записи.
            </div>
          ),
          pageSize: pagination.pageSize,
          current: pagination.currentPage,
        }}
      />
      <StructureDetailModal
        open={detailModal}
        onCancel={() => {
          setDetailModal(false);
          setDetailId(null);
        }}
        id={detailId}
      />
      <StructureEditModal
        open={editModal}
        onCancel={() => {
          setEditModal(false);
          setDetailId(null);
        }}
        id={detailId}
      />
    </>
  );
};

export default DistrictTable;
