import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import MainButton from "../../components/MainButton/MainButton";
import { FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import MachinesCreateModal from "../../components/dashboard/default/Machines/MachinesCreateModal";
import MachinesTable from "../../components/dashboard/default/Machines/MachinesTable";

const Machines = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Категории техники</title>
          </Helmet>
          <PageHeader
            title="Категории техники"
            extra={
              <MainButton
                buttonText="Создать техники"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => setModal(true)}
              />
            }
          />
        </Card>
        <MachinesTable />
      </div>
      <MachinesCreateModal
        onSuccessFields={() => setModal(false)}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default Machines;
