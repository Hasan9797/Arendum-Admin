import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import { FormOutlined } from "@ant-design/icons";
import MainButton from "../../components/MainButton/MainButton";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import SpecificationsTable from "../../components/dashboard/default/Specifications/SpecificationsTable";

const Specifications: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Параметры техники</title>
          </Helmet>
          <PageHeader
            title="Параметры техники"
            extra={
              <MainButton
                buttonText="Создать"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => navigate("/dashboards/specifications/create")}
              />
            }
          />
        </Card>
        <SpecificationsTable />
      </div>
    </>
  );
};

export default Specifications;
