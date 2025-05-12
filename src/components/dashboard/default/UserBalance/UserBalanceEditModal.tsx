import { Form, Input, message, Modal, Spin } from "antd";
import { FC, useEffect } from "react";
import useUserBalance from "../../../../hooks/userBalance/useUserBalance";
import { showErrors } from "../../../../errorHandler/errors";

interface UserBalanceEditModalProps {
  open: boolean;
  onCancel?: () => void;
  id?: string;
}

const UserBalanceEditModal: FC<UserBalanceEditModalProps> = ({ open, onCancel, id }) => {
  const {
    getDetail,
    getList,
    update,
    detail,
    updateLoading,
    detailLoading,
  } = useUserBalance();

  const [form] = Form.useForm();
console.log(detail)
  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (form && detail) {
      form.setFieldsValue({
        balance: detail?.balance,
      });
    }
  }, [detail, form]);

  const onSave = async () => {
    await form.validateFields().then(() => {
      const values = form.getFieldsValue();

      update(id, values).then((res) => {
        if (res) {
          getList({ page: 1, limit: 10 });
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
      label: "Баланс",
      name: "balance",
      required: true,
      message: "Заполните",
      child: (
        <Input type="number" onChange={(e) => form.setFieldValue("balance", e.target.value)} />
      ),
    },
   
  ];

  return (
    <>
      <Modal
        title={`ID: ${detail?.id}`}
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

export default UserBalanceEditModal;
