import { Button, Form, Input, message, Modal, Radio, Select, Upload } from "antd";
import { FC, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { equipmentTypes, regions } from "./../../../../constants/index";
import useDrivers from "../../../../hooks/drivers/useDrivers.jsx";
import { showErrors } from "../../../../errorHandler/errors.js";

interface DriversCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const DriversCreateModal: FC<DriversCreateModalProps> = ({
  open,
  onCancel,
  onSuccessFields,
}) => {
  const [form] = Form.useForm();

  const { create, createLoading, getDrivers } = useDrivers();

  const [isLegalPerson, setIsLegalPerson] = useState(false);

  const forms = [
    {
      label: "Ваше ФИО",
      name: "fullName",
      required: true,
      message: "Введите ФИО или название организации",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("fullName", e.target.value)}
        />
      ),
    },
    {
      label: "Тип вашей спецтехники",
      name: "equipmentType",
      required: true,
      message: "Введите тип спецтехники",
      child: (
        <Select
          showSearch
          allowClear
          loading={createLoading}
          disabled={createLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            equipmentTypes &&
            equipmentTypes?.map((item) => {
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
      label: "Марка и модель вашего авто",
      name: "equipmentNumber",
      required: true,
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) =>
            form.setFieldValue("equipmentNumber", e.target.value)
          }
        />
      ),
    },
    {
      label: "Гос.номер авто",
      name: "equipmentNumber",
      required: true,
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) =>
            form.setFieldValue("equipmentNumber", e.target.value)
          }
        />
      ),
    },
    {
      label: "Цвет авто",
      name: "equipmentNumber",
      required: true,
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) =>
            form.setFieldValue("equipmentNumber", e.target.value)
          }
        />
      ),
    },
    {
      label: "Номер телефона",
      name: "phoneNumber",
      required: true,
      message: "Введите номер телефона",
      child: (
        <Input
          type="tel"
          onChange={(e) => form.setFieldValue("phoneNumber", e.target.value)}
        />
      ),
    },
    {
      label: "Тип пользователя",
      name: "userType",
      required: true,
      message: "Выберите тип пользователя",
      child: (
        <Radio.Group
          onChange={(e) => setIsLegalPerson(e.target.value === "legal")}
        >
          <Radio value="legal">Юридическое лицо</Radio>
          <Radio value="physical">Физическое лицо</Radio>
        </Radio.Group>
      ),
    },
    ...(isLegalPerson
      ? [
          {
            label: "ФИО / Название организации",
            name: "merchantInn",
            required: true,
            message: "Введите ИФИО / Название организации",
            child: (
              <Input
                onChange={(e) =>
                  form.setFieldValue("merchantInn", e.target.value)
                }
              />
            ),
          },
        ]
      : []),
    ...(isLegalPerson
      ? [
          {
            label: "ИНН Мерчанта",
            name: "merchantInn",
            required: true,
            message: "Введите ИНН Мерчанта",
            child: (
              <Input
                onChange={(e) =>
                  form.setFieldValue("merchantInn", e.target.value)
                }
              />
            ),
          },
        ]
      : []),
    {
      label: "Электронная почта",
      name: "email",
      required: false,
      message: "Введите электронную почту",
      child: (
        <Input
          type="email"
          onChange={(e) => form.setFieldValue("email", e.target.value)}
        />
      ),
    },
    {
      label: "Регион проживания",
      name: "regionId",
      required: true,
      message: "Выберите регион",
      child: (
        <Select
          showSearch
          allowClear
          loading={createLoading}
          disabled={createLoading}
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
      label: "Фото водительского удостоверения (сзади и спереди)",
      name: "licensePhoto",
      required: true,
      message: "Загрузите фото водительского удостоверения",
      child: (
        <Upload
          beforeUpload={() => false}
          onChange={(info) => form.setFieldValue("licensePhoto", info.fileList)}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Фото техпаспорта (сзади и спереди)",
      name: "techPassportPhoto",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={() => false}
          onChange={(info) =>
            form.setFieldValue("techPassportPhoto", info.fileList)
          }
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Паспорт (сзади и спереди)",
      name: "techPassportPhoto",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={() => false}
          onChange={(info) =>
            form.setFieldValue("techPassportPhoto", info.fileList)
          }
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Доверенность (сзади и спереди)",
      name: "techPassportPhoto",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={() => false}
          onChange={(info) =>
            form.setFieldValue("techPassportPhoto", info.fileList)
          }
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Лицензия",
      name: "techPassportPhoto",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={() => false}
          onChange={(info) =>
            form.setFieldValue("techPassportPhoto", info.fileList)
          }
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Фото автомобиля",
      name: "techPassportPhoto",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={() => false}
          onChange={(info) =>
            form.setFieldValue("techPassportPhoto", info.fileList)
          }
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
  ];

  return (
    <Modal
      title="Создать водителя"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          console.log(values, "createdFacility");
          onSuccessFields && onSuccessFields();
          create(values).then((res) => {
            if (res?.code !== "ERR_BAD_REQUEST") {
              getDrivers({ page: 1, limit: 20 });
              message.success({
                content: "Успешно создано",
              });
              form.resetFields();
            } else {
              showErrors(res);
            }
          });
        });
      }}
      okText="Сохранить"
      okButtonProps={{ loading: createLoading, disabled: createLoading }}
      cancelText="Закрыть"
      onCancel={onCancel}
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

export default DriversCreateModal;
