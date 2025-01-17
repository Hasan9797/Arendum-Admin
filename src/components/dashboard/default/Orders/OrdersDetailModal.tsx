/* eslint-disable react-hooks/exhaustive-deps */
import { Descriptions, Modal, Steps, Tag } from "antd";
import { FC, useMemo } from "react";
import dayjs from "dayjs";
import { Tranzactions } from "../../../../constants";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "./../../../../utils/index";

interface OrdersDetailModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string | number;
}

const OrdersDetailModal: FC<OrdersDetailModalProps> = ({
  open,
  onCancel,
  id,
}) => {
  const detail = Tranzactions.find((item) => item.id === id);

  const items = useMemo(() => {
    return [
      {
        label: "Статус",
        children: (
          <Tag
            icon={setIconFromApplicaionStatus(detail?.status)}
            color={setColorFromApplicaionStatus(detail?.status)}
          >
            {detail?.status}
          </Tag>
        ),
        span: 4,
      },
      {
        label: "Заказчик",
        children: detail?.driver,
        span: 1,
      },
      {
        label: "Водитель",
        children: detail?.user,
        span: 2,
      },
      {
        label: "Адрес подачи",
        children: detail?.address,
        span: 4,
      },
      {
        label: "Тип техники",
        children: detail?.type_of_equipment,
        span: 1,
      },
      {
        label: "Тип заказа",
        children: detail?.type_order,
        span: 2,
      },
      {
        label: "Тип оплаты",
        children: detail?.payment,
        span: 1,
      },
      {
        label: "Сумма",
        children: detail?.amount,
        span: 1,
      },
    ];
  }, [detail]);

  return (
    <Modal
      title={`ID заказа : ${detail?.id}`}
      open={open}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Закрыть"
      onOk={onCancel}
      onCancel={onCancel}
      // width={1000}
      centered
    >
      <Descriptions
        column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
        items={items}
        contentStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
      <Steps
        style={{ marginTop: "20px" }}
        progressDot
        direction="vertical"
        responsive={true}
        current={1} // Agar kerak bo'lsa, dinamik ravishda belgilang
        items={detail?.detail_order.map((item, index) => {
          const isLastItem = index === detail.detail_order.length - 1;
          return {
            title: isLastItem ? (
              <span style={{ color: "green" }}>{item.title}</span>
            ) : (
              item.title
            ),
            description: isLastItem
              ? null // Oxirgi elementda description bo'lmaydi
              : dayjs(item?.date).format("DD-MM-YYYY HH:mm:ss"),
            status: "finish", // Oxirgi element "success" rangda
          };
        })}
      />

      {/* {detailLoading ? <Spin /> : <Descriptions bordered items={items} />} */}
    </Modal>
  );
};

export default OrdersDetailModal;
