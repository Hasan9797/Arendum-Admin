import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import { FormOutlined } from "@ant-design/icons";
import MainButton from "../../components/MainButton/MainButton";
import { useState } from "react";
import DistrictCreateModal from "../../components/dashboard/default/District/DistrictCreateModal";
import DistrictTable from "./../../components/dashboard/default/District/DistrictTable";

const District = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Районы</title>
          </Helmet>
          <PageHeader
            title="Районы"
            extra={
              <MainButton
                buttonText="Создать район"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => setModal(true)}
              />
            }
          />
        </Card>
        <DistrictTable />
      </div>
      <DistrictCreateModal
        onSuccessFields={() => setModal(false)}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default District;
