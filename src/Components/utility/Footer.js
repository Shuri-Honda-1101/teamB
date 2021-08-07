import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import BuildIcon from "@material-ui/icons/Build";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { AuthContext } from "./AuthService";
import { useContext } from "react";
import { withRouter } from "react-router-dom";

const Footer = ({ setOpenModalItemChoice, history }) => {
  const user = useContext(AuthContext);
  return (
    <SFooterWrap>
      <SButton
        onClick={() => {
          history.push(`/user/${user.uid}`);
        }}
      >
        <HomeIcon />
      </SButton>
      <SButton
        onClick={() => {
          setOpenModalItemChoice(true);
        }}
      >
        <CreateIcon />
      </SButton>
      <SButton onClick={() => history.push(`/config/${user.uid}`)}>
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
  z-index: 2;
`;

const SButton = styled(Button)`
  width: calc(58 / 375 * 100vw);
  min-width: calc(58 / 375 * 100vw);
  border-radius: calc(6 / 375 * 100vw);
  padding: calc(4 / 375 * 100vw) calc(17 / 375 * 100vw);
  .MuiSvgIcon-root {
    color: #5c5a5a;
    font-size: calc(30 / 375 * 100vw);
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

export default withRouter(Footer);
