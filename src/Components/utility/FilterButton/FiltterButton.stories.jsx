import { FilterButton } from "./FilterButton";

export default {
  title: "Button",
  component: FilterButton,
};

export const FilterButtonComponent = (args) => {
  return <FilterButton {...args} />;
};

FilterButtonComponent.args = {
  start: false,
  end: false,
  flag: false,
  label: "フィルターボタン",
};
