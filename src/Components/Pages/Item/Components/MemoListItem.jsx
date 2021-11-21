import { useState } from "react";

import styled from "styled-components";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

export const FCMemoListItem = ({
  setDeleteMemoId,
  setOpenModalDelete,
  setDeleteMemoDate,
  memo,
  id,
  date,
  setDeleteMessage,
  timestamp,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <li className={className}>
      <div className={`${className}__accordion_wrap`}>
        <div className={`${className}__accordion`}>
          <p>{date}</p>
          <span
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ExpandMoreIcon />
          </span>
        </div>
        {open && (
          <div className={`${className}__accordion_desc`}>
            <p>{memo}</p>
            <div>
              <button>
                <CreateIcon />
              </button>
              <button
                onClick={() => {
                  setDeleteMemoId(id);
                  setOpenModalDelete(true);
                  setDeleteMessage("メモ");
                  setDeleteMemoDate(timestamp);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export const MemoListItem = styled(FCMemoListItem)`
  &__accordion_wrap {
    width: 302px;
    background-color: #212121;
    color: #fff;
    margin-top: 13px;
    border: 1px solid #ac966f;
    border-radius: 5px;
  }

  &__accordion {
    display: flex;
    justify-content: center;
    height: 36px;
    align-items: center;
    letter-spacing: 1.3px;
    font: normal normal normal 13px/23px Hiragino Sans;
    position: relative;
    .MuiSvgIcon-root {
      font-size: 27px;
      color: #ac966f;
      position: absolute;
      right: 15.5px;
      top: 15%;
    }
  }

  &__accordion_desc {
    border-top: 1px solid #ac966f;
    display: flex;
    flex-direction: column;
    padding: 12px;
    p {
      font: normal normal normal 12px/20px Hiragino Sans;
      letter-spacing: 1.2px;
    }
    div {
      margin-top: 16.75px;
      display: flex;
      justify-content: center;
      button {
        border: 1px solid #5c5a5a;
        border-radius: 50%;
        padding: 4px;
        background-color: #212121;
        display: flex;
        align-items: center;
        :hover {
          border: 1px solid #fff;
          .MuiSvgIcon-root {
            color: #fff;
          }
        }
        :nth-of-type(1) {
          margin-right: 14.1px;
        }
      }
      .MuiSvgIcon-root {
        font-size: 27px;
        color: #5c5a5a;
      }
    }
  }
`;
