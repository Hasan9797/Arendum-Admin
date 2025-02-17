/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Space, Switch, Table, message } from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import RegionDetailModal from "./RegionDetailModal";
import RegionEditModal from "./RegionEditModal";
import { useEffect } from "react";
import dayjs from "dayjs";

const RegionTable = () => {
  const { regions, getRegions, update, updateLoading, remove, listLoading } =
    useRegion();
  console.log(regions);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    getRegions(params);
  }, []);

  const handleStatusChange = async (checked, id) => {
    const newStatus = checked ? 2 : 1;
    try {
      await update(id, {
        status: newStatus,
      });
      await getRegions(params);
    } catch (error) {
      message.error("Statusni o'zgartirishda xatolik:", error);
    }
  };
  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      width: "30%",
      key: "name",
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: "20%",
      key: "status",
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      width: "20%",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY  HH:mm:ss"),
    },
    {
      title: "",
      width: "20%",
      dataIndex: "others",
      key: "others",
    },
  ];
  const data = useMemo(() => {
    return regions?.map((item) => {
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
                    getRegions();
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
              onChange={(cheched) => handleStatusChange(cheched, item.id)}
            />
          </Space>
        ),
      };
    });
  }, [regions]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={data}
        loading={listLoading}
        pagination={false}
      />
      <RegionDetailModal
        open={detailModal}
        onCancel={() => {
          setDetailModal(false);
          setDetailId(null);
        }}
        id={detailId}
      />
      <RegionEditModal
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

export default RegionTable;
