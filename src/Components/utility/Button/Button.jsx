import styled, { css } from "styled-components";

export const FCButton = ({ className, label, long = false, onClick }) => {
  return (
    <button className={className} long={long} onClick={onClick}>
      {label}
    </button>
  );
};

export const Button = styled(FCButton)`
  border: none;
  background-color: #212121;
  color: #ffffff;
  font: normal normal normal 14px/24px Hiragino Sans;
  letter-spacing: 4.2px;
  height: 37px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  font-weight: 200;
  ${({ long }) =>
    long
      ? css`
          width: 302px;
        `
      : css`
          width: 237px;
        `};
  :hover {
    border: 1px solid #fff;
    background-color: #414040;
  }
`;
