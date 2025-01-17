import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import MerchantsTable from "../../components/dashboard/default/Merchants/MerchantsTable";
import MainButton from "../../components/MainButton/MainButton";
import { FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import MerchantCreateModal from "../../components/dashboard/default/Merchants/MerchantCreateModal";
// import { useState } from "react";

const Merchants = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
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
        />
      </div>
    </>
  );
};

export default Merchants;
