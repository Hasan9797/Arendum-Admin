import { Form, Input, message, Modal } from "antd";
import { FC } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import { showErrors } from "../../../../errorHandler/errors";

interface RegionCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const RegionCreateModal: FC<RegionCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { createLoading, create, getRegions } = useRegion();

  const forms = [
    {
      label: "Имя ( RU )",
      name: "nameRu",
      required: true,
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("nameRu", e.target.value)} />
      ),
    },
    {
      label: "Имя ( UZ )",
      name: "nameUz",
      required: true,
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("nameUz", e.target.value)} />
      ),
    },
  ];

  return (
    <Modal
      title="Создать регион"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          const allValues = { ...values, name: "aaa" };
          create(allValues).then((res) => {
            console.log(res);
            if (res.success) {
              getRegions({ limit: 10, page: 1 });
              onSuccessFields && onSuccessFields();
              message.success({
                content: "Успешно создано",
              });
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
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      centered
    >
      <Form form={form} layout="vertical">
        {forms.map((item, idx) => (
          <Form.Item
            key={idx}
            label={item.label}
            name={item.name}
            rules={[{ required: item.required, message: item.message }]}
          >
            {item.child}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default RegionCreateModal;
