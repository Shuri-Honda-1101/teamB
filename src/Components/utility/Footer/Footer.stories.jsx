import { Footer } from "./Footer";
import React, { useState } from "react";
import StoryRouter from "storybook-react-router";

export default {
  title: "Footer",
  component: Footer,
  decorators: [StoryRouter()],
};

export const FooterComponent = (args) => {
  const [openModalItemChoice, setOpenModalItemChoice] = useState(false);
  return <Footer setOpenModalItemChoice={setOpenModalItemChoice} uid="uid" />;
};
