import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import BuildIcon from "@material-ui/icons/Build";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const FCFooter = ({ className, setOpen, uid }) => {
  return (
    <footer className={className}>
      <div className={`${className}__content`}>
        <Link to={`/user/${uid}`}>
          <Button className={`${className}__button`}>
            <HomeIcon />
          </Button>
        </Link>
        <Button
          className={`${className}__button button_center`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <CreateIcon />
        </Button>
        <Link to={`/config/${uid}`}>
          <Button className={`${className}__button`}>
            <BuildIcon />
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export const Footer = styled(FCFooter)`
  width: 100vw;
  height: 48px;
  background-color: #000;
  position: fixed;
  bottom: 0; /* 上下の固定位置を上から0pxにする */
  left: 0; /* 左右の固定位置を左から0pxにする */
  z-index: 2;
  display: flex;
  align-items: center;

  &__content {
    width: 100%;
    padding: 0 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button {
    width: 58px;
    min-width: 58px;
    border-radius: 6px;
    padding: 4px 17px;
    .MuiSvgIcon-root {
      color: #5c5a5a;
      font-size: 30px;
      :hover {
        color: #fff;
      }
    }
  }
  .button_center {
    background-color: #fff;
    .MuiSvgIcon-root {
      color: #000;
    }
  }
`;
