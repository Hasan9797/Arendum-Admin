/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message, Modal, Spin, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { showErrors } from "../../../../errorHandler/errors";
import useMachines from "../../../../hooks/machines/useMachines";
import useDrivers from "../../../../hooks/drivers/useDrivers";
import { UploadOutlined } from "@ant-design/icons";

interface MachinesEditModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

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

const MachinesEditModal: FC<MachinesEditModalProps> = ({
  open,
  onCancel,
  id,
}) => {
  const {
    getDetail,
    getMachines,
    update,
    detail,
    updateLoading,
    detailLoading,
  } = useMachines();
  const { uploadImg } = useDrivers();

  const [form] = Form.useForm();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesType>({});
  const [fileList, setFileList] = useState<Record<string, CustomUploadFile[]>>(
    {}
  );

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
  }, [id]);

  console.log(detail);

  useEffect(() => {
    if (form && detail) {
      form.setFieldsValue({
        nameRu: detail?.nameRu,
        nameUz: detail?.nameUz,
        img: detail?.img,
      });
    }
  }, [detail, form]);

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const finalValues = {
        ...values,
        ...uploadedFiles,
      };
      // console.log(finalValues);
      update(id, finalValues).then((res) => {
        if (!res) {
          getMachines({ page: 1, limit: 20 });
          message.success({ content: "Обновлено успешно" });
          onCancel();
        } else {
          showErrors(res);
        }
      });
    });
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

  const handleFileListChange = (fileList, name) => {
    setFileList((prev) => ({
      ...prev,
      [name]: fileList,
    }));
  };

  const forms = [
    {
      label: "Имя ( RU )",
      name: "nameRu",
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("nameRu", e.target.value)} />
      ),
    },
    {
      label: "Имя ( UZ )",
      name: "nameUz",
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("nameUz", e.target.value)} />
      ),
    },
    {
      label: "Фото ",
      name: "img",
      message: "Загрузите фото",
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
              {detail?.img && (
                <img
                  src={`http://hasandev.uz${detail?.img}`}
                  alt="Driver License"
                  style={{ width: "200px", marginBottom: "10px" }}
                />
              )}
            </div>
            <Upload
              listType="picture"
              beforeUpload={(file) => handleFileUpload(file, "img")}
              onChange={({ fileList }) => {
                form.setFieldValue("img", fileList);
                handleFileListChange(fileList, "img");
              }}
              fileList={fileList?.photoTexPassport || []}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </div>
        </>
      ),
    },
    // {
    //   label: "Holati",
    //   name: "status",
    //   message: "Заполните",
    //   child: (
    //     <Switch
    //       checked={detail.status === 2}
    //       checkedChildren={"Активный"}
    //       unCheckedChildren={
    //         (detail.status === 0 && "Созданный") ||
    //         (detail.status === 1 && "Неактивный")
    //       }
    //       disabled={updateLoading}
    //       onChange={(checked) => form.setFieldValue("status", checked)}
    //     />
    //     // <Input onChange={(e) => form.setFieldValue("nameUz", e.target.value)} />
    //   ),
    // },
  ];

  return (
    <>
      <Modal
        title={`${detail?.name}`}
        open={open}
        okText="Сохранить"
        onOk={() => {
          form.submit();
          onSave;
        }}
        confirmLoading={updateLoading}
        okButtonProps={{ disabled: updateLoading }}
        cancelText="Закрыть"
        onCancel={onCancel}
        width={1000}
        centered
      >
        {detailLoading ? (
          <Spin />
        ) : (
          <Form form={form} labelCol={{ span: 2 }} onFinish={onSave}>
            {forms.map((item, idx) => (
              <Form.Item
                key={idx}
                label={item.label}
                name={item.name}
                rules={[{ message: item.message }]}
              >
                {item.child}
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </>
  );
};

export default MachinesEditModal;
