/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
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
import { useEffect } from "react";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import usePricing from "../../../../hooks/pricing/usePricing.jsx";
import useAuth from "../../../../hooks/auth/useAuth.jsx";

const PricingTable = () => {
  // const { getList, specifications, listLoading, remove, removeLoading } =
  //   useSpecification();
  const { machines, getMachines } = useMachines();
  const {
    pricing,
    getList,
    listLoading,
    remove,
    removeLoading,
    update,
    updateLoading,
  } = usePricing();
  const { getMe, user } = useAuth();

  // const [detailId, setDetailId] = useState(null);
  const [params] = useState({
    page: 1,
    limit: 20,
    filters: [],
  });

  // const filter = () => {
  //   const newParams = { ...params };
  //   newParams["page"] = 1;
  //   setParams(newParams);
  //   getList(newParams);
  // };

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

  useEffect(() => {
    getList(params);
    getMachines(params);
    getMe();
  }, []);

  const columns = [
    {
      title: "Связь с категорией",
      // dataIndex: "machineId",
      width: "10%",
      key: "machineId",
      render: ({ machineId }) => {
        return (
          <div>
            {machines.length &&
              machines?.find((machine) => machine.id === machineId)?.name}
          </div>
        );
      },
    },
    {
      title: "Составляюшие ценоброзования",
      width: "20%",
      key: "params",
      // dataIndex: "params",
      render: (parametres) => {
        if (parametres && Array.isArray(parametres.machinePriceParams)) {
          return parametres.machinePriceParams.map((param, index) => (
            <Badge
              style={{ marginRight: "3px" }}
              key={index}
              count={`
                ${param.parameterName} - ${param.parameter}   ${param.unit}`}
              showZero
              color="blue"
            />
          ));
        }
        return "No parameters available";
      },
    },
    {
      title: "Статус",
      width: "15%",
      dataIndex: "status",
      key: "status",
    },
    {
      // title: "Составляюшие ценоброзования",
      width: "30%",
      key: "params",
      // dataIndex: "params",
      render: (parametres) => {
        if (parametres && parametres.minHourTime) {
          return (
            <>
              <Typography.Title
                level={5}
                style={{ color: "blue", margin: "0" }}
              >
                Минималное сумма
                <strong style={{ color: "red" }}>
                  {" "}
                  {parametres.minAmount}
                </strong>{" "}
                UZS
              </Typography.Title>
              <Typography.Title
                level={5}
                style={{ color: "blue", margin: "0" }}
              >
                Минималное кол-во часов аренды
                <strong style={{ color: "red" }}>
                  {" "}
                  {parametres.minHourTime}{" "}
                </strong>
                ЧАС
              </Typography.Title>
            </>
          );
        }
        return (
          <Typography.Title level={5} style={{ color: "blue", margin: "0" }}>
            Минималное сумма
            <strong style={{ color: "red" }}>
              {" "}
              {parametres.minAmount}
            </strong>{" "}
            UZS
          </Typography.Title>
        );
      },
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
    return pricing?.map((item) => {
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            <Button
              onClick={() => {
                // setDetailId(item?.id);
              }}
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() => {
                // setDetailId(item?.id);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
              onOpenChange={(open) => {
                if (open) {
                  // setDetailId(item?.id);
                } else {
                  // setDetailId(null);
                }
              }}
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
              disabled={updateLoading||user?.role ===3}
              onChange={(cheched) => handleStatusChange(cheched, item.id)}
            />
          </Space>
        ),
      };
    });
  }, [pricing]);

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
    </>
  );
};

export default PricingTable;
