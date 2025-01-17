import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import { FormOutlined } from "@ant-design/icons";
import MainButton from "../../components/MainButton/MainButton";
import { useState } from "react";
import RegionTable from "../../components/dashboard/default/Region/RegionTable";
import RegionCreateModal from "../../components/dashboard/default/Region/RegionCreateModal";

const Region = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Регион</title>
          </Helmet>
          <PageHeader
            title="Регион"
            extra={
              <MainButton
                buttonText="Создать регион"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => setModal(true)}
              />
            }
          />
        </Card>
        <RegionTable />
      </div>
      <RegionCreateModal
        onSuccessFields={() => setModal(false)}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default Region;
