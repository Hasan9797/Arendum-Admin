/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Popconfirm,
  Space,
  Switch,
  Table,
  Typography,
  message,
} from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import UserBalanceDetailModal from "./UserBalanceDetailModal";
import UserBalanceEditModal from "./UserBalanceEditModal";
import { useEffect } from "react";
import dayjs from "dayjs";
import useUserBalance from "../../../../hooks/userBalance/useUserBalance";
import useAuth from "../../../../hooks/auth/useAuth.jsx";

const UserBalanceTable = () => {
  const {
    userBalances,
    getList,
    update,
    updateLoading,
    pagination,
    listLoading,
  } = useUserBalance();
  const { getMe, user } = useAuth();

  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    getList(params);
    getMe();
  }, []);

  const formatBalance = (balance) => {
    if (!balance && balance !== 0) return "-"; // Agar balans null yoki undefined bo‘lsa
    return Number(balance)
      .toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/,/g, " "); // Vergulni bo‘sh joyga almashtiramiz
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "driver",
      width: "30%",
      key: "driver",
      render: (_, item) => {
        if (item?.client) {
          return (
            <Typography.Text>{`${item?.client?.fullName} (User)`}</Typography.Text>
          );
        } else if (item?.driver) {
          return (
            <Typography.Text>{`${item?.driver?.fullName} (Driver)`}</Typography.Text>
          );
        } else {
          return <Typography.Title level={5}>Odammas😩</Typography.Title>;
        }
      },
    },
    {
      title: "Баланс счета",
      dataIndex: "balance",
      width: "20%",
      key: "balance",
      render: (balance) => (
        <Typography.Text>{formatBalance(balance)}</Typography.Text>
      ), // Formatlash
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      width: "20%",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY  HH:mm:ss"),
    },
    {
      title: "Дата обновления",
      dataIndex: "updatedAt",
      width: "20%",
      key: "updatedAt",
      render: (updatedAt) => dayjs(updatedAt).format("DD-MM-YYYY  HH:mm:ss"),
    },
    ...(user?.role !== 3
      ? [
          {
            title: "",
            width: "20%",
            dataIndex: "others",
            key: "others",
          },
        ]
      : []),
  ];
  const data = useMemo(() => {
    return userBalances?.map((item) => {
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            {/* <Button
              onClick={() => {
                // if (item?.clientId) {
                setDetailModal(true);
                setDetailId(item?.id);
                // }
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
          </Space>
        ),
      };
    });
  }, [userBalances]);

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
      <UserBalanceDetailModal
        open={detailModal}
        onCancel={() => {
          setDetailModal(false);
          setDetailId(null);
        }}
        id={detailId}
      />
      <UserBalanceEditModal
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

export default UserBalanceTable;
