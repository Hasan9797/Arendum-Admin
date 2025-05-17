import React, { useState } from "react";
import { Button, Card, List, Typography } from "antd";
import { Helmet } from "react-helmet-async";
import DeleteUserWithModal from "../../components/dashboard/default/DeleteUser/DeleteUserWithModal";
import { ArendumLogo } from "../../assets/icons";

const DeleteUser: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <Helmet>
        <title>Arendum - Delete Account</title>
      </Helmet>
      <div style={{ padding: "20px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <ArendumLogo width={300} height={100} />
        </div>

        <Card
          style={{
            backgroundColor: "#ffebee",
            borderRadius: "8px",
          }}
        >
          <Typography.Title level={2} style={{ color: "red", marginTop: 0 }}>
            Внимание
          </Typography.Title>
          <Typography.Paragraph>
            Удаление учетной записи ARENDUM PRO означает прощание с:
          </Typography.Paragraph>
          <List
            size="small"
            dataSource={[
              "* История заказов: Ваша история заказов будет удалена.",
              "* Награды и баллы: накопили кучу наград? Пуф! Они исчезнут вместе с вашей учетной записью.",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Typography.Paragraph style={{ marginTop: "20px" }}>
            Держаться секунду! Вы можете удалить свою учетную запись только один
            раз в месяц. Это всего лишь мера безопасности для обеспечения
            безопасности вашей учетной записи.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Все еще хотите удалить? Мы понимаем. Если вы уверены, продолжайте.
            Но если у вас есть какие-либо вопросы или вы хотите поговорить о
            состоянии вашего аккаунта, наша дружная команда поддержки ARENDUM
            всегда рада помочь!
          </Typography.Paragraph>
          <Typography.Paragraph>
            <a href="mailto:info@arendum.uz">info@arendum.uz.ru</a>
          </Typography.Paragraph>
          <Button
            type="primary"
            danger
            style={{ marginTop: "20px" }}
            onClick={showModal}
          >
            Удалить аккаунт
          </Button>
        </Card>
      </div>
      <DeleteUserWithModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default DeleteUser;
