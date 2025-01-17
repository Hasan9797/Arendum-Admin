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
  Spin,
  Upload,
} from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { equipmentTypes, regions } from "../../../../constants/index.js";
import { UploadOutlined } from "@ant-design/icons";
import useDrivers from "../../../../hooks/drivers/useDrivers.jsx";

interface UploadFile {
  uid: string;
  name: string;
  status?: "uploading" | "done" | "error" | "removed";
  url?: string;
  thumbUrl?: string;
}

interface UploadedFilesType {
  [key: string]: string[];
}

const DriverEditPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { uploadImg, getDetail, detail } = useDrivers();
  const [isLegalPerson, setIsLegalPerson] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesType>({});
  const [fileList, setFileList] = useState<Record<string, UploadFile[]>>({});
  const detailLoading = false;
  console.log(uploadedFiles);
  const handleFileUpload = async (file, name) => {
    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }
    try {
      const response = await uploadImg(formData);

      // Assuming the response contains the uploaded file URL
      if (response?.imgUrl) {
        setUploadedFiles((prev) => ({
          ...prev,
          [name]: [...(prev[name] || []), response.imgUrl],
        }));
        message.success(`${file.name} uploaded successfully.`);
      } else {
        message.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("An error occurred during file upload.");
    }

    return false;
  };
  const handleFormCancel = () => {
    form.resetFields();
    navigate(-1);
    setUploadedFiles({});
  };

  const handleFileListChange = (fileList, name) => {
    setFileList((prev) => ({
      ...prev,
      [name]: fileList,
    }));
  };

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log(detail);

  useEffect(() => {
    if (form && detail) {
      form.setFieldsValue({
        fullName: detail?.fullName || "No data",
        facilityNameUZ: detail?.fullName || "No data",
        regionId: detail?.region, // To'g'ri id qiymatini o'rnatish
      });
    }
  }, [detail, form]);

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      console.log(values);

      // regionId Select o'zgartirilmasa eski regionId saqlanadi
      // const payload = {
      //   ...values,
      // };

      // update(id, payload).then((res) => {
      //   if (!res) {
      //     getFacilities({ pageNumber: 1, pageSize: 20 });
      //     message.success({ content: "Обновлено успешно" });
      //     onCancel();
      //   } else {
      //     showErrors(res);
      //   }
      // });
    });
  };

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
          // loading={createLoading}
          // disabled={createLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            equipmentTypes &&
            equipmentTypes?.map((item) => {
              return {
                // value: item.id,
                value: item.name,
                label: item.name,
              };
            })
          }
        />
      ),
    },
    {
      label: "Марка и модель вашего авто",
      name: "equipmentModel",
      required: true,
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("equipmentModel", e.target.value)}
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
      name: "equipmentColor",
      required: true,
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("equipmentColor", e.target.value)}
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
      // name: "userType",
      required: true,
      message: "Выберите тип пользователя",
      child: (
        <Radio.Group
          onChange={(e) => {
            setIsLegalPerson(e.target.value === "legal" ? true : false);
          }}
        >
          <Radio value="legal">Юридическое лицо</Radio>
          <Radio value="physical">Физическое лицо</Radio>
        </Radio.Group>
      ),
      colSpan: 24,
    },
    ...(isLegalPerson
      ? [
          {
            label: "ФИО / Название организации",
            name: "merchantName",
            required: true,
            message: "Введите ИФИО / Название организации",
            child: (
              <Input
                onChange={(e) =>
                  form.setFieldValue("merchantName", e.target.value)
                }
              />
            ),
          },
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
          // loading={createLoading}
          // disabled={createLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            regions &&
            regions?.map((item) => {
              return {
                // value: item.id,
                value: item.name,
                label: item.name,
              };
            })
          }
        />
      ),
    },
    {
      label: "Фото водительского удостоверения",
      name: "photoDriverLicense",
      required: true,
      message: "Загрузите фото водительского удостоверения",
      child: (
        <Upload
          beforeUpload={(file) => handleFileUpload(file, "photoDriverLicense")}
          onChange={({ fileList }) => {
            form.setFieldValue("photoDriverLicense", fileList);
            handleFileListChange(fileList, "photoDriverLicense");
          }}
          fileList={fileList?.photoDriverLicense || []}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Фото техпаспорта (сзади и спереди)",
      name: "photoTexPassport",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={(file) => handleFileUpload(file, "photoTexPassport")}
          onChange={({ fileList }) => {
            form.setFieldValue("photoTexPassport", fileList);
            handleFileListChange(fileList, "photoTexPassport");
          }}
          fileList={fileList?.photoTexPassport || []}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Паспорт (сзади и спереди)",
      name: "photoPassport",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={(file) => handleFileUpload(file, "photoPassport")}
          onChange={({ fileList }) => {
            form.setFieldValue("photoPassport", fileList);
            handleFileListChange(fileList, "photoPassport");
          }}
          fileList={fileList?.photoPassport || []}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Доверенность (сзади и спереди)",
      name: "photoConfidencePassport",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={(file) =>
            handleFileUpload(file, "photoConfidencePassport")
          }
          onChange={({ fileList }) => {
            form.setFieldValue("photoConfidencePassport", fileList);
            handleFileListChange(fileList, "photoConfidencePassport");
          }}
          fileList={fileList?.photoConfidencePassport || []}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Лицензия",
      name: "photoLicense",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={(file) => handleFileUpload(file, "photoLicense")}
          onChange={({ fileList }) => {
            form.setFieldValue("photoLicense", fileList);
            handleFileListChange(fileList, "photoLicense");
          }}
          fileList={fileList?.photoLicense || []}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
    {
      label: "Фото автомобиля",
      name: "photoCar",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
        <Upload
          beforeUpload={(file) => handleFileUpload(file, "photoCar")}
          onChange={({ fileList }) => {
            form.setFieldValue("photoCar", fileList);
            handleFileListChange(fileList, "photoCar");
          }}
          fileList={fileList?.photoCar || []}
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      ),
    },
  ];
  return detailLoading ? (
    <Spin />
  ) : (
    <Card>
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Row gutter={[16, 16]}>
          {forms.map((item, idx) => (
            <Col
              xs={24}
              sm={24}
              md={item?.colSpan || 12}
              lg={item?.colSpan || 12}
              key={idx}
            >
              <Form.Item
                label={item.label}
                name={item.name}
                rules={[{ required: item.required, message: item.message }]}
              >
                {item.child}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button onClick={handleFormCancel} danger>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DriverEditPage;
