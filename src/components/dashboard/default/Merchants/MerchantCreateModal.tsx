/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import useUser from "../../../../hooks/user/useUser.jsx";
// import useFacility from "../../../../hooks/facility/useFacility.jsx";
import useRegion from "../../../../hooks/region/useRegion.jsx";
import { copyText } from "../../../../utils/index";
import { CopyOutlined, UploadOutlined } from "@ant-design/icons";
import { showErrors } from "../../../../errorHandler/errors.js";

interface MerchantCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const MerchantCreateModal: FC<MerchantCreateModalProps> = ({
  open,
  onCancel,
  onSuccessFields,
}) => {
  const [form] = Form.useForm();
  const { createLoading, create, getList, getRoles, getPermissions } =
    useUser();
  const { getRegions } = useRegion();
  // const { getFacilities } = useFacility();

  const [, setLogin] = useState("");
  const [, setPassword] = useState("");
  const [, setSelectedRegion] = useState("");
  const [selectedRole] = useState("");
  const [, setValue] = useState<string>();

  useEffect(() => {
    // getFacilities({ pageNumber: 1, pageSize: 20 });
    getRegions();
    getRoles();
    getPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onChange = (newValue: string) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    setValue(null);
    form.setFieldValue("permissions", undefined);
  }, [selectedRole]);

  const forms = [
    {
      label: "Logistika kompaniyasi nomi",
      name: "name_company",
      required: true,
      message: "Kompaniya nomini kiriting",
      child: (
        <Input
          maxLength={100}
          onChange={(e) => form.setFieldValue("name_company", e.target.value)}
        />
      ),
    },
    {
      label: "Kompaniya rahbari F.I.Sh.",
      name: "director_fullName",
      required: true,
      message: "Rahbarning F.I.Sh.ni kiriting",
      child: (
        <Input
          maxLength={100}
          onChange={(e) =>
            form.setFieldValue("director_fullName", e.target.value)
          }
        />
      ),
    },
    {
      label: "Asosiy telefon raqami",
      name: "phone_number",
      required: true,
      message: "Telefon raqamini kiriting",
      child: (
        <Input
          type="tel"
          maxLength={15}
          onChange={(e) => form.setFieldValue("phone_number", e.target.value)}
          suffix={
            <CopyOutlined
              onClick={() => copyText(form.getFieldValue("phone_number"))}
              style={{ cursor: "pointer" }}
            />
          }
        />
      ),
    },
    {
      label: "Kompaniya hujjatlari (Guvohnoma, Litsenziya)",
      name: "documents",
      required: true,
      message: "Hujjatlarni yuklang",
      child: (
        <Upload
          beforeUpload={() => false}
          multiple
          onChange={(info) => form.setFieldValue("documents", info.fileList)}
        >
          <Button icon={<UploadOutlined />}>Hujjatlarni yuklash</Button>
        </Upload>
      ),
    },
    {
      label: "INN",
      name: "inn",
      required: true,
      message: "INNni kiriting",
      child: (
        <Input
          maxLength={9}
          onChange={(e) => form.setFieldValue("inn", e.target.value)}
        />
      ),
    },
    {
      label: "Tashkilotning yuridik manzili",
      name: "legal_address",
      required: true,
      message: "Yuridik manzilni kiriting",
      child: (
        <Input
          maxLength={255}
          onChange={(e) => form.setFieldValue("legal_address", e.target.value)}
        />
      ),
    },
    {
      label: "Tashkilotning amaldagi (faktik) manzili",
      name: "actual_address",
      required: true,
      message: "Faktik manzilni kiriting",
      child: (
        <Input
          maxLength={255}
          onChange={(e) => form.setFieldValue("actual_address", e.target.value)}
        />
      ),
    },
    {
      label: "Hisob raqami",
      name: "account_number",
      required: true,
      message: "Hisob raqamini kiriting",
      child: (
        <Input
          maxLength={20}
          onChange={(e) => form.setFieldValue("account_number", e.target.value)}
        />
      ),
    },
    {
      label: "MFO",
      name: "mfo",
      required: true,
      message: "MFOni kiriting",
      child: (
        <Input
          maxLength={9}
          onChange={(e) => form.setFieldValue("mfo", e.target.value)}
        />
      ),
    },
    {
      label: "Bank nomi",
      name: "bank_name",
      required: true,
      message: "Bank nomini kiriting",
      child: (
        <Input
          maxLength={255}
          onChange={(e) => form.setFieldValue("bank_name", e.target.value)}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Создать мерчанты"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          create(values).then((res) => {
            console.log(res);
            if (res?.status === 200) {
              getList({ pageNumber: 1, pageSize: 20 });
              onSuccessFields && onSuccessFields();
              message.success({
                content: res?.data?.answereComment,
              });
              form.resetFields();
              setPassword("");
              setLogin("");
              setSelectedRegion(null);
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
      </Form>
    </Modal>
  );
};

export default MerchantCreateModal;
