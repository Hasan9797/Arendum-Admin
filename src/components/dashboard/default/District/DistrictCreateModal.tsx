import { Form, Input, message, Modal, Select } from "antd";
import { FC, useEffect } from "react";
import useStructure from "../../../../hooks/structure/useStructure";
import useRegion from "../../../../hooks/region/useRegion";
import { showErrors } from "../../../../errorHandler/errors";

interface DistrictCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const DistrictCreateModal: FC<DistrictCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { createLoading, create, getStructure } = useStructure();
  const { regions, getRegions, listLoading } = useRegion();
  console.log(regions);
  useEffect(() => {
    getRegions();
  }, []);

  const forms = [
    {
      label: "Регион проживания",
      name: "regionId",
      required: true,
      message: "Выберите регион",
      child: (
        <Select
          showSearch
          allowClear
          loading={listLoading}
          disabled={listLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            regions &&
            regions?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            })
          }
        />
      ),
    },
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
            if (res) {
              getStructure({ limit: 10, page: 1 });
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

export default DistrictCreateModal;
