/* eslint-disable react-hooks/exhaustive-deps */
import { Descriptions, Modal, Spin } from "antd";
import { FC, useEffect, useMemo } from "react";
import useMachines from "../../../../hooks/machines/useMachines";
import dayjs from "dayjs";

interface MachinesDetailModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

const MachinesDetailModal: FC<MachinesDetailModalProps> = ({
  open,
  onCancel,
  id,
}) => {
  const { getDetail, detail, detailLoading } = useMachines();

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
  }, [id]);

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

export default MachinesDetailModal;
