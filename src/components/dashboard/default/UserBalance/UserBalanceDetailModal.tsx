/* eslint-disable react-hooks/exhaustive-deps */
import {
  Descriptions,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd";
import { FC, useEffect, useMemo } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";

interface UserBalanceDetailModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

const UserBalanceDetailModal: FC<UserBalanceDetailModalProps> = ({
  open,
  onCancel,
  id,
}) => {
  const { getDetail, detail, detailLoading } = useRegion();

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
  }, [id]);

  console.log(detail);

  const items: MenuProps["items"] =
    detail?.structures?.map((structure, index) => ({
      key: index.toString(),
      label: <Space>{structure.name}</Space>,
    })) || [];

  const detailItems = useMemo(() => {
    return [
      {
        label: "ID",
        children: detail?.id,
        span: 4,
      },
      {
        label: "Имя (RU)",
        children: detail?.nameRu,
        span: 4,
      },
      {
        label: "Имя (UZ)",
        children: detail?.nameUz,
        span: 4,
      },
      {
        label: "Объект",
        children: (
          <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Typography.Link>
              <Space>
                {detail?.structures ? (
                  <>
                    Show facilities <DownOutlined />
                  </>
                ) : (
                  "Not facilities"
                )}
              </Space>
            </Typography.Link>
          </Dropdown>
        ),
        span: 4,
      },
      {
        label: "Дата создания",
        children: detail?.createdAt
          ? dayjs(detail?.createdAt).format("DD-MM-YYYY HH:mm:ss")
          : "No date",
        span: 4,
      },
    ];
  }, [detail]);

  return (
    <Modal
      title={`${detail?.name}`}
      open={open}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Закрыть"
      onOk={onCancel}
      onCancel={onCancel}
      width={1000}
      centered
    >
      {detailLoading ? <Spin /> : <Descriptions bordered items={detailItems} />}
    </Modal>
  );
};

export default UserBalanceDetailModal;
