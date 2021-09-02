import logo from "../../img/recholyLogo.svg";
// import logo from "../../img/Recholy_f_res_w200_01.svg";

import styled from "styled-components";

const Header = () => {
  return (
    <SHeaderWrap>
      <SLogoImg src={logo} alt="Recholyロゴ" />
    </SHeaderWrap>
  );
};

const SHeaderWrap = styled.header`
  width: 100vw;
  background-color: #000000;
  height: calc(62 / 667 * 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0; /* 上下の固定位置を上から0pxにする */
  left: 0; /* 左右の固定位置を左から0pxにする */
  z-index: 2;
`;

const SLogoImg = styled.img`
  height: calc(44.45 / 375 * 100vw);
`;

export default Header;
