/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { FC, useEffect, useState } from "react";
import useUser from "../../../../hooks/user/useUser.jsx";
import { copyText } from "../../../../utils/index";
import { CopyOutlined } from "@ant-design/icons";
import MainButton from "../../../MainButton/MainButton.js";
import useAuth from "../../../../hooks/auth/useAuth.jsx";
import useStatics from "../../../../hooks/statics/useStatics.jsx";
import { generatePassword } from "../../../../utils/index";
import { useNavigate } from "react-router-dom";
import { showErrors } from "../../../../errorHandler/errors.js";

const UserCreatePage: FC = () => {
  const [form] = Form.useForm();
  const { createLoading, create, getList } = useUser();
  const { getUserRoles, roles, rolesLoading, getClientStatus } = useStatics();
  const { user, getMe } = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUserRoles();
    getClientStatus();
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleFormSubmit = (values) => {
    create(values).then((res) => {
      if (res.success) {
        getList({ limit: 10, page: 1 });
        message.success({
          content: "Успешно создано",
        });
        form.resetFields();
        navigate(-1);
      } else {
        showErrors(res.message);
      }
    });
  };

  const forms = [
    {
      label: "Имя и фамилия",
      name: "fullName",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            onChange={(e) => {
              form.setFieldValue("fullName", e.target.value);
            }}
          />
        </div>
      ),
    },
    {
      label: "Логин",
      name: "login",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            minLength={8}
            maxLength={15}
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              form.setFieldValue("login", e.target.value);
            }}
            suffix={
              <CopyOutlined
                onClick={() => copyText(login)}
                style={{ cursor: "pointer" }}
              />
            }
          />
        </div>
      ),
    },
    {
      label: "Пароль",
      name: "password",
      required: true,
      message: "Заполните",
      child: (
        <div>
          <Input
            minLength={6}
            maxLength={14}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              form.setFieldValue("password", e.target.value);
            }}
            suffix={
              <CopyOutlined
                onClick={() => copyText(password)}
                style={{ cursor: "pointer" }}
              />
            }
          />
          <MainButton
            onClick={() => generatePassword(setPassword, form)}
            type="primary"
            buttonText="Создать пароль"
            className="w-100"
            style={{ marginTop: "1rem" }}
          />
        </div>
      ),
    },
    {
      label: "Номер телефона",
      name: "phone",
      required: true,
      message: "Введите номер телефона",
      child: (
        <Input
          type="tel"
          onChange={(e) => form.setFieldValue("phone", e.target.value)}
        />
      ),
    },
    {
      label: "Роль",
      name: "role",
      required: true,
      message: "Заполните",
      child: (
        <Select
          showSearch
          allowClear
          loading={rolesLoading}
          disabled={rolesLoading}
          filterOption={(
            inputValue,
            option: { label: string; value: string }
          ) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={filterRoles?.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          onChange={(e) => {
            form.setFieldValue("role", e);
          }}
        />
      ),
    },
    // {
    //   label: "Регион",
    //   name: "region",
    //   required: true,
    //   message: "Заполните",
    //   child: (
    //     <Select
    //       showSearch
    //       allowClear
    //       loading={createLoading}
    //       disabled={createLoading}
    //       filterOption={(inputValue, option: { label: string }) =>
    //         option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
    //       }
    //       options={
    //         regions &&
    //         regions?.map((item) => {
    //           return {
    //             value: item.id,
    //             label: item.regionNameRU,
    //           };
    //         })
    //       }
    //       onChange={(e) => {
    //         setSelectedRegion(e);
    //       }}
    //     />
    //   ),
    // },
    // {
    //   label: "Доступы",
    //   name: "permissions",
    //   required: true,
    //   message: "Заполните",
    //   child: (
    //     <TreeSelect
    //       showSearch
    //       style={{ width: "100%" }}
    //       value={value}
    //       dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
    //       placeholder="Please select"
    //       allowClear
    //       multiple
    //       disabled={createLoading}
    //       treeDefaultExpandAll
    //       onChange={onChange}
    //       treeData={
    //         permissions
    //           ? filteredPermissions.length > 0 &&
    //             filteredPermissions.map((permission) => ({
    //               title: permission?.name.toUpperCase(),
    //               value: permission.name,
    //             }))
    //           : ""
    //       }
    //     />
    //   ),
    // },
  ];

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        {forms.map((item, index) => (
          <Form.Item
            key={index}
            label={item.label}
            name={item.name}
            rules={[{ required: item.required, message: item.message }]}
          >
            {item.child}
          </Form.Item>
        ))}
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button
              onClick={() => {
                form.resetFields();
                navigate(-1);
              }}
              danger
              loading={createLoading}
              disabled={createLoading}
            >
              Отменить
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={createLoading}
              disabled={createLoading}
            >
              Подтвердить
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default UserCreatePage;
