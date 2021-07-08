import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import BuildIcon from "@material-ui/icons/Build";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Footer = () => {
  return (
    <SFooterWrap>
      <SButton ontouchstart="">
        <HomeIcon />
      </SButton>
      <SButton ontouchstart="">
        <CreateIcon />
      </SButton>
      <SButton ontouchstart="">
        <BuildIcon />
      </SButton>
    </SFooterWrap>
  );
};

const SFooterWrap = styled.footer`
  width: 100vw;
  height: calc(48 / 375 * 100vw);
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(6 / 375 * 100vw) calc(27 / 375 * 100vw);
  position: fixed;
  bottom: 0; /* 上下の固定位置を上から0pxにする */
  left: 0; /* 左右の固定位置を左から0pxにする */
`;

const SButton = styled(Button)`
  .MuiSvgIcon-root {
    color: #5c5a5a;
    font-size: calc(29 / 375 * 100vw);
    :hover {
      color: #fff;
    }
  }
  :nth-of-type(2) {
    background-color: #fff;
    .MuiSvgIcon-root {
      color: #000;
    }
  }
`;

export default Footer;
