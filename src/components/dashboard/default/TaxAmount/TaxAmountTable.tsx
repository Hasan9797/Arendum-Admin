/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils/index";
import useTaxAmount from "../../../../hooks/taxAmount/useTaxAmount";
import { useNavigate } from "react-router-dom";

const TaxAmountTable = () => {
  const { listLoading, taxAmounts, getTaxAmounts,pagination,remove } = useTaxAmount();
// const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: [],
  });
    useEffect(() => {
      getTaxAmounts(params);
    }, []);

  const columns = [
      {
        title: "Ид номер",
        width: "10%",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Комиссия",
        width: "10%",
        dataIndex: "arendumAmount",
        key: "arendumAmount",
        render:(text,record) =><span>{`${text} ${record?.arendumPercentage ? '(%)': '(UZS)' } `}</span>
      },
      {
        title: "НДС",
        width: "10%",
        dataIndex: "ndsAmount",
        key: "ndsAmount",
        render:(text,record) =><span>{`${text} ${record?.ndsPercentage ? '(%)': '(UZS)' } `}</span>
      },
      {
        title: "Баланс водителя (UZS)",
        width: "10%",
        dataIndex: "driverBalance",
        key: "driverBalance",
      },
    
     
    ];

  const data = useMemo(() => {
    return taxAmounts?.map((item) => {
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
  }, [taxAmounts]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x:'max-content'}}
        columns={columns}
        dataSource={data}
        loading={listLoading}
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
        pagination={{
          onChange: (page, pageSize) => {
            const newParams = { ...params };
            newParams.page = page;
            newParams.limit = pageSize;
            setParams(newParams);
            getTaxAmounts(newParams);
          },
          total: pagination?.total,
          showTotal: (total, range) => (
            <div className="show-total-pagination">
              Показаны <b>{range[0]}</b> - <b>{range[1]}</b> из <b>{total}</b>{" "}
              записи.
            </div>
          ),
          pageSize: params.limit,
          current: pagination?.current_page,
        }}
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
