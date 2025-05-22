/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import {
  setIconFromApplicaionStatus,
  setColorFromApplicaionStatus,
} from "../../../../utils/index";
import useTaxAmount from "../../../../hooks/taxAmount/useTaxAmount";
import TaxAmountUpdateModal from "./TaxAmountEditModal";

const TaxAmountTable = () => {
  const [editModal, setEditModal] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const { listLoading, taxAmounts, getTaxAmounts, pagination, remove } =
    useTaxAmount();
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
      width: "20%",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Комиссия",
      width: "30%",
      dataIndex: "arendumAmount",
      key: "arendumAmount",
      render: (text, record) => (
        <span>{`${text} ${record?.arendumPercentage ? "(%)" : "(UZS)"} `}</span>
      ),
    },
    {
      title: "НДС",
      width: "20%",
      dataIndex: "ndsAmount",
      key: "ndsAmount",
      render: (text, record) => (
        <span>{`${text} ${record?.ndsPercentage ? "(%)" : "(UZS)"} `}</span>
      ),
    },
    {
      title: "Баланс водителя (UZS)",
      width: "30%",
      dataIndex: "driverBalance",
      key: "driverBalance",
    },
    {
      title: "",
      width: "10%",
      dataIndex: "others",
      key: "others",
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
                setEditModal(true);
                setDetailId(item?.id);
              }}
              icon={<FormOutlined />}
            />
            <Popconfirm
              placement="topLeft"
              title="Вы точно хотите удалить?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => {
                remove(item?.id).then((res) => {
                  if (res.success === true) {
                    message.success("Успешно удалено");
                    getTaxAmounts(params);
                  } else {
                    message.error("Ошибка при удалении");
                  }
                });
              }}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      };
    });
  }, [taxAmounts]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: "max-content" }}
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
      <TaxAmountUpdateModal
        open={editModal}
        onCancel={() => {
          setEditModal(false);
          setDetailId(null);
        }}
        id={detailId}
      />
    </>
  );
};

export default TaxAmountTable;
