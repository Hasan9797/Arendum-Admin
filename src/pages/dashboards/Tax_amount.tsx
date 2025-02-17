// import { useState } from "react";
// import { Card, PageHeader } from "../../components";
// import { Helmet } from "react-helmet-async";
import MainButton from "../../components/MainButton/MainButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
// import TaxAmountTable from "../../components/dashboard/default/TaxAmount/TaxAmountTable";
// import TaxAmountCreateModal from "../../components/dashboard/default/TaxAmount/TaxAmountCreateModal";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Tax_amount = () => {
  //   const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Row gutter={[16, 16]} align={"middle"}>
        <Col>
          <MainButton
            buttonText="Назад"
            tooltipText="Назад"
            icon={<ArrowLeftOutlined />}
            type="primary"
            onClick={() => navigate(-1)}
          />
        </Col>
        <Col>
          <h1>Скоро он будет запущен!</h1>
        </Col>
      </Row>
      {/* <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Сумма налога</title>
          </Helmet>
          <PageHeader
            title="Сумма налога"
            extra={
              <MainButton
                buttonText="Создание налогов"
                tooltipText="Создание налогов"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => setModal(true)}
              />
            }
          />
        </Card>
        <TaxAmountTable />
      </div>
      <TaxAmountCreateModal
        onSuccessFields={() => setModal(false)}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
      /> */}
    </>
  );
};

export default Tax_amount;
