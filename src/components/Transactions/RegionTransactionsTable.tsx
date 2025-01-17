/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo } from "react";
import { Col, Row, Table, TableColumnsType } from "antd";
import { TransactionTableType } from "../../types/transactions";
import useTransaction from "./../../hooks/transaction/useTransaction";

const RegionTransactionsTable: FC = () => {
  const { getListByRegion, applicationsByRegion, listLoading } =
    useTransaction();

  useEffect(() => {
    getListByRegion();
  }, []);

  const columns: TableColumnsType<TransactionTableType> = [
    {
      title: "Регион",
      width: "15%",
      dataIndex: "regionNameRU",
      key: "regionNameRU",
    },
    {
      title: "Полученная сумма",
      width: "12%",
      dataIndex: "applicationAmount",
      key: "applicationAmount",
    },
    {
      title: "Количество оплаченных заявок",
      width: "10%",
      dataIndex: "applicationCount",
      key: "applicationCount",
    },
  ];
  const data = useMemo(() => {
    return applicationsByRegion?.map((item) => {
      return {
        ...item,
        key: item?.regionId,
      };
    });
  }, [applicationsByRegion]);

  return (
    <Table<TransactionTableType>
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
            Заявки по региону
          </Col>
        </Row>
      )}
      columns={columns}
      scroll={{ x: 750 }}
      className="card"
      dataSource={data}
      loading={listLoading}
      pagination={false}
    />
  );
};

export default RegionTransactionsTable;
