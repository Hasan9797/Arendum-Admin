import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import usePricing from "../../../../hooks/pricing/usePricing.jsx";
import { useNavigate } from "react-router-dom";
import { showErrors } from "../../../../errorHandler/errors.js";
const { Option } = Select;

interface Parameter {
  additionalParameters: [
    {
      parameterName: string;
      parameter: number;
      unit: string;
      type: string;
    },
  ];
  machineId: number;
  minAmount: string;
  minHourTime: string;
  tariffName: string;
}

const PricingCreatePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [calculationType, setCalculationType] = useState<string>("km");
  const { getMachines, machines, listLoading } = useMachines();
  const { getList, create } = usePricing();

  useEffect(() => {
    getMachines({ limit: 10, page: 1 });
  }, []);

  const onFinish = (values: Parameter) => {
    const formattedParameters = values.additionalParameters.map(
      (item, index) => {
        const initialType = ["waiting_time", "waiting_amount", "fine_payment"][
          index
        ];
        return {
          ...item,
          type: item.type || initialType || "another_type", // type ni saqlash yoki initialValue'dan olish
        };
      }
    );

    const finalData = {
      ...values,
      minHourTime: values?.minHourTime ? values.minHourTime : "",
      additionalParameters: formattedParameters, // Formatlangan ma'lumotlarni qo'shish
    };

    create(finalData).then((res) => {
      console.log(res);
      if (res.status === 201) {
        getList({ limit: 10, page: 1 });
        message.success({
          content: "Успешно создано",
        });
        form.resetFields();
        navigate(-1);
      } else {
        showErrors(res);
      }
    });
  };

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} style={{ marginBottom: "20px" }}>
        <Typography.Title>
          Добавление параметров ценообразования
        </Typography.Title>
        <Typography.Text>
          Добавление новый параметр ценообразования
        </Typography.Text>
      </Col>
      <Card>
        <Typography.Title level={2} style={{ marginTop: 0, color: "#3C8CDC" }}>
          Заполните данные
        </Typography.Title>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Укажите Название ценообразования"
            name="tariffName"
            rules={[
              { required: true, message: "Введите название ценообразования" },
            ]}
          >
            <Input placeholder="Название ценообразования" />
          </Form.Item>
          <Form.Item
            label="Укажите тип техники данного тарифа"
            name="machineId"
            rules={[{ required: true, message: "Выберите тип техники" }]}
          >
            <Select
              style={{ width: 200 }}
              showSearch
              allowClear
              loading={listLoading}
              disabled={listLoading}
              placeholder="Выберите категорию"
            >
              {machines.map((category) => (
                <Option key={category} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Тип расчета стоимости тарифа">
            <Radio.Group
              onChange={(e) => setCalculationType(e.target.value)}
              value={calculationType}
              optionType="button"
              buttonStyle="solid"
              style={{
                display: "flex",
              }}
            >
              <Radio.Button value="km">По километражу</Radio.Button>
              <Radio.Button value="hour">По часам</Radio.Button>
            </Radio.Group>
            <Space
              direction="vertical"
              style={{ marginTop: 15, width: "100%" }}
            >
              {calculationType === "km" && (
                <>
                  <Typography.Text
                    style={{ display: "block", maxWidth: "500px" }}
                  >
                    Базовая цена тарифа для аренды грузовиков и длинномеров. При
                    выборе тарифа, в форме заказа появляется поле второй точки
                    локации - место назначения груза.
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button type="default" disabled>
                        Стоимость 1
                      </Button>
                    </Col>
                    <Col>
                      <Form.Item
                        name="minAmount"
                        rules={[{ required: true, message: "Введите число" }]}
                      >
                        <Input type="number" placeholder="Укажите число" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button type="primary">UZS</Button>
                    </Col>
                  </Row>
                </>
              )}

              {calculationType === "hour" && (
                <>
                  <Typography.Text
                    style={{ display: "block", maxWidth: "500px" }}
                  >
                    Является базовой расчетной ценой тарифа, также для расчета
                    часа работы сверхзаказа используется этот же показатель
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button type="default" disabled>
                        Стоимость 1
                      </Button>
                    </Col>
                    <Col>
                      <Form.Item
                        name="minAmount"
                        rules={[{ required: true, message: "Введите число" }]}
                      >
                        <Input type="number" placeholder="Укажите число" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button type="primary">UZS</Button>
                    </Col>
                  </Row>
                  <Typography.Text
                    style={{ display: "block", maxWidth: "500px" }}
                  >
                    Указывается минимальное число часов для аренды техники,
                    которое, выводится на фронт умножая на расчетную цену часа
                  </Typography.Text>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button type="default" disabled>
                        Минимальное
                      </Button>
                    </Col>
                    <Col>
                      <Form.Item
                        name="minHourTime"
                        rules={[{ required: true, message: "Введите число" }]}
                      >
                        <Input placeholder="Укажите число" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button type="primary">ЧАС</Button>
                    </Col>
                  </Row>
                </>
              )}
            </Space>
          </Form.Item>
          <Form.List
            name="additionalParameters"
            initialValue={[
              {
                parameterName: "Бесплатные минуты ожидания",
                parameter: "",
                type: "waiting_time",
                unit: "MIN",
              },
              {
                parameterName: "Стоимость минуты ожидания",
                parameter: "",
                type: "waiting_amount",
                unit: "UZS",
              },
              {
                parameterName: "Штрафной платеж",
                parameter: "",
                type: "fine_payment",
                unit: "UZS",
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={[16, 16]} key={key}>
                    {/* Parameter Name Input */}
                    <Col style={{ width: "250px" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "parameterName"]}
                        rules={[
                          { required: true, message: "Введите значение" },
                        ]}
                      >
                        <Input placeholder="Название параметра" />
                      </Form.Item>
                    </Col>

                    {/* Parameter Value Input */}
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, "parameter"]}
                        rules={[
                          { required: true, message: "Введите значение" },
                        ]}
                      >
                        <Input type="number" placeholder="Значение" />
                      </Form.Item>
                    </Col>

                    {/* Unit Selection */}
                    <Col>
                      <Form.Item
                        {...restField}
                        name={[name, "unit"]}
                        rules={[{ required: true, message: "Введите единицу" }]}
                      >
                        <Select
                          placeholder="Ед.измерения"
                          style={{ width: "100%" }}
                        >
                          <Option value="MIN">МИН</Option>
                          <Option value="HOUR">ЧАС</Option>
                          <Option value="UZS">UZS</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Delete Button */}
                    <Col>
                      <Button onClick={() => remove(name)} danger>
                        <DeleteOutlined />
                      </Button>
                    </Col>
                  </Row>
                ))}
                {/* Add New Parameter Button */}
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default PricingCreatePage;
