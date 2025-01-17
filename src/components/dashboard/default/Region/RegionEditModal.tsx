import { Form, Input, message, Modal, Spin } from "antd";
import { FC, useEffect } from "react";
import useRegion from "../../../../hooks/region/useRegion";
import { showErrors } from "../../../../errorHandler/errors";

interface RegionEditModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

const RegionEditModal: FC<RegionEditModalProps> = ({ open, onCancel, id }) => {
  const {
    getDetail,
    getRegions,
    update,
    detail,
    updateLoading,
    detailLoading,
  } = useRegion();

  const [form] = Form.useForm();

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (form && detail) {
      form.setFieldsValue({
        nameRu: detail?.nameRu,
        nameUz: detail?.nameUz,
      });
    }
  }, [detail, form]);

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const allValues = { ...values, name: "aaaa" };
      update(id, allValues).then((res) => {
        console.log(res);
        if (res) {
          getRegions({ page: 1, limit: 10 });
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
          <Form form={form} labelCol={{ span: 2 }} onFinish={onSave}>
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

export default RegionEditModal;
