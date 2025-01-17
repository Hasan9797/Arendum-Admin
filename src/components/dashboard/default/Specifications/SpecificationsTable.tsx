/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";
import useMachines from "../../../../hooks/machines/useMachines";
import dayjs from "dayjs";

const SpecificationsTable = () => {
  const { getList, specifications, listLoading, remove, removeLoading } =
    useSpecification();
  const { machines, getMachines } = useMachines();

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

  useEffect(() => {
    getList(params);
    getMachines(params);
  }, []);

  const columns = [
    {
      title: "Название параметра",
      // dataIndex: "nameRu",
      width: "20%",
      key: "nameRu",
      render: (parametr) => (
        <p>{`${parametr?.nameRu} (${parametr?.name.toUpperCase()})`}</p>
      ),
    },
    {
      title: "Значение",
      width: "40%",
      key: "params",
      // dataIndex: "params",
      render: (parametres) => {
        if (parametres && Array.isArray(parametres.params)) {
          return parametres.params.map((param, index) => (
            <Badge
              style={{ marginRight: "3px" }}
              key={index}
              count={`${param.param}
              ${parametres.name}`}
              showZero
              color="blue"
            />
          ));
        }
        return "No parameters available";
      },
    },

    {
      title: "Связь с категорией",
      // dataIndex: "machineId",
      width: "20%",
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
      title: "Дата создания",
      dataIndex: "createdAt",
      width: "30%",
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
    return specifications?.map((item) => {
      return {
        ...item,
        key: item.id,
        others: (
          <Space>
            <Button onClick={() => {}} icon={<EyeOutlined />} />
            <Button onClick={() => {}} icon={<FormOutlined />} />
            <Popconfirm
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
              // onOpenChange={(open) => {
              //   if (open) {
              //   } else {
              //   }
              // }}
              onConfirm={() => {
                remove(item?.id).then(() => {
                  message.success("Успешно удалено");
                  getList(params);
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
        pagination={false}
      />
    </>
  );
};

export default SpecificationsTable;
