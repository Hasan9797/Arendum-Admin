/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Descriptions, DescriptionsProps, Image, Row, Switch } from "antd";
import { Card, RevenueCard } from "../../..";
import { useStylesContext } from "../../../../context";
import { IMAGES } from "../../../../assets/images/images";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../../../../hooks/user/useUser";

export const UserProfileDetailsPage = () => {
  const { id } = useParams();
  const stylesContext = useStylesContext();
  const { detail, getDetail } = useUser();
  // const [isActive, setIsActive] = useState(detail?.status === "active");
  // useEffect(() => {
  //   setIsActive(detail?.status === "active");
  // }, [detail]);

  useEffect(() => {
    if (id && open) {
      getDetail(id);
    }
  }, [id]);
  console.log(detail);
  // const handleStatusChange = async (checked) => {
  //   try {
  //     setIsActive(checked);
  //     await changeUserStatus(detail.id, {
  //       status: checked ? "active" : "non_active",
  //     });
  //     await getDetail(detail.id);
  //   } catch (error) {
  //     setIsActive(!checked);
  //     console.error("Statusni o'zgartirishda xatolik:", error);
  //   }
  // };

  // const onSave = async () => {
  //   await form.validateFields().then(() => {
  //     const values = form.getFieldsValue();
  //     let updatedUsers = null;

  //     // Agar roles string bo'lsa, uni massivga aylantiramiz
  //     if (typeof values.roles === "string") {
  //       updatedUsers = { ...values, roles: [values.roles] };
  //     } else {
  //       updatedUsers = values;
  //     }

  //     // Agar password uzunligi 0 yoki undefined bo'lsa, updatedUsersdan o'chiramiz
  //     if (!updatedUsers.password || updatedUsers.password.length === 0) {
  //       delete updatedUsers.password;
  //     }

  //     // Yangilanishni amalga oshiramiz
  //     update(id, updatedUsers).then((res) => {
  //       console.log(res);

  //       if (res.status === 200) {
  //         getList({ pageNumber: 1, pageSize: 20 });
  //         message.success({ content: "Ma'lumot yangilandi" });
  //         navigate(-1);
  //       } else {
  //         showErrors(res);
  //       }
  //     });
  //   });
  // };

  // const generatePassword = () => {
  //   const length = 6;
  //   const charset = "abcdefghijklmnopqrstuvwxyz";
  //   const password = Array.from(
  //     { length },
  //     () => charset[Math.floor(Math.random() * charset.length)]
  //   ).join("");
  //   setPassword(password);
  // };

  const DESCRIPTION_ITEMS: DescriptionsProps["items"] = [
    {
      key: "fullName",
      label: "F.I.Sh. / Tashkilot nomi",
      children: <span>{detail.fullName}</span>,
    },
    {
      key: "phone",
      label: "Telefon raqami",
      children: <span>{detail.phone}</span>,
    },
    {
      key: "region",
      label: "Foydalanuvchi mintaqasi",
      children: <span>{detail.region}</span>,
    },
    {
      key: "email",
      label: "Email manzili",
      children: (
        <span style={{ whiteSpace: "nowrap" }}>
          {detail.email || "Mavjud emas"}
        </span>
      ),
    },

    {
      key: "registrationDate",
      label: "Ro‘yxatdan o‘tish sanasi",
      children: (
        <span>{dayjs(detail?.registrationDate).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      key: "status",
      label: "Holati",
      children: (
        <Switch
          // checked={isActive}
          checkedChildren="АКТИВНИЫ"
          unCheckedChildren={"НЕАКТИВЕН"}
          // onChange={handleStatusChange}
          // disabled={
          //   (detail?.status?.length > 0 && detail?.status === "pending") ||
          //   detail?.status === "rejected"
          // }
        />
      ),
    },
  ];

  // useEffect(() => {
  //   form.setFieldsValue({
  //     login: detail?.login,
  //     role: detail?.role,
  //     serialNumber: detail?.serialNumber,
  //     pinpp: detail?.pinpp,
  //     doctype: detail?.doctype,
  //     region: detail?.region,
  //     permissions:
  //       detail?.permissions &&
  //       detail?.permissions?.length > 0 &&
  //       detail?.permissions.map((r) => r),
  //   });
  // }, [detail, form]);

  // const forms = [
  //   {
  //     label: "Логин",
  //     name: "login",
  //     required: true,
  //     message: "Заполните",
  //     child: (
  //       <Input
  //         disabled={isDisabled}
  //         onChange={(e) => form.setFieldValue("login", e.target.value)}
  //       />
  //     ),
  //   },
  //   {
  //     label: "Пароль",
  //     name: "password",
  //     message: "Заполните",
  //     child: (
  //       <Space.Compact style={{ width: "100%" }}>
  //         <Input
  //           value={password}
  //           disabled={isDisabled}
  //           onChange={(e) => {
  //             if (e.target.value.length > 0) {
  //               setPassword(e.target.value);
  //               form.setFieldValue("password", e.target.value);
  //             }
  //           }}
  //           suffix={
  //             <CopyOutlined
  //               onClick={() => copyText(password)}
  //               style={{ cursor: "pointer" }}
  //             />
  //           }
  //         />
  //         <MainButton
  //           onClick={generatePassword}
  //           disabled={isDisabled}
  //           type="primary"
  //           buttonText="Создать пароль"
  //         />
  //       </Space.Compact>
  //     ),
  //   },
  //   {
  //     label: "Серийный номер",
  //     name: "serialNumber",
  //     required: true,
  //     message: "Заполните",
  //     child: (
  //       <Input
  //         disabled={isDisabled}
  //         onChange={(e) => form.setFieldValue("serialNumber", e.target.value)}
  //       />
  //     ),
  //   },
  //   {
  //     label: "ПИНФЛ",
  //     name: "pinpp",
  //     required: true,
  //     message: "Заполните",
  //     child: (
  //       <Input
  //         disabled={isDisabled}
  //         onChange={(e) => form.setFieldValue("pinpp", e.target.value)}
  //       />
  //     ),
  //   },
  //   {
  //     label: "Роль",
  //     name: "role",
  //     required: true,
  //     message: "Заполните",
  //     child: (
  //       <Select
  //         showSearch
  //         allowClear
  //         loading={listLoading}
  //         disabled={isDisabled}
  //         filterOption={(
  //           inputValue,
  //           option: { label: string; value: string }
  //         ) =>
  //           option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
  //         }
  //         options={
  //           (user?.role === "admin" &&
  //             filterRoles?.map((item) => ({
  //               value: item.name,
  //               label: item.name.toUpperCase(),
  //             }))) ||
  //           (user?.role === "super_admin" &&
  //             roles?.map((item) => ({
  //               value: item.name,
  //               label: item.name.toUpperCase(),
  //             })))
  //         }
  //         onChange={(e) => form.setFieldValue("role", e)}
  //       />
  //     ),
  //   },
  //   {
  //     label: "Доступы",
  //     name: "permissions",
  //     required: true,
  //     message: "Заполните",
  //     child: (
  //       <TreeSelect
  //         showSearch
  //         style={{ width: "100%" }}
  //         value={value}
  //         dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
  //         placeholder="Please select"
  //         allowClear
  //         multiple
  //         disabled={isDisabled}
  //         treeDefaultExpandAll
  //         onChange={(e) => setValue(e)}
  //         treeData={
  //           filteredPermissions
  //             ? filteredPermissions.length > 0 &&
  //               filteredPermissions.map((permission) => ({
  //                 title: permission?.name.toUpperCase(),
  //                 value: permission.name,
  //               }))
  //             : ""
  //         }
  //       />
  //     ),
  //   },
  //   {
  //     label: "",
  //     name: "others",
  //     child: (
  //       <Row gutter={[16, 0]} justify="end">
  //         <Button
  //           type="primary"
  //           disabled={updateLoading}
  //           onClick={onSave}
  //           icon={<SaveOutlined />}
  //         >
  //           Save changes
  //         </Button>
  //         <Col>
  //           <Popconfirm
  //             title="Вы точно хотите удалить?"
  //             okText="Да"
  //             cancelText="Нет"
  //             onConfirm={() => {
  //               remove(id).then((res) => {
  //                 if (!res) {
  //                   message.success("Успешно удалено");
  //                   getList({
  //                     pageNumber: 1,
  //                     pageSize: 20,
  //                   });
  //                   navigate(-1);
  //                 }
  //               });
  //             }}
  //           >
  //             <Button
  //               disabled={detail?.status === "pending" ? true : false}
  //               type="primary"
  //               danger
  //               icon={<DeleteOutlined />}
  //             >
  //               Delete User
  //             </Button>
  //           </Popconfirm>
  //         </Col>
  //       </Row>
  //     ),
  //   },
  // ];

  return (
    <>
      {/* {detailLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Spin />
        </div>
      ) : ( */}
      <Row gutter={[16, 16]}>
        <Card>
          <Row {...stylesContext?.rowProps}>
            <Col
              xs={24}
              sm={6}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={IMAGES.userIcon}
                alt="user profile image"
                height="100%"
                width="100%"
                style={{ borderRadius: "10px" }}
              />
            </Col>
            <Col xs={24} sm={16} lg={20}>
              <Descriptions
                title={`Пользователи ИД:  ${detail.id} `}
                items={DESCRIPTION_ITEMS}
                column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
              />
            </Col>
          </Row>
        </Card>
        <Card style={{ width: "100%" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} lg={6} xl={8}>
              <RevenueCard
                title="ВСЕГО ЗАГАСОВ"
                value={15}
                diff={20}
                // loading={listLoading}
              />
            </Col>
            <Col xs={24} sm={12} lg={5} xl={8}>
              <RevenueCard
                title="НОВЫХ"
                value={23}
                diff={-20}

                // loading={listLoading}
              />
            </Col>
            <Col xs={24} sm={12} lg={6} xl={8}>
              <RevenueCard
                title="В ПРОГРЕССЕ"
                value={56}
                diff={20}

                // loading={listLoading}
              />
            </Col>
            <Col xs={24} sm={12} lg={6} xl={8}>
              <RevenueCard
                title="ОТМЕННЫЕ"
                value={16}
                diff={13}

                // loading={listLoading}
              />
            </Col>
            <Col xs={24} sm={12} lg={8} xl={8}>
              <RevenueCard
                title="ВЫПОЛНЕННЫХ"
                value={3079225}
                diff={20}

                // loading={listLoading}
              />
            </Col>
          </Row>
        </Card>
      </Row>
      {/* )} */}
    </>
  );
};
