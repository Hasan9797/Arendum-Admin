/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import RegionDetailModal from "./RegionDetailModal";
import RegionEditModal from "./RegionEditModal";
import { useEffect } from "react";
import dayjs from "dayjs";

const RegionTable = () => {
  const { regions, getRegions, remove, listLoading } = useRegion();
  console.log(regions);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    getRegions({ page: 1, limit: 10 });
  }, []);

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      width: "30%",
      key: "name",
    },
    // {
    //   title: "Имя (UZ)",
    //   dataIndex: "nameUz",
    //   width: "30%",
    //   key: "name",
    // },
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
                remove(item?.id).then(() => {
                  message.success("Успешно удалено");
                  getRegions();
                });
              }}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
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
