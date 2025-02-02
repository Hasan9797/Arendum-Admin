/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const SpecificationsTable = () => {
  const navigate = useNavigate();

  const { getList, specifications, listLoading, remove, removeLoading } =
    useSpecification();
  // const { machines, getMachines } = useMachines();

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
  }, []);

  console.log(specifications);

  const columns = [
    {
      title: "Название параметра",
      // dataIndex: "nameRu",
      width: "20%",
      key: "nameRu",
      render: (parametr) => (
        <p>{`${parametr?.name} (${parametr?.prefix?.toUpperCase()})`}</p>
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
              ${parametres?.prefix}`}
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
      dataIndex: "machine",
      width: "20%",
      key: "machineId",
      render: (machine) => {
        return <div>{machine.name}</div>;
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
            {/* <Button onClick={() => {}} icon={<EyeOutlined />} /> */}
            <Button
              onClick={() => {
                navigate(`/dashboards/specifications/${item?.id}`);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
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
