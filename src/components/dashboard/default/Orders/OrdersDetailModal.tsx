/* eslint-disable react-hooks/exhaustive-deps */
import { Descriptions, Modal, Spin, Steps, Tag } from "antd";
import { FC, useEffect, useMemo } from "react";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "./../../../../utils/index";
import useOrders from '../../../../hooks/orders/useOrders.jsx' 
import dayjs from "dayjs";
import { detail_data } from "../../../../constants/index.js";

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
  const {getDetail,detail, detailLoading} = useOrders()
console.log(detail)
  useEffect(() => {
    if(id){
      getDetail(id)
    }
  }, [id]);

  const items = useMemo(() => {
    return [
      {
        label: "Статус",
        children: (
          <Tag
            icon={setIconFromApplicaionStatus(detail?.status?.id)}
            color={setColorFromApplicaionStatus(detail?.status?.id)}
          >
            {detail?.status?.text}
          </Tag>
        ),
        span: 4,
      },
      {
        label: "Заказчик",
        children: detail?.client?.fullName,
        span: 1,
      },
      {
        label: "Водитель",
        children: detail?.driver?.fullName,
        span: 2,
      },
      {
        label: "Адрес подачи",
        children: detail?.address,
        span: 4,
      },
      {
        label: "Тип техники",
        children: detail?.machine?.name,
        span: 1,
      },
      // {
      //   label: "Тип заказа",
      //   children: detail?.type_order,
      //   span: 2,
      // },
      {
        label: "Тип оплаты",
        children: detail?.paymentType?.text,
        span: 1,
      },
      {
        label: "Сумма",
        children: detail?.amount,
        span: 1,
      },
    ];
  }, [detail]);

  return detailLoading ?  (<Spin/>) : (
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
        items={detail_data?.map((item, index) => {
          const isLastItem = index === detail_data.length - 1;
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
