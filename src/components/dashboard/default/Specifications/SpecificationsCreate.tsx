/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, message, Typography } from "antd";
import React, { useEffect } from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";
import { useNavigate } from "react-router-dom";
import { showErrors } from "../../../../errorHandler/errors.js";

const { Option } = Select;

// interface Parameter {
//   name: string;
//   unit: string;
//   value: string;
// }

const SpecificationsCreate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getMachines, machines, listLoading } = useMachines();
  const { getList, create, createLoading } = useSpecification();

  useEffect(() => {
    getMachines();
  }, []);

  const onFinish = (values: unknown) => {
    create(values).then((res) => {
      if (res.status === 201) {
        getList({ limit: 10, page: 1 });
        message.success({
          content: "Успешно создано",
        });
        form.resetFields();
        navigate(-1);
      } else {
        showErrors(res);
        console.log(res);
      }
    });
  };

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} style={{ marginBottom: "20px" }}>
        <Typography.Title>Добавление параметров спецтехнтки</Typography.Title>
        <Typography.Text>Добавление новый параметр спецтехнтки</Typography.Text>
      </Col>
      <Card>
        <Typography.Title level={2} style={{ marginTop: 0, color: "#3C8CDC" }}>
          Заполите данные
        </Typography.Title>

        <Form onFinish={onFinish} form={form} layout="vertical">
          <Space style={{ flexWrap: "wrap" }}>
            <Form.Item
              label="Название параметра (RU)"
              name="nameRu"
              rules={[
                { required: true, message: "Введите название параметра" },
              ]}
            >
              <Input
                style={{ width: "300px" }}
                placeholder="Название параметра"
              />
            </Form.Item>
            <Form.Item
              label="Название параметра (UZ)"
              name="nameUz"
              rules={[
                { required: true, message: "Введите название параметра" },
              ]}
            >
              <Input
                style={{ width: "300px" }}
                placeholder="Название параметра"
              />
            </Form.Item>
            <Form.Item
              label="Единицы измерения"
              name="name"
              rules={[
                { required: true, message: "Выберите единицу измерения" },
              ]}
            >
              <Select
                style={{ width: "200px" }}
                placeholder="Единицы измерения"
                allowClear
              >
                <Option value="kg">кг</Option>
                <Option value="t">т</Option>
                <Option value="m">м</Option>
                <Option value="km">км</Option>
                <Option value="yes">Эсть</Option>
                <Option value="no">Нет</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.List name="params">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "param"]}
                      rules={[{ required: true, message: "Введите значение" }]}
                    >
                      <Input placeholder="Значение" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "amount"]}
                      rules={[{ required: true, message: "Введите сумма" }]}
                    >
                      <Input placeholder="Сумма" type="number" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Добавить ещё
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            label="Связать со следующими категориями"
            rules={[{ required: true, message: "Введите выберите категорию" }]}
            name="machineId"
          >
            <Select
              showSearch
              allowClear
              style={{ width: 200 }}
              placeholder="Выберите категорию"
              loading={listLoading}
              disabled={listLoading}
              filterOption={(inputValue, option: { label: string }) =>
                option?.label
                  ?.toLowerCase()
                  .indexOf(inputValue.toLowerCase()) >= 0
              }
              options={
                machines &&
                machines?.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "end" }}>
            <Button
              type="primary"
              htmlType="button"
              style={{ marginRight: "10px" }}
              loading={createLoading}
              disabled={createLoading}
              onClick={() => {
                navigate(-1);
                form.resetFields();
              }}
              danger
            >
              Cencel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createLoading}
              disabled={createLoading}
            >
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SpecificationsCreate;
