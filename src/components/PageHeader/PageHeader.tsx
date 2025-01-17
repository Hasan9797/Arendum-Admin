import React, { ReactNode } from "react";
import { Breadcrumb, BreadcrumbProps, Space, Typography } from "antd";
import "./styles.css";

type Props = {
  title?: string;
  icon?: ReactNode;
  extra?: ReactNode;
  desc?: string;
  breadcrumbs?: BreadcrumbProps["items"];
} & React.HTMLAttributes<HTMLDivElement>;

const PageHeader = ({
  breadcrumbs,
  title,
  extra,
  desc,
  icon,
  ...others
}: Props) => {
  return (
    <div {...others}>
      <Space direction="vertical" size="small" className="w-100">
        <Typography.Title
          level={4}
          style={{
            padding: 0,
            margin: 0,
            textTransform: "capitalize",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {icon && icon}
            {title}
          </span>

          {extra && extra}
        </Typography.Title>
        <Typography.Text
          style={{
            padding: 0,
            margin: 0,
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {desc}
          </span>
        </Typography.Text>
        <Breadcrumb items={breadcrumbs} className="page-header-breadcrumbs" />
      </Space>
      {/* <Divider orientation="right" plain>
        <span style={{ textTransform: "capitalize" }}>{title}</span>
      </Divider> */}
    </div>
  );
};

export default PageHeader;
