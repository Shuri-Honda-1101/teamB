import styled from "styled-components";
import logo from "../../../img/recholyLogo.svg";

export const FCHeader = ({ className }) => {
  return (
    <header className={className}>
      <img className={`${className}__logo`} src={logo} alt="Recholy" />
    </header>
  );
};

export const Header = styled(FCHeader)`
  width: 100vw;
  background-color: #000000;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0; /* 上下の固定位置を上から0pxにする */
  left: 0; /* 左右の固定位置を左から0pxにする */
  z-index: 2;
  &__logo {
    height: 44.75px;
  }
`;
