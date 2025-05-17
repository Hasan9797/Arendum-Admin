/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { DeleteOutlined,  FormOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  addFilter,
  getDateTime,
  setColorFromRole,
} from "../../../../utils";
import TableTitle from "../../../TableTitle/TableTitle";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../hooks/user/useUser";
import useStatics from "../../../../hooks/statics/useStatics";
import useAuth from "../../../../hooks/auth/useAuth.jsx";

const UserTable = () => {
  const { users, getList,getId,listLoading,pagination,update,updateLoading,remove, } = useUser();
  const { activateStatus, getActivateStatus, statusLoading } = useStatics();
 const { getUserRoles, roles, rolesLoading } = useStatics();
 const { user, getMe } = useAuth();

  // const { user } = useAuth();
  // console.log(users);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
  });
  const navigate = useNavigate();

  const filter = () => {
    const newParams = { ...params };
    newParams["page"] = 1;
    setParams(newParams);
    getList(newParams);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      filter();
    }
  };

  useEffect(() => {
    getList(params);
    getActivateStatus()
    getUserRoles();
    getMe();
  }, [params]);

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
    const userRole = roles
    ? roles?.role?.find((role) => role.value === user.role)
    : {};

    const filterRoles =
    userRole?.value == 2
      ? roles?.role?.filter(
          (role) => role.label !== "Client" && role.label !== "Driver"
        )
      : roles?.role?.filter(
          (role) =>
            role.label !== "Client" &&
            role.label !== "Driver" &&
            role.label !== "Super Admin"
        );
  const columns = [
    {
      title: "Ид номер",
      width: "2%",
      children: [
        {
          title: (
            <Input
            width={10}
              onChange={(e) => addFilter(setParams, "id", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "id",
          key: "id",
        },
      ],
    },
    {
      title: "Ф.И.О",
      width: "20%",
      children: [
        {
          title: (
            <Input
              onChange={(e) => addFilter(setParams, "fullName", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "fullName",
          key: "fullName",
        },
      ],
    },
    {
      title: "Номер телефона",
      width: "15%",
      children: [
        {
          title: (
            <Input
              type="tel"
              onChange={(e) => addFilter(setParams, "phone", e.target.value)}
              onKeyPress={onKeyPress}
            />
          ),
          dataIndex: "phone",
          key: "phone",
        },
      ],
    },
    {
      title: "Роль",
      width: "100px",
      children: [
        {
          title: (
            <Select
            className="w-100"
            showSearch
            allowClear
            loading={rolesLoading}
            disabled={rolesLoading}
            filterOption={(inputValue, option) =>
              option?.label
                ?.toUpperCase()
                .indexOf(inputValue.toUpperCase()) >= 0
            }
            options={
            filterRoles &&
            filterRoles.map((role) => ({
                value: role.value,
                label: role.label,
              }))
            }
            onChange={(value) =>
              addFilter(setParams, "role", value, "equals")
            }
          />
          ),
          dataIndex: ["roleColumn", "string"],
          key: "roleColumn",
        },
      ],
    },
    {
      title: "Статус",
      width: "10%",
      children: [
        {
          title: (
            <Select
            className="w-100"
            showSearch
            allowClear
            loading={statusLoading}
            disabled={statusLoading}
            filterOption={(inputValue, option) =>
              option?.label
                ?.toUpperCase()
                .indexOf(inputValue.toUpperCase()) >= 0
            }
            options={
              activateStatus &&
              activateStatus.map((status) => ({
                value: status.value,
                label: status.label,
              }))
            }
            onChange={(value) =>
              addFilter(setParams, "status", value, "equals")
            }
          />
          ),
          dataIndex: "status",
          key: "status",
        },
      ],
    },
    {
      title: "Дата регистрации",
      width: "15%",
      children: [
        {
          title: (
            <DatePicker.RangePicker
              onChange={(e, v) =>
                addFilter(
                  setParams,
                  "createdAt",
                  getDateTime(e, v),
                  "between"
                )
              }
            />
          ),
          dataIndex: "createdAt",
          key: "createdAt",
          render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY HH:mm:ss"),
        },
      ],
    },
    {
      title: "",
      width: "160px",
      dataIndex: "others",
      key: "others",
    },
  ];
  const data = useMemo(() => {
    return users?.map((item) => {
      const intemRole = filterRoles?.find((role)=>role?.value === item?.role)
      return {
        ...item,
        key: item?.id,
        roleColumn: {
          int: item?.role,
          string: (
            <>
              <Tag key={item?.role} color={setColorFromRole(item?.role)}>
              {intemRole?.label}
              </Tag>
            </>
          ),
        },
        others: (
          <Space>
            {/* <Button
              onClick={() => {
                navigate(`/dashboards/driver/${item?.id}/detail`);
              }}
              icon={<EyeOutlined />}
            /> */}
            <Button
              onClick={() => {
                navigate(`/dashboards/user/${item?.id}`);
                getId(item?.id);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
              placement="topLeft"
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
  }, [users]);

  return  (
    <>
      <Table
        className="card"
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data}
        title={() => (
          <TableTitle>
            <Button type="primary" onClick={() => window.location.reload()}>
              Очистить
            </Button>
            <Button type="primary" onClick={filter}>
              Искать
            </Button>
          </TableTitle>
        )}
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

export default UserTable;
