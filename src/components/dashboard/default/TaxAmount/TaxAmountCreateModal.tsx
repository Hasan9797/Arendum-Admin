import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import { FC } from "react";
import useTaxAmount from "../../../../hooks/taxAmount/useTaxAmount";
import { showErrors } from "../../../../errorHandler/errors";
const { Option } = Select;

interface TaxAmountCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const TaxAmountCreateModal: FC<TaxAmountCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { createLoading, create, getTaxAmounts } = useTaxAmount();

  return (
    <Modal
      title="Создать налога"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          const allValues = {
            ...values,
            ndsPercentage: values?.ndsPercentage === 'UZS' ? false : true,
            arendumPercentage: values?.arendumPercentage ==='UZS' ? false : true,
          }
          create(allValues).then((res) => {
            if (res.success) {
              getTaxAmounts({ limit: 10, page: 1 });
              onSuccessFields && onSuccessFields();
              message.success({ content: "Успешно создано" });
              form.resetFields();
            } else {
              showErrors(res.message);
            }
          });
        });
      }}
      okText="Сохранить"
      okButtonProps={{ loading: createLoading, disabled: createLoading }}
      cancelText="Закрыть"
      width={600}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      centered
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]} style={{marginTop:'30px'}}>
          <Col style={{ width: "250px" }}>
            <Input disabled value="Минимальный баланс водителя" style={{ color: "black" }} />
          </Col>
          <Col>
            <Form.Item
              name="driverBalance"
              rules={[{ required: true, message: "Введите значение" }]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                return value ? Number(value) : null; // Convert to number
              }}
            >
              <Input type="number" placeholder="Значение" />
            </Form.Item>
          </Col>
          <Col style={{ width: "95px" }}>
            <Input disabled value="UZS" style={{ color: "black" }} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col style={{ width: "250px" }}>
            <Input disabled value="Плата за обслуживание" style={{ color: "black" }} />
          </Col>
          <Col>
            <Form.Item
              name="arendumAmount"
              rules={[{ required: true, message: "Введите значение" }]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                return value ? Number(value) : null; // Convert to number
              }}
            >
              <Input type="number" placeholder="Значение" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="arendumPercentage"
              initialValue="Percent"
              rules={[{ required: true, message: "Выберите единицу" }]}
            >
              <Select placeholder="Ед.измерения" style={{ width: "80px" }}>
                <Option value="UZS">UZS</Option>
                <Option value="Percent">%</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col style={{ width: "250px" }}>
            <Input disabled value="НДС налог" style={{ color: "black" }} />
          </Col>
          <Col>
            <Form.Item
              name="ndsAmount"
              rules={[{ required: true, message: "Введите значение" }]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                return value ? Number(value) : null; // Convert to number
              }}
            >
              <Input type="number" placeholder="Значение" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="ndsPercentage"
              initialValue="Percent"
              rules={[{ required: true, message: "Выберите единицу" }]}
             
            >
              <Select placeholder="Ед.измерения" style={{ width: "80px" }}>
                <Option value="UZS">UZS</Option>
                <Option value="Percent">%</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TaxAmountCreateModal;