/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Space, Switch, Table, message } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useMachines from "../../../../hooks/machines/useMachines";
import RegionDetailModal from "./MachinesDetailModal";
import RegionEditModal from "./MachinesEditModal";
import { useEffect } from "react";
import dayjs from "dayjs";

const MachinesTable = () => {
  const {
    machines,
    getMachines,
    pagination,
    remove,
    listLoading,
    update,
    updateLoading,
  } = useMachines();

  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
  });

  const handleStatusChange = async (checked, id) => {
    const newStatus = checked ? 2 : 1;
    try {
      await update(id, {
        status: newStatus,
      });
      await getMachines(params);
    } catch (error) {
      message.error("Statusni o'zgartirishda xatolik:", error);
    }
  };

  useEffect(() => {
    getMachines(params);
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
      title: "Status",
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
      width: "10%",
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
            {/* <Button
              onClick={() => {
                setDetailModal(true);
                setDetailId(item?.id);
              }}
              icon={<EyeOutlined />}
            /> */}
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
  }, [machines]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={data}
        loading={listLoading}
        pagination={{
          onChange: (page, pageSize) => {
            const newParams = { ...params };
            newParams.page = page;
            newParams.limit = pageSize;
            setParams(newParams);
            getMachines(newParams);
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
