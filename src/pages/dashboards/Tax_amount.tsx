import MainButton from "../../components/MainButton/MainButton";
import {  FormOutlined } from "@ant-design/icons";
import { Card,  } from "antd";
import { Helmet } from "react-helmet-async";
// import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components";
import { useState } from "react";
import TaxAmountTable from "../../components/dashboard/default/TaxAmount/TaxAmountTable";
import TaxAmountCreateModal from "../../components/dashboard/default/TaxAmount/TaxAmountCreateModal";

const Tax_amount = () => {
    const [modal, setModal] = useState(false);
  // const navigate = useNavigate();
  return (
    <>
      {/* <Row gutter={[16, 16]} align={"middle"}>
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
      </Row> */}
      <div>
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
        open={modal}
        onSuccessFields={() => setModal(false)}
        onCancel={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default Tax_amount;
