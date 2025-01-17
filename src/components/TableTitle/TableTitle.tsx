import { Space } from "antd";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const TableTitle: FC<Props> = ({ children }) => {
  return (
    <Space
      style={{
        marginBottom: 16,
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      {children}
    </Space>
  );
};

export default TableTitle;
