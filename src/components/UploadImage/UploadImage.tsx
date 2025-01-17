import { useState, FC } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { GetProp, UploadProps } from "antd";

interface UploadImageComponentProps {
  onChange: (file: File) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const UploadImage: FC<UploadImageComponentProps> = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const file = info.file.originFileObj as FileType;
      getBase64(file, (url) => {
        setLoading(false);
        setImageUrl(url);
        onChange(file);
      });
    }
    if (info.file.status === "error") {
      const file = info.file.originFileObj as FileType;
      // message.error({ content: "Ошибка" });
      setLoading(false);
      onChange(file);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        // name="avatar"
        listType="picture-card"
        accept=".png,.jpeg,.jpg,.gif,.svg"
        className="avatar-uploader"
        maxCount={1}
        showUploadList={{ showPreviewIcon: false }}
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        // action={"http://localhost:3000"}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
