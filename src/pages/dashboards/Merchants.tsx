import { Card } from "antd";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import MainButton from "../../components/MainButton/MainButton";
import { FormOutlined } from "@ant-design/icons";
import MerchantsTable from "../../components/dashboard/default/Merchants/MerchantsTable";
import MerchantCreateModal from "../../components/dashboard/default/Merchants/MerchantCreateModal";
import { useState } from "react";

const Merchants = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
        <h1>Bu sahifa yaqin orada ishga tushadi!</h1>

        {/* <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Мерчанты</title>
          </Helmet>
          <PageHeader
            title="Мерчанты"
            desc="Партнеры сервиса предоставляющие спецтехнику от юрлица"
            extra={
              <MainButton
                buttonText="Создать мерчант"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => setModal(true)}
              />
            }
          />
        </Card>
        <MerchantsTable />
        <MerchantCreateModal
          onSuccessFields={() => setModal(false)}
          open={modal}
          onCancel={() => setModal(false)}
        /> */}
    </>
  );
};

export default Merchants;
