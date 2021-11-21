import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const ButtonComponent = (args) => {
  return <Button {...args} />;
};

ButtonComponent.args = {
  long: true,
  label: "ログインボタン",
};
