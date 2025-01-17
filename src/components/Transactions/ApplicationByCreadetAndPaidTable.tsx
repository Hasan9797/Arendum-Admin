/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo } from "react";
import { Col, Row, Table, TableColumnsType } from "antd";
import { TransactionTableType } from "../../types/transactions";
import useTransaction from "./../../hooks/transaction/useTransaction";
const RegionTransactionsTable: FC = () => {
  const { getListByService, applicationByServiceList, listLoading } =
    useTransaction();

  useEffect(() => {
    getListByService();
  }, []);

  const columns: TableColumnsType<TransactionTableType> = [
    {
      title: "Тип заявки",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Количество созданных",
      dataIndex: "allApplicationCount",
      key: "allApplicationCount",
    },
    {
      title: "Количество оплаченных",
      dataIndex: "applicationCount",
      key: "applicationCount",
    },
    {
      title: "Общая сумма",
      dataIndex: "applicationAmount",
      key: "applicationAmount",
    },
  ];

  const data = useMemo(() => {
    return applicationByServiceList?.map((item) => {
      return {
        ...item,
        key: item?.serviceId,
      };
    });
  }, [applicationByServiceList]);

  return (
    <Table<TransactionTableType>
      scroll={{ x: 800 }}
      className="card"
      columns={columns}
      dataSource={data}
      title={() => (
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Col style={{ fontSize: "24px", fontWeight: "bold" }}>
            Созданный и оплаченный тип заявки
          </Col>
        </Row>
      )}
      loading={listLoading}
      pagination={false}
    />
  );
};

export default RegionTransactionsTable;
