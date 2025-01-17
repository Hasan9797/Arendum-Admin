/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Row, Select, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { addFilter, getDateTime } from "../../../../utils";
import { useEffect } from "react";
import useServices from "../../../../hooks/services/useServices";
import useRegion from "./../../../../hooks/region/useRegion";
// import useFacility from "./../../../../hooks/facility/useFacility";
import useReport from "./../../../../hooks/report/useReport";
import "../../../../App.css";
import { Col } from "antd";

const ReportTable = () => {
  const { getServices, services, listLoading: serviceLoading } = useServices();
  const { regions, getRegions, listLoading: regionLoading } = useRegion();
  const { reports, getReports, total, listLoading, getReportsDownload } =
    useReport();
  // const {
  //   facilties,
  //   getFacilities,
  //   listLoading: facilityLoading,
  // } = useFacility();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [params, setParams] = useState({});

  const filter = () => {
    const newParams = { ...params };
    setParams(newParams);
    getReports(newParams);
  };


  useEffect(() => {
    getRegions();
    getServices();
    // getFacilities({ pageNumber: 1, pageSize: 1000 });
    getReports(params);
  }, []);

  const downloadReports = () => {
    getReportsDownload(params);
  };

  const columns = [
    {
      title: "Тип заявки",
      // width: "20%",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Количество создано",
      // width: "15%",
      dataIndex: "countApplication",
      key: "countApplication",
    },
    {
      title: "Количество оплаченных заявок",
      // width: "20%",
      dataIndex: "countPaidApplications",
      key: "countPaidApplications",
    },
    {
      title: "Сумма за 1 услугу",
      // width: "20%",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Сумма оплаченных заявок",
      // width: "20%",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
  ];

  const data = useMemo(() => {
    return reports?.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
  }, [reports]);

  return (
    <>
      <Table
        className="card"
        scroll={{ x: 1600, y: 599 }}
        columns={columns}
        dataSource={data}
        title={() => (
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between", // Flex uslubi qo'shildi
              alignItems: "center", // Vertikal markazlash uchun
            }}
          >
            <Col>
              <h3
                style={{
                  fontSize: "24px",
                  // color: "#4693CF",
                  fontWeight: "700",
                  margin: "0",
                }}
              >
                Отчеты
              </h3>
            </Col>
            <Col
              style={{
                display: "flex",
                gap: "10px", // Elementlar orasidagi bo'shliq
                alignItems: "center", // Elementlarni vertikal markazlash
              }}
            >
              <Select
                showSearch
                allowClear
                loading={regionLoading}
                disabled={regionLoading}
                placeholder="Select Region"
                filterOption={(inputValue, option) =>
                  option?.label
                    ?.toLowerCase()
                    .indexOf(inputValue.toLowerCase()) >= 0
                }
                options={
                  regions &&
                  regions?.map((item) => {
                    return {
                      value: item.id,
                      label: item.regionNameRU,
                    };
                  })
                }
                onChange={(e) => {
                  setSelectedRegion(e);
                  addFilter(setParams, "region", e);
                }}
              />
              {selectedRegion ? (
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Facility"
                  // loading={facilityLoading}
                  // disabled={facilityLoading}
                  filterOption={(inputValue, option) =>
                    option?.label
                      ?.toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0
                  }
                  options={regions
                    .find((item) => item.id === selectedRegion)
                    ?.facilities?.map((facility) => ({
                      value: facility.id,
                      label: facility.facilityNameRU,
                    }))}
                  onChange={(e) => {
                    setSelectedFacility(e);
                    addFilter(setParams, "facility", e);
                  }}
                />
              ) : null}
              {selectedRegion && selectedFacility ? (
                <Select
                  showSearch
                  allowClear
                  placeholder="Select User"
                  // loading={facilityLoading}
                  // disabled={facilityLoading}
                  filterOption={(inputValue, option) =>
                    option?.label
                      ?.toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0
                  }
                  // options={facilties
                  //   .find((item) => item.id === selectedFacility)
                  //   ?.users?.map((user) => ({
                  //     value: user.id,
                  //     label: user.login,
                  //   }))}
                  onChange={(e) => {
                    addFilter(setParams, "user", e);
                  }}
                />
              ) : null}
              <Select
                placeholder="Select type"
                loading={serviceLoading}
                disabled={serviceLoading}
                showSearch
                allowClear
                filterOption={(inputValue, option) =>
                  String(option?.label)
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) >= 0
                }
                options={
                  services &&
                  services?.map((item) => ({
                    value: item.id,
                    label: item.serviceName,
                  }))
                }
                onChange={(e) => {
                  addFilter(setParams, "service", e);
                }}
              />
              <DatePicker.RangePicker
                onChange={(e, v) =>
                  addFilter(
                    setParams,
                    "filterDate",
                    getDateTime(e, v),
                    "between"
                  )
                }
              />
              <Button type="primary" onClick={downloadReports}>
                <DownloadOutlined />
                Скачать
              </Button>
              <Button type="primary" onClick={filter}>
                Искать
              </Button>
            </Col>
          </Row>
        )}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  Итого
                </span>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {total?.totalCreated}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {total?.totalPaid}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {total?.totalAmountOfPaid}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        loading={listLoading}
        pagination={false}
      />
    </>
  );
};

export default ReportTable;
