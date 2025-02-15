/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSpecifications from "../../../../hooks/specifications/useSpecification.jsx";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import { showErrors } from "../../../../errorHandler/errors.js";

const { Option } = Select;

const SpecificationsEdit: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { getDetail, detail, getList, update, updateLoading, detailLoading } =
    useSpecifications();
  const { getMachines, machines, listLoading } = useMachines();

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (id) {
      getDetail(id);
      getMachines();
    }
  }, [id]);

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        nameRu: detail.name,
        nameUz: detail.nameUz,
        nameEn: detail.nameEn,
        prefix: detail.prefix,
        machineId: detail.machine?.id || 4,
        params: detail.params || [],
      });
    }
  }, [detail, form]);

  const handleFormChange = (allValues) => {
    const isEqual = JSON.stringify(allValues) === JSON.stringify(detail);
    setIsFormChanged(!isEqual);
  };

  const handleFormCancel = () => {
    form.resetFields();
    navigate("/dashboards/specifications");
  };

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      update(id, values).then((res) => {
        if (res.success) {
          getList({ page: 1, limit: 20 });
          message.success({ content: "Обновлено успешно" });
          form.resetFields();
          navigate("/dashboards/specifications");
        } else {
          showErrors(res);
        }
      });
    });
  };

  return detailLoading ? (
    <Spin />
  ) : (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
        onFinish={onSave}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Название параметра (RU)"
              name="nameRu"
              rules={[{ required: true }]}
            >
              <Input placeholder="Название параметра" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Название параметра (UZ)"
              name="nameUz"
              rules={[{ required: true }]}
            >
              <Input placeholder="Название параметра" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Название параметра (EN)"
              name="nameEn"
              rules={[{ required: true }]}
            >
              <Input placeholder="Название параметра" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Единицы измерения"
              name="prefix"
              rules={[{ required: true }]}
            >
              <Select placeholder="Выберите единицу">
                <Option value="kg">кг</Option>
                <Option value="t">т</Option>
                <Option value="m">м</Option>
                <Option value="km">км</Option>
                <Option value="m3">m3</Option>
                {/* <Option value="yes">Эсть</Option> */}
                {/* <Option value="no">Нет</Option> */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

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
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Значение" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "amount"]}
                    rules={[{ required: true }]}
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
          name="machineId"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Выберите категорию"
            loading={listLoading}
            disabled={listLoading}
          >
            {machines?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button onClick={handleFormCancel} danger>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormChanged || updateLoading}
            >
              Сохранить
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SpecificationsEdit;
