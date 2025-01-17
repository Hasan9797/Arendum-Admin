import { Button, Form, Input, message, Modal, Upload } from "antd";
import { FC, useState } from "react";
import useMachines from "../../../../hooks/machines/useMachines";
import useDrivers from "../../../../hooks/drivers/useDrivers";
import { UploadOutlined } from "@ant-design/icons";
import { showErrors } from "../../../../errorHandler/errors";

interface MachinesCreateModalProps {
  open: boolean;
  onSuccessFields?: () => void;
  onCancel?: () => void;
}

const MachinesCreateModal: FC<MachinesCreateModalProps> = ({
  open,
  onSuccessFields,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileList, setFileList] = useState([]);

  const { createLoading, create, getMachines } = useMachines();
  const { uploadImg } = useDrivers();

  const handleFileUpload = async (file, name) => {
    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }
    try {
      const response = await uploadImg(formData);

      if (response?.imgUrl) {
        setUploadedFiles({ [name]: response.imgUrl });
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

  return (
    <Modal
      title="Создать техники"
      open={open}
      onOk={() => {
        form.validateFields().then(() => {
          const values = form.getFieldsValue();
          const finalValues = {
            ...values,
            ...uploadedFiles,
            name: "Mashina",
          };
          create(finalValues).then((res) => {
            if (res) {
              getMachines({ limit: 10, page: 1 });
              onSuccessFields && onSuccessFields();
              message.success({
                content: "Успешно создано",
              });
              form.resetFields();
              setUploadedFiles({});
              setFileList([]);
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
        setFileList([]);
      }}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nameRu"
          label="Name(RU)"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nameUz"
          label="Name(UZ)"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="img"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList || []}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            beforeUpload={(file) => {
              // Limit the number of files to 1
              if (fileList.length >= 1) {
                message.error("Вы можете загрузить только одно фото!");
                return Upload.LIST_IGNORE;
              }
              return handleFileUpload(file, "img");
            }}
            onChange={({ fileList }) => {
              // Only keep the most recent file in fileList
              const limitedFileList = fileList.slice(-1);
              form.setFieldValue("img", limitedFileList);
              setFileList(limitedFileList);
            }}
            fileList={fileList}
            multiple={false} // Disable multiple file selection
          >
            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MachinesCreateModal;
