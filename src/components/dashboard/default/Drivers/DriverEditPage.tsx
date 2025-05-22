/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
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
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";
import TextArea from "antd/es/input/TextArea.js";

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

interface MachineParam {
  createdAt: string;
  id: number;
  key: string;
  machineId: number;
  name: string;
  params: { param: string }[];
  prefix: string;
  status: number;
  updatedAt: string;
}

interface SelectedMachineParam {
  key: string;
  params: string[];
  title: string;
}

interface FormItem {
  label: string;
  required?: boolean;
  message: string;
  child: JSX.Element;
  name?: string;
  colSpan?: number;
}

const DriverEditPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { uploadImg, getDetail, getDrivers, detailLoading, detail, update } =
    useDrivers();
  const { getMachines, machines, listLoading } = useMachines();
  const { getRegions, regions, listLoading: regionLoading } = useRegions();
  const { getParamsByMachineId } = useSpecification();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesType>({});
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [fileList, setFileList] = useState<Record<string, CustomUploadFile[]>>(
    {}
  );
  const [isLegalPerson, setIsLegalPerson] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    imgUrl: "",
  });
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(
    null
  );
  const [machineParams, setMachineParams] = useState<MachineParam[]>([]);
  const [selectedMachineParams, setSelectedMachineParams] = useState<
    SelectedMachineParam[]
  >([]);

  const districts = regions.find((region) => region.id === selectedRegion);

  // Dastlabki ma'lumotlarni yuklash
  useEffect(() => {
    if (id) {
      getDetail(id);
      getMachines();
      getRegions({ page: 1, limit: 20 });
    }
  }, [id]);

  // `detail` o'zgarganda holatni yangilash
  useEffect(() => {
    if (detail) {
      const initialValues: any = {
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
        legal: detail?.legal ? "legal" : "physical",
        companyName: detail?.companyName,
        companyInn: detail?.companyInn,
        pinfl: detail?.pinfl,
        comment: detail?.comment
      };

      // `params` ni dinamik ravishda `initialValues` ga qo'shamiz
      if (detail.params && Array.isArray(detail.params)) {
        detail.params.forEach((param: SelectedMachineParam) => {
          initialValues[param.key] = param.params;
        });
        setSelectedMachineParams(detail.params);
      }

      form.setFieldsValue(initialValues);

      setIsLegalPerson(detail?.legal === true || detail?.legal === "legal");
      setSelectedRegion(detail.regionId || 0);
      setSelectedMachineId(detail.machineId || null);
    }
  }, [detail, form]);

  // `selectedMachineId` o'zgarganda `machineParams` ni yuklash
  useEffect(() => {
    if (selectedMachineId) {
      getParamsByMachineId(selectedMachineId).then((res) => {
        if (res.status === 200) {
          setMachineParams(res.data.data);
          // Agar yangi mashina tanlansa, `selectedMachineParams` ni tozalash
          if (selectedMachineId !== detail?.machineId) {
            setSelectedMachineParams([]);
            // Formadagi eski parametrlarni tozalash
            machineParams.forEach((machine) => {
              form.setFieldsValue({ [machine.key]: undefined });
            });
          }
        } else {
          showErrors(res);
          setMachineParams([]);
          setSelectedMachineParams([]);
        }
      });
    } else {
      setMachineParams([]);
      setSelectedMachineParams([]);
    }
  }, [selectedMachineId, detail?.machineId]);

  const handleFormChange = (allValues: any) => {
    const detailWithParams = {
      ...detail,
      ...detail.params?.reduce((acc: any, param: SelectedMachineParam) => {
        acc[param.key] = param.params;
        return acc;
      }, {}),
    };
    const isEqual =
      JSON.stringify(allValues) === JSON.stringify(detailWithParams);
    setIsFormChanged(!isEqual);
  };

  const handleFileUpload = async (file: any, name: string) => {
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
    setSelectedMachineParams([]);
  };

  const handleFileListChange = (fileList: CustomUploadFile[], name: string) => {
    setFileList((prev) => ({
      ...prev,
      [name]: fileList,
    }));
  };

  const handleParamsChange = (
    values: string[],
    machineKey: string,
    machineName: string
  ) => {
    setSelectedMachineParams((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === machineKey);
      if (existingIndex !== -1) {
        const updatedParams = [...prev];
        updatedParams[existingIndex] = {
          key: machineKey,
          title: machineName,
          params: values,
        };
        return updatedParams;
      } else {
        return [
          ...prev,
          { key: machineKey, title: machineName, params: values },
        ];
      }
    });
  };

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();

      // `values` dan `selectedMachineParams` kalitlarini o'chirish
      const updatedValues = { ...values };
      selectedMachineParams.forEach((item) => {
        const key = item?.key;
        if (key && key in updatedValues) {
          delete updatedValues[key];
        }
      });

      const finalValues = {
        ...updatedValues,
        ...uploadedFiles,
        params: selectedMachineParams,
      };

      update(id, finalValues).then((res) => {
        if (res.success) {
          getDrivers({ page: 1, limit: 20 });
          message.success({ content: "Обновлено успешно" });
          form.resetFields();
          setUploadedFiles({});
          setFileList({});
          setSelectedMachineParams([]);
          navigate("/dashboards/drivers");
        } else {
          showErrors(res);
        }
      });
    });
  };

  const forms: FormItem[] = [
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
      name: "machineId",
      required: true,
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
          onChange={(value) => setSelectedMachineId(value)}
        />
      ),
    },
    ...(selectedMachineId && machineParams.length > 0
      ? machineParams.map((machine, index) => ({
          label: `${machine.name}`,
          name: machine.key, // Har bir parametr uchun `name` sifatida `machine.key` ni ishlatamiz
          required: false,
          message: `Выберите параметры для ${machine.name}`,
          child: (
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder={`Выберите параметры (${machine.prefix})`}
              value={
                selectedMachineParams.find((item) => item.key === machine.key)
                  ?.params || []
              }
              onChange={(values) =>
                handleParamsChange(values, machine.key, machine.name)
              }
            >
              {machine.params.map((param, paramIndex) => (
                <Select.Option
                  key={`${index}-${paramIndex}`}
                  value={param.param}
                >
                  {param.param}
                </Select.Option>
              ))}
            </Select>
          ),
        }))
      : []),
    {
      label: "Гос.номер авто",
      name: "machineNumber",
      required: true,
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
      required: true,
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
      required: true,
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
      required: true,
      message: "Выберите тип пользователя",
      child: (
        <Radio.Group
          value={isLegalPerson ? "legal" : "physical"}
          onChange={(e) => {
            setIsLegalPerson(e.target.value === "legal" ? true : false);
            form.setFieldsValue({
              legal: e.target.value === "legal" ? true : false,
            });
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
      : [
        {
          label: "ПИНФЛ",
          name: "pinfl",
          required: true,
          message: "Введите ПИНФЛ",
          child: (
            <Input type="number" maxLength={14} 
              onChange={(e) =>
                form.setFieldValue("pinfl", e.target.value)
              }
            />
          ),
        },
      ]),
    {
      label: "Регион проживания",
      name: "regionId",
      required: true,
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
      required: true,
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
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoDriverLicense &&
                detail?.photoDriverLicense.map((img, index) => (
                  <img
                    key={index}
                    onClick={() =>
                      setModalVisible({
                        visible: true,
                        imgUrl: `http://hasandev.uz${img}`,
                      })
                    }
                    src={`http://hasandev.uz${img}`}
                    alt="Driver License"
                    style={{ maxWidth: "100px", marginBottom: "10px" }}
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
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoTexPassport &&
                detail?.photoTexPassport.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    onClick={() =>
                      setModalVisible({
                        visible: true,
                        imgUrl: `http://hasandev.uz${img}`,
                      })
                    }
                    alt="Driver License"
                    style={{ width: "100px", marginBottom: "10px" }}
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
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoPassport &&
                detail?.photoPassport.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    onClick={() =>
                      setModalVisible({
                        visible: true,
                        imgUrl: `http://hasandev.uz${img}`,
                      })
                    }
                    alt="Driver License"
                    style={{ width: "100px", marginBottom: "10px" }}
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
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoConfidencePassport &&
                detail?.photoConfidencePassport.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    onClick={() =>
                      setModalVisible({
                        visible: true,
                        imgUrl: `http://hasandev.uz${img}`,
                      })
                    }
                    alt="Driver License"
                    style={{ width: "100px", marginBottom: "10px" }}
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
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoLicense &&
                detail?.photoLicense.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    onClick={() =>
                      setModalVisible({
                        visible: true,
                        imgUrl: `http://hasandev.uz${img}`,
                      })
                    }
                    alt="Driver License"
                    style={{ width: "100px", marginBottom: "10px" }}
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
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {detail?.photoCar &&
                detail?.photoCar.map((img, index) => (
                  <img
                    key={index}
                    src={`http://hasandev.uz${img}`}
                    onClick={() =>
                      setModalVisible({
                        visible: true,
                        imgUrl: `http://hasandev.uz${img}`,
                      })
                    }
                    alt="Driver License"
                    style={{ width: "100px", marginBottom: "10px" }}
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
    {
      label: "Комментарий",
      name: "comment",
      message: "Введите",
      child: (
        <TextArea
          rows={4}
          placeholder="Оставить комментарий"
          onChange={(e) => form.setFieldValue("comment", e.target.value)}
        />
      ),
    },
  ];

  return detailLoading ? (
    <Spin />
  ) : (
    <>
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
                Отменить
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isFormChanged}
              >
                Подтвердить
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Modal
        visible={modalVisible.visible}
        footer={null}
        onCancel={() => setModalVisible({ visible: false, imgUrl: "" })}
        centered
        width="auto"
        bodyStyle={{ padding: 0, margin: 0 }}
      >
        <img
          src={modalVisible.imgUrl}
          alt="Kattalashtirilgan"
          style={{ maxWidth: "450px", width: "100%", height: "auto" }}
        />
      </Modal>
    </>
  );
};

export default DriverEditPage;
