/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  Row,
  Col,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useDrivers from "../../../../hooks/drivers/useDrivers.jsx";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import useRegions from "../../../../hooks/region/useRegion.jsx";
import { showErrors } from "../../../../errorHandler/errors.js";
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";

export interface UploadFile {
  uid: string;
  name: string;
  status?: "uploading" | "done" | "error" | "removed";
  url?: string;
  thumbUrl?: string;
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

// forms massivi uchun umumiy interfeys aniqlaymiz
interface FormItem {
  label: string;
  required: boolean;
  message: string;
  child: JSX.Element;
  name?: string; // name ixtiyoriy qilamiz, chunki ba'zi elementlarda yo'q
  colSpan?: number; // colSpan ixtiyoriy xususiyat sifatida qo'shiladi
}

// selectedMachineParams uchun tur aniqlaymiz
interface SelectedMachineParam {
  key: string;
  params: string[];
  title:string
}

export interface UploadedFilesType {
  [key: string]: string[];
}

const DriverCreatePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { uploadImg, create, createLoading } = useDrivers();
  const { getMachines, machines, listLoading } = useMachines();
  const { getRegions, regions, listLoading: regionLoading } = useRegions();
  const { getParamsByMachineId } = useSpecification(); // Texnikaga oid parametrlarni olish uchun
  const [isLegalPerson, setIsLegalPerson] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesType>({});
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [fileList, setFileList] = useState<Record<string, UploadFile[]>>({});
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(
    null
  ); // Tanlangan texnika IDsi
  const [machineParams, setMachineParams] = useState<MachineParam[]>([]); // Texnikaga oid parametrlarni saqlash uchun
  const [selectedMachineParams, setSelectedMachineParams] = useState<
    SelectedMachineParam[]
  >([]);

  useEffect(() => {
    getMachines();
    getRegions();
  }, []);

  // Texnika tanlanganda unga tegishli parametrlarni olish
  useEffect(() => {
    if (selectedMachineId) {
      getParamsByMachineId(selectedMachineId).then((res) => {
        if (res.status === 200) {
          setMachineParams(res.data.data);
          setSelectedMachineParams([]);
        } else {
          showErrors(res);
        }
      });
    } else {
      setMachineParams([]);
      setSelectedMachineParams([]);
    }
  }, [selectedMachineId]);

  const districts = regions.find((region) => region.id === selectedRegion);

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
console.log(selectedMachineParams)
  const handleFormSubmit = (values) => {
    const updatedValues = { ...values }; // `values` ni o'zgartirmaslik uchun nusxa olamiz

    selectedMachineParams.forEach((item) => {
      const key = item?.key;
      if (key && key in updatedValues) {
        delete updatedValues[key]; // `values` dan `item.key` ga mos kalitni o'chirish
      }
    });
    
    const finalValues = {
      ...updatedValues,
      ...uploadedFiles,
      legal: isLegalPerson,
      params: selectedMachineParams, //! Tanlangan parametrlarni qo'shamiz
    };
    create(finalValues).then((res) => {
      if (res.success === true) {
        getMachines({ limit: 10, page: 1 });
        message.success({
          content: "Успешно создано",
        });
        form.resetFields();
        setUploadedFiles({});
        setFileList({});
        navigate(-1);
      } else {
        showErrors(res.message);
      }
    });
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

  // Select onChange funksiyasi
  const handleParamsChange = (
    values: string[],
    machineKey: string,
    machineName: string
  ) => {
    setSelectedMachineParams((prev) => {
      // Avvalgi tanlovlar ichidan bu key mavjudligini tekshiramiz
      const existingIndex = prev.findIndex((item) => item.key === machineKey);
      if (existingIndex !== -1) {
        // Agar key mavjud bo'lsa, yangi tanlovlar bilan yangilaymiz
        const updatedParams = [...prev];
        updatedParams[existingIndex] = {
          key: machineKey,
          title: machineName,
          params: values,
        };
        return updatedParams;
      } else {
        // Agar key mavjud bo'lmasa, yangi obyekt qo'shamiz
        return [...prev, { key: machineKey, title:machineName, params: values }];
      }
    });
  };

  const forms:FormItem[] = [
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
    // Faqat machine tanlanganda parametrlarni ko'rsatamiz
    ...(selectedMachineId && machineParams.length > 0
      ? machineParams.map((machine, index) => ({
          label: `${machine.name}`,
          name: `${machine.key}`,
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
      label: "Тип пользователя",
      // name: "userType",
      required: true,
      message: "Выберите тип пользователя",
      child: (
        <Radio.Group 
        defaultValue={"physical"}
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
                value: item.id,
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
          listType="picture"
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
          listType="picture"
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
      ),
    },
    {
      label: "Доверенность (сзади и спереди)",
      name: "photoConfidencePassport",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
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
      ),
    },
    {
      label: "Лицензия",
      name: "photoLicense",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
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
      ),
    },
    {
      label: "Фото автомобиля",
      name: "photoCar",
      required: true,
      message: "Загрузите фото техпаспорта",
      child: (
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
      ),
    },
  ];

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
                name={item?.name}
                rules={[{ required: item.required, message: item.message }]}
              >
                {item.child}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button
              onClick={handleFormCancel}
              danger
              loading={createLoading}
              disabled={createLoading}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={createLoading}
              disabled={createLoading}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DriverCreatePage;
