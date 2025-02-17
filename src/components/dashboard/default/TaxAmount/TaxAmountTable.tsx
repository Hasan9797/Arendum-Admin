/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useMemo } from "react";
// import useAuth from "../../../../hooks/auth/useAuth";
import { Tranzactions } from "../../../../constants";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils/index";
import { TransactionTableType } from "../../../../types";

const TaxAmountTable = () => {
  const columns: TableColumnsType<TransactionTableType> = [
    {
      title: "ID заказа",
      width: "5%",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Заказчик",
      width: "10%",
      key: "driver",
      dataIndex: "driver",
    },
    {
      title: "Actions",
      children: [
        {
          title: "",
          dataIndex: "others",
          key: "others",
        },
      ],
    },
  ];

  const data = useMemo(() => {
    return Tranzactions?.map((item) => {
      return {
        ...item,
        key: item.id,
        statusColumn: {
          int: item?.status,
          string: (
            <Tag
              icon={setIconFromApplicaionStatus(item?.status)}
              color={setColorFromApplicaionStatus(item?.status)}
            >
              {item.status}
            </Tag>
          ),
        },
        others: (
          <Space>
            <Button
              onClick={() => {
                // setDetailModal(true);
                // setDetailId(item?.id);
              }}
              icon={<EyeOutlined />}
            />
          </Space>
        ),
      };
    });
  }, [Tranzactions]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: 1600 }}
        columns={columns}
        dataSource={data}
        // loading={listLoading}
        title={() => (
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Col>
              <Typography.Title
                style={{
                  fontSize: "30px",
                  fontWeight: "500",
                  marginTop: 0,
                  marginBottom: "10px",
                }}
              >
                Налоги
              </Typography.Title>
              <Typography.Text style={{ fontSize: "16px", color: "gray" }}>
                База данных всех налоги
              </Typography.Text>
            </Col>
          </Row>
        )}
        pagination={false}
      />
      {/* <OrdersDetailModal
        open={detailModal}
        onCancel={() => {
          setDetailModal(false);
          setDetailId(null);
        }}
        id={detailId}
      /> */}
    </>
  );
};

export default TaxAmountTable;
