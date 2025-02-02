/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import useParamsFilter from "../../../../hooks/paramsFilter/useParamsFilter.jsx";
import dayjs from "dayjs";

const ParamsFilterTable = () => {
  const { filteredList, listLoading, getList, remove, removeLoading } =
    useParamsFilter();

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
    // {
    //   title: "Название параметра",
    //   // dataIndex: "nameRu",
    //   width: "20%",
    //   key: "nameRu",
    //   render: (parametr) => (
    //     <p>{`${parametr?.nameRu} (${parametr?.name.toUpperCase()})`}</p>
    //   ),
    // },
    // {
    //   title: "Значение",
    //   width: "40%",
    //   key: "params",
    //   // dataIndex: "params",
    //   render: (parametres) => {
    //     if (parametres && Array.isArray(parametres.params)) {
    //       return parametres.params.map((param, index) => (
    //         <Badge
    //           style={{ marginRight: "3px" }}
    //           key={index}
    //           count={`${param.param}
    //            ${parametres.name}`}
    //           showZero
    //           color="blue"
    //         />
    //       ));
    //     }
    //     return "No parameters available";
    //   },
    // },

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
      render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "",
      width: "20%",
      dataIndex: "others",
      key: "others",
    },
  ];
  const data = useMemo(() => {
    return filteredList?.map((item) => {
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
  }, [filteredList]);

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

export default ParamsFilterTable;
