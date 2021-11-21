import { Header } from "./Header";

export default {
  title: "Header",
  component: Header,
};

export const HeaderComponent = (args) => {
  return <Header {...args} />;
};

HeaderComponent.args = {};
