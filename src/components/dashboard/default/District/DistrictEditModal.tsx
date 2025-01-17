import { Form, Input, message, Modal, Select, Spin } from "antd";
import { FC, useEffect } from "react";
import useStructure from "../../../../hooks/structure/useStructure";
import { showErrors } from "../../../../errorHandler/errors";
import useRegion from "../../../../hooks/region/useRegion";

interface StructureEditModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

const StructureEditModal: FC<StructureEditModalProps> = ({
  open,
  onCancel,
  id,
}) => {
  const {
    getDetail,
    getStructure,
    update,
    detail,
    updateLoading,
    detailLoading,
  } = useStructure();
  const { regions, getRegions, listLoading } = useRegion();

  const [form] = Form.useForm();

  useEffect(() => {
    if (id && open) {
      getDetail(id);
      getRegions({ page: 1, limit: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (form && detail) {
      form.setFieldsValue({
        regionId:
          regions?.find((region) => region.id == detail.regionId)?.nameRu || "",
        nameRu: detail?.nameRu,
        nameUz: detail?.nameUz,
      });
    }
  }, [detail, form]);

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      update(id, values).then((res) => {
        if (res) {
          getStructure({ page: 1, limit: 10 });
          message.success({ content: "Обновлено успешно" });
          onCancel();
        } else {
          showErrors(res);
        }
      });
    });
  };

  const forms = [
    {
      label: "Регион",
      name: "regionId",
      required: true,
      message: "Выберите регион",

      child: (
        <Select
          showSearch
          allowClear
          loading={listLoading}
          disabled={listLoading}
          filterOption={(inputValue, option: { label: string }) =>
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
          options={
            regions &&
            regions?.map((item) => {
              return {
                value: item.id,
                label: item.nameRu,
              };
            })
          }
        />
      ),
    },
    {
      label: "Имя ( RU )",
      name: "nameRu",
      required: true,
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("nameRu", e.target.value)} />
      ),
    },
    {
      label: "Имя ( UZ )",
      name: "nameUz",
      required: true,
      message: "Заполните",
      child: (
        <Input onChange={(e) => form.setFieldValue("nameUz", e.target.value)} />
      ),
    },
  ];

  return (
    <>
      <Modal
        title={`${detail?.nameRu}`}
        open={open}
        okText="Сохранить"
        onOk={() => {
          form.submit();
          onSave;
        }}
        confirmLoading={updateLoading}
        okButtonProps={{ disabled: updateLoading }}
        cancelText="Закрыть"
        onCancel={onCancel}
        width={1000}
        centered
      >
        {detailLoading ? (
          <Spin />
        ) : (
          <Form form={form} labelCol={{ span: 3 }} onFinish={onSave}>
            {forms.map((item, idx) => (
              <Form.Item
                key={idx}
                label={item.label}
                name={item.name}
                rules={[{ required: item.required, message: item.message }]}
              >
                {item.child}
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </>
  );
};

export default StructureEditModal;
