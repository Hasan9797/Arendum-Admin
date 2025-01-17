/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useMachines from "../../../../hooks/machines/useMachines";
import RegionDetailModal from "./MachinesDetailModal";
import RegionEditModal from "./MachinesEditModal";
import { useEffect } from "react";
import dayjs from "dayjs";

const MachinesTable = () => {
  const { machines, getMachines, remove, listLoading } = useMachines();

  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    getMachines();
  }, []);

  const columns = [
    {
      title: "Фото",
      dataIndex: "img",
      width: "30%",
      render: (img) => <img width={150} src={`http://hasandev.uz${img}`} />,

      key: "img",
    },
    {
      title: "Имя",
      dataIndex: "name",
      width: "30%",
      key: "name",
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
    return machines?.map((item) => {
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
                remove(item?.id).then(() => {
                  message.success("Успешно удалено");
                  getMachines();
                });
              }}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      };
    });
  }, [machines]);

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

export default MachinesTable;
