/* eslint-disable react-hooks/exhaustive-deps */
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
import { UploadOutlined } from "@ant-design/icons";
import useDrivers from "../../../../hooks/drivers/useDrivers.jsx";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import useRegions from "../../../../hooks/region/useRegion.jsx";
import { showErrors } from "../../../../errorHandler/errors.js";
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

interface CustomUploadFile extends UploadFile {
  response?: {
    imgUrl?: string;
  };
}

const DriverEditPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { uploadImg, getDetail, getDrivers, detailLoading, detail, update } =
    useDrivers();
  const { getMachines, machines, listLoading } = useMachines();
  const { getRegions, regions, listLoading: regionLoading } = useRegions();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesType>({});
  const [selectedRegion, setSelectedRegion] = useState<number>(detail.regionId);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [fileList, setFileList] = useState<Record<string, CustomUploadFile[]>>(
    {}
  );

  const districts = regions.find((region) => region.id === selectedRegion);
  const [isLegalPerson, setIsLegalPerson] = useState(detail?.legal === "legal" || false)

  useEffect(() => {
    if (detail?.regionId) {
      setSelectedRegion(detail.regionId);
    }
  }, [detail]);

  useEffect(() => {
    if (id) {
      getDetail(id);
      getMachines();
      getRegions({ page: 1, limit: 20 });
    }
  }, [id]);
  console.log(detail);

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        fullName: detail?.fullName,
        machineId: detail?.machineId,
        machineNumber: detail?.machineNumber,
        machineColor: detail?.machineColor,
        phone: detail?.phone,
        email: detail?.email,
        regionId: detail?.regionId,
        structureId: detail?.structureId,
        photoDriverLicense: detail?.photoDriverLicense,
        photoCar: detail?.photoCar,
        photoConfidencePassport: detail?.photoConfidencePassport,
        photoLicense: detail?.photoLicense,
        photoPassport: detail?.photoPassport,
        photoTexPassport: detail?.photoTexPassport,
        legal: detail?.legal ? "legal" :"physical",
        companyName:detail?.companyName,
        companyInn:detail?.companyInn

      });
    }
  }, [detail, form]);

  const handleFormChange = (allValues) => {
    const isEqual = JSON.stringify(allValues) === JSON.stringify(detail);
    setIsFormChanged(!isEqual); // Agar qiymatlar bir xil bo'lsa, false bo'ladi
  };

  const handleFileUpload = async (file, name) => {
    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }
    try {
      const response = await uploadImg(formData);

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
    navigate("/dashboards/drivers");
    setUploadedFiles({});
    setFileList({});
  };

  const handleFileListChange = (fileList, name) => {
    setFileList((prev) => ({
      ...prev,
      [name]: fileList,
    }));
  };

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const finalValues = {
        ...values,
        ...uploadedFiles,
      };

      update(id, finalValues).then((res) => {
        console.log(res);
        if (res.success) {
          getDrivers({ page: 1, limit: 20 });
          message.success({ content: "Обновлено успешно" });
          form.resetFields();
          setUploadedFiles({});
          setFileList({});
          navigate("/dashboards/drivers");
        } else {
          showErrors(res);
        }
      });
    });
  };

  const forms = [
    {
      label: "Ваше ФИО",
      name: "fullName",
      message: "Введите ФИО или название организации",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("fullName", e.target.value)}
        />
      ),
    },
    {
      label: "Тип вашей спецтехники",
      name: "machineId",
      message: "Введите тип спецтехники",
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
            machines &&
            machines?.map((item) => {
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
      label: "Гос.номер авто",
      name: "machineNumber",
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("machineNumber", e.target.value)}
        />
      ),
    },
    {
      label: "Цвет авто",
      name: "machineColor",
      message: "Введите ГРН спецтехники",
      child: (
        <Input
          onChange={(e) => form.setFieldValue("machineColor", e.target.value)}
        />
      ),
    },
    {
      label: "Номер телефона",
      name: "phone",
      message: "Введите номер телефона",
      child: (
        <Input
          type="tel"
          onChange={(e) => form.setFieldValue("phone", e.target.value)}
        />
      ),
    },
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
      label: "Тип пользователя",
      // name: "legal",
      required: true,
      message: "Выберите тип пользователя",
      child: (
        <Radio.Group
        value={isLegalPerson ? 'legal' : 'physical'} // Forma bilan sinxronlash
      onChange={(e) => {
        setIsLegalPerson(e.target.value === "legal" ? true : false);
        form.setFieldsValue({ legal: e.target.value === "legal" ? true : false });

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
            name: "companyName",
            required: true,
            message: "Введите ИФИО / Название организации",
            child: (
              <Input
                onChange={(e) =>
                  form.setFieldValue("companyName", e.target.value)
                }
              />
            ),
          },
          {
            label: "ИНН Мерчанта",
            name: "companyInn",
            required: true,
            message: "Введите ИНН Мерчанта",
            child: (
              <Input
                onChange={(e) =>
                  form.setFieldValue("companyInn", e.target.value)
                }
              />
            ),
          },
        ]
      : []),
    {
      label: "Регион проживания",
      name: "regionId",
      message: "Выберите регион",
      child: (
        <Select
          showSearch
          allowClear
          loading={regionLoading}
          disabled={regionLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          onChange={(e) => setSelectedRegion(Number(e))}
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
      label: "Район проживания",
      name: "structureId",
      message: "Выберите регион",
      child: (
        <Select
          showSearch
          allowClear
          loading={regionLoading}
          disabled={regionLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            districts &&
            districts?.structure?.map((item) => {
              return {
                value: item?.id,
                label: item?.name,
              };
            })
          }
        />
      ),
    },
    {
      label: "Фото водительского удостоверения",
      name: "photoDriverLicense",
      message: "Загрузите фото водительского удостоверения",
      child: (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoDriverLicense &&
                detail?.photoDriverLicense.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ maxWidth: "500px", marginBottom: "10px" }}
                  />
                ))}
            </div>
            <Upload
              listType="picture"
              beforeUpload={(file) =>
                handleFileUpload(file, "photoDriverLicense")
              }
              onChange={({ fileList }) => {
                const updatedFileList = fileList.map((file) => ({
                  ...file,
                  url: file.response?.imgUrl || file.url,
                }));

                setFileList((prev) => ({
                  ...prev,
                  photoDriverLicense: updatedFileList,
                }));

                form.setFieldValue(
                  "photoDriverLicense",
                  updatedFileList.map((file) => file.url)
                );
              }}
              // onRemove={(file) => {
              //   const updatedFileList = fileList.photoDriverLicense.filter(
              //     (item) => item.uid !== file.uid
              //   );
              //   console.log(file);
              //   setFileList((prev) => ({
              //     ...prev,
              //     photoDriverLicense: updatedFileList,
              //   }));

              //   form.setFieldValue(
              //     "photoDriverLicense",
              //     updatedFileList.map((file) => file.url)
              //   );
              // }}
              fileList={fileList?.photoDriverLicense || []}
            >
              <Button icon={<UploadOutlined />}>Загрузить новое фото</Button>
            </Upload>
          </div>
        </>
      ),
    },
    {
      label: "Фото техпаспорта (сзади и спереди)",
      name: "photoTexPassport",
      message: "Загрузите фото техпаспорта",
      child: (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoTexPassport &&
                detail?.photoTexPassport.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ width: "500px", marginBottom: "10px" }}
                  />
                ))}
            </div>
            <Upload
              listType="picture"
              beforeUpload={(file) =>
                handleFileUpload(file, "photoTexPassport")
              }
              onChange={({ fileList }) => {
                form.setFieldValue("photoTexPassport", fileList);
                handleFileListChange(fileList, "photoTexPassport");
              }}
              fileList={fileList?.photoTexPassport || []}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </div>
        </>
      ),
    },
    {
      label: "Паспорт (сзади и спереди)",
      name: "photoPassport",
      message: "Загрузите фото техпаспорта",
      child: (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoPassport &&
                detail?.photoPassport.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ width: "500px", marginBottom: "10px" }}
                  />
                ))}
            </div>
            <Upload
              listType="picture"
              beforeUpload={(file) => handleFileUpload(file, "photoPassport")}
              onChange={({ fileList }) => {
                form.setFieldValue("photoPassport", fileList);
                handleFileListChange(fileList, "photoPassport");
              }}
              fileList={fileList?.photoPassport || []}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </div>
        </>
      ),
    },
    {
      label: "Доверенность (сзади и спереди)",
      name: "photoConfidencePassport",
      message: "Загрузите фото техпаспорта",
      child: (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoConfidencePassport &&
                detail?.photoConfidencePassport.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ width: "500px", marginBottom: "10px" }}
                  />
                ))}
            </div>
            <Upload
              listType="picture"
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
          </div>
        </>
      ),
    },
    {
      label: "Лицензия",
      name: "photoLicense",
      message: "Загрузите фото техпаспорта",
      child: (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoLicense &&
                detail?.photoLicense.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ width: "500px", marginBottom: "10px" }}
                  />
                ))}
            </div>
            <Upload
              listType="picture"
              beforeUpload={(file) => handleFileUpload(file, "photoLicense")}
              onChange={({ fileList }) => {
                form.setFieldValue("photoLicense", fileList);
                handleFileListChange(fileList, "photoLicense");
              }}
              fileList={fileList?.photoLicense || []}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </div>
        </>
      ),
    },
    {
      label: "Фото автомобиля",
      name: "photoCar",
      message: "Загрузите фото техпаспорта",
      child: (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoCar &&
                detail?.photoCar.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ width: "500px", marginBottom: "10px" }}
                  />
                ))}
            </div>
            <Upload
              listType="picture"
              beforeUpload={(file) => handleFileUpload(file, "photoCar")}
              onChange={({ fileList }) => {
                form.setFieldValue("photoCar", fileList);
                handleFileListChange(fileList, "photoCar");
              }}
              fileList={fileList?.photoCar || []}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </div>
        </>
      ),
    },
  ];
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
          {forms.map((item, idx) => (
            <Col
              xs={24}
              sm={24}
              // md={item?.colSpan || 12}
              // lg={item?.colSpan || 12}
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
            <Button type="primary" htmlType="submit" disabled={!isFormChanged}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DriverEditPage;
