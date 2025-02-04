/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Form, message, Radio, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import useMachines from "../../../../hooks/machines/useMachines.jsx";
import useParamsFilter from "../../../../hooks/paramsFilter/useParamsFilter.jsx";
import useSpecification from "../../../../hooks/specifications/useSpecification.jsx";
import { useNavigate } from "react-router-dom";
import { showErrors } from "../../../../errorHandler/errors.js";
const { Option } = Select;

const ParamsFilterCreatePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedMachineId, setSelectedMachineId] = useState<number>(null);
  const [machineParams, setMachineParams] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const { getParamsByMachineId } = useSpecification();
  const { getMachines, machines, listLoading } = useMachines();
  const { create, createLoading, getList } = useParamsFilter();

  const filteredParams =
    JSON.parse(localStorage.getItem("selectedValues")) || [];

  const handleRadioChange = (value, machineName) => {
    const name = machineName.replaceAll(" ", "_");
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value, // Mashina nomini kalit qilib saqlash
    }));
  };

  const handleSubmit = () => {
    // selectedValues filteredParams ichida mavjudligini tekshirish
    const isDuplicate = filteredParams.some(
      (param) => JSON.stringify(param) === JSON.stringify(selectedValues)
    );

    if (isDuplicate) {
      // Agar qiymat mavjud bo'lsa, xato xabarini ko'rsatish
      message.error({
        content: "Bunday filter qo‘shilgan",
      });
    } else {
      // Yangi qiymatni qo'shish va localStorage'ni yangilash
      filteredParams.push(selectedValues);
      localStorage.setItem("selectedValues", JSON.stringify(filteredParams));
      setSelectedValues({});
      message.success({
        content: "Фильтр добавлен",
      });
    }
  };

  useEffect(() => {
    getMachines({ limit: 10, page: 1 });
  }, []);

  useEffect(() => {
    if (selectedMachineId) {
      getParamsByMachineId({ machineId: selectedMachineId }).then((res) => {
        if (res.status === 200) {
          setMachineParams(res.data.data);
        } else {
          showErrors(res);
        }
      });
    } else {
      form.resetFields();
    }
  }, [selectedMachineId]);

  const onFinish = (values) => {
    console.log(values);
    const allValues = { ...values, params: filteredParams };
    create(allValues).then((res) => {
      if (res.status === 201) {
        getList({ limit: 10, page: 1 });
        message.success({
          content: "Успешно создано",
        });
        form.resetFields();
        localStorage.setItem("selectedValues", JSON.stringify([]));
        navigate(-1);
      } else {
        showErrors(res);
      }
    });
  };
  return (
    <>
      <Card>
        <Typography.Title level={2} style={{ marginTop: 0, color: "#3C8CDC" }}>
          Техника параметров фильтра
        </Typography.Title>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Укажите тип техники данного тарифа"
            name="machineId"
            rules={[{ required: true, message: "Выберите тип техники" }]}
          >
            <Select
              style={{ width: 200 }}
              showSearch
              allowClear
              loading={listLoading}
              disabled={listLoading}
              placeholder="Выберите категорию"
              onChange={(e) => {
                setSelectedMachineId(e);
              }}
            >
              {machines.map((category, index) => (
                <Option key={index} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {selectedMachineId ? (
            <Form.Item>
              {machineParams.map((machine, index) => {
                return (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <h3>{machine.name}</h3>
                    <Radio.Group
                      buttonStyle="solid"
                      optionType="button"
                      value={
                        selectedValues[machine.nameEn.replaceAll(" ", "_")] ||
                        ""
                      }
                      onChange={(e) =>
                        handleRadioChange(e.target.value, machine.nameEn)
                      }
                    >
                      {machine.params.map((param, index) => (
                        <Radio key={index} value={param.param}>
                          {param.param}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                );
              })}
              <Button
                type="primary"
                onClick={handleSubmit}
                disabled={Object.keys(selectedValues).length === 0}
                style={{ marginTop: "20px" }}
              >
                Добавить в избранное.
              </Button>
            </Form.Item>
          ) : (
            ""
          )}
          {filteredParams && filteredParams.length > 0 ? (
            <div style={{ marginTop: "20px" }}>
              <Typography.Title level={4}>Tanlangan Filtrlar</Typography.Title>
              {filteredParams.map((param, index) => (
                <Card
                  key={index}
                  style={{
                    display: "inline-flex",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {Object.entries(param).map(([key, value]) => (
                    <p key={key} style={{ margin: 0 }}>
                      <strong>{key}:</strong> {String(value)}
                    </p>
                  ))}
                </Card>
              ))}
            </div>
          ) : (
            <Typography.Title level={3}>
              Пока фильтр не добавлен.
            </Typography.Title>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={createLoading}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ParamsFilterCreatePage;
