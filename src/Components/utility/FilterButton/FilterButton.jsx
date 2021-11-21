import styled from "styled-components";

export const FCFilterButton = ({
  className,
  label,
  start,
  end,
  onFocus,
  onClick,
  flag,
}) => {
  return (
    <button
      className={className}
      start={start}
      end={end}
      onFocus={onFocus}
      flag={flag}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const FilterButton = styled(FCFilterButton)`
  background-color: #212121;
  color: #ffffff;
  font: normal normal normal 12px/20px Hiragino Sans;
  letter-spacing: 3.6px;
  height: 28px;
  width: 193px;
  border: none;
  border-radius: 4px;
  font-weight: 200;
  ${({ start, end }) =>
    start &&
    end &&
    `border: 1px solid #fff;
    background-color: #414040;
    letter-spacing: 0.5px;
  `}
  ${({ flag }) =>
    flag >= "1" &&
    `border: 1px solid #fff;
    background-color: #414040;
  `}
`;
