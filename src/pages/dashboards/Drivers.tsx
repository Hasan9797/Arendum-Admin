import { Helmet } from "react-helmet-async";
import { Card, PageHeader } from "../../components";
import { FormOutlined } from "@ant-design/icons";
import MainButton from "../../components/MainButton/MainButton";
import DriversTable from "../../components/dashboard/default/Drivers/DriversTable";
import { useNavigate } from "react-router-dom";

const Drivers = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Card style={{ marginBottom: "1.5rem" }}>
          <Helmet>
            <title>Водители</title>
          </Helmet>
          <PageHeader
            title="Водители"
            extra={
              <MainButton
                buttonText="Создать водителя"
                tooltipText="Создать"
                icon={<FormOutlined />}
                type="primary"
                onClick={() => navigate(`/dashboards/driver/create`)}
              />
            }
          />
        </Card>
        <DriversTable />
      </div>
    </>
  );
};

export default Drivers;
