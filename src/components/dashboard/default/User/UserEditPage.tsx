/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Form, Input, message, Row, Select, Spin } from "antd";
import { FC, useEffect } from "react";
import useUser from "../../../../hooks/user/useUser.jsx";
import useAuth from "../../../../hooks/auth/useAuth.jsx";
import useStatics from "../../../../hooks/statics/useStatics.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { showErrors } from "../../../../errorHandler/errors.js";

const UserEditPage: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { getList, getDetail, detailLoading, update, detail } =
    useUser();
  const { getUserRoles, roles, rolesLoading, getClientStatus } = useStatics();
  const { user, getMe } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    getDetail(id);
  }, [id]);

  useEffect(() => {
    getUserRoles();
    getClientStatus();
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        fullName: detail?.fullName,
        phone: detail?.phone,
        login: detail?.login,
        role: detail?.role,
        // role: roles?.role?.find((item) => item.value === detail.role)?.label,
      });
    }
  }, [detail, form]);

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

  const handleFormSubmit = async() => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
    
      update(id, values).then((res) => {
        console.log(res);
        if (res.success) {
          getList({ page: 1, limit: 20 });
          message.success({ content: "Обновлено успешно" });
          form.resetFields();
          navigate(-1);
        } else {
          showErrors(res);
        }
      });
    });
  };

  const forms = [
    {
      label: "Имя и фамилия",
      name: "fullName",
      required: true,
      message: "Заполните",
      child: (
        <Input
          onChange={(e) => {
            form.setFieldValue("fullName", e.target.value);
          }}
        />
      ),
    },
    {
      label: "Логин",
      name: "login",
      required: true,
      message: "Заполните",
      child: (
        <Input
          minLength={8}
          maxLength={15}
          onChange={(e) => {
            form.setFieldValue("login", e.target.value);
          }}
        
        />
      ),
    },
    {
      label: "Пароль",
      name: "password",
      // required: true,
      message: "Заполните",
      child: (
        <Input
          minLength={6}
          maxLength={14}
          onChange={(e) => {
            form.setFieldValue("password", e.target.value);
          }}
        />
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
  ];

  return detailLoading ? (
    <Spin />
  ) :  (
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
              loading={detailLoading}
              disabled={detailLoading}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={detailLoading}
              disabled={detailLoading}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default UserEditPage;
