import { message } from "antd";

export const showErrors = (errors: any) => {
  if (errors?.answereComment) {
    message.error({
      content: errors?.answereComment,
    });
  } else if (errors?.answereMessage) {
    message.error({
      content: errors?.answereMessage,
    });
  } else {
    message.error({
      content: errors?.message,
    });
  }
};
