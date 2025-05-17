/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Space, Table, Typography } from "antd";
import { EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import useDeposit from "../../../../hooks/deposit/useDeposit";
import { useNavigate } from "react-router-dom";

const DepositTable = () => {
  const navigate = useNavigate();
  const { deposits, getList, pagination, listLoading } = useDeposit();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    getList(params);
  }, []);
  console.log(deposits);
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
        return item?.client ? (
          <Typography.Text>{`${item?.client?.fullName} (User)`}</Typography.Text>
        ) : item?.driver ? (
          <Typography.Text>{`${item?.driver?.fullName} (Driver)`}</Typography.Text>
        ) : (
          <Typography.Title level={5}>Odammas😩</Typography.Title>
        );
      },
    },
    {
      title: "Баланс счета",
      dataIndex: "amount",
      width: "20%",
      key: "amount",
      render: (amount) => (
        <Typography.Text>{formatBalance(amount)}</Typography.Text>
      ),
    },

    {
      title: "Currency",
      dataIndex: "currency",
      width: "20%",
      key: "currency",
    },
    {
      title: "PartnerId",
      dataIndex: "partnerId",
      width: "20%",
      key: "partnerId",
    },
    {
      title: "Card ID",
      dataIndex: "cardId",
      width: "20%",
      key: "cardId",
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
      title: "Дата обновления",
      dataIndex: "updatedAt",
      width: "20%",
      key: "updatedAt",
      render: (updatedAt) => dayjs(updatedAt).format("DD-MM-YYYY  HH:mm:ss"),
    },
    {
      title: "",
      width: "160px",
      dataIndex: "others",
      key: "others",
    },
  ];
  const data = useMemo(() => {
    return deposits?.map((item) => {
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            <Button
              onClick={() => {
                navigate(`/dashboards/deposit/${item?.id}`);
              }}
              icon={<EyeOutlined />}
            />
          </Space>
        ),
      };
    });
  }, [deposits]);

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
    </>
  );
};

export default DepositTable;
