// import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { FontStyle } from "../../../utility/Snippets";
import { useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const MemoListItem = ({ memo, id, date, drinkId }) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <SAccordion>
        <SAccordionContent>
          <p>{date}</p>
          <span
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ExpandMoreIcon />
          </span>
        </SAccordionContent>
        {open && (
          <SAccordionDesc>
            <p>{memo}</p>
            <div>
              <button>
                <CreateIcon />
              </button>
              <button>
                <DeleteIcon />
              </button>
            </div>
          </SAccordionDesc>
        )}
      </SAccordion>
    </li>
  );
};

const SAccordion = styled.div`
  width: calc(302 / 375 * 100vw);
  background-color: #212121;
  color: #fff;
  margin-top: calc(13 / 375 * 100vw);
  border: 1px solid #ac966f;
  border-radius: calc(5 / 375 * 100vw);
`;

const SAccordionContent = styled.div`
  display: flex;
  justify-content: center;
  height: calc(36 / 375 * 100vw);
  /* line-height: calc(36 / 375 * 100vw); */
  align-items: center;
  font-size: calc(13 / 375 * 100vw);
  letter-spacing: calc(1.3 / 375 * 100vw);
  ${FontStyle}
  position:relative;
  .MuiSvgIcon-root {
    font-size: calc(27 / 375 * 100vw);
    color: #ac966f;
    position: absolute;
    right: calc(15.5 / 375 * 100vw);
    top: 15%;
  }
`;

const SAccordionDesc = styled.div`
  border-top: 1px solid #ac966f;
  display: flex;
  flex-direction: column;
  padding: calc(12 / 375 * 100vw);
  p {
    line-height: calc(20 / 12);
    ${FontStyle}
    letter-spacing: calc(1.2 / 375 * 100vw);
    font-size: calc(12 / 375 * 100vw);
  }
  div {
    margin-top: calc(16.75 / 375 * 100vw);
    display: flex;
    justify-content: center;
    button {
      border: 1px solid #5c5a5a;
      border-radius: 50%;
      padding: calc(4 / 375 * 100vw);
      background-color: #212121;
      :hover {
        border: 1px solid #fff;
        .MuiSvgIcon-root {
          color: #fff;
        }
      }
      :nth-of-type(1) {
        margin-right: calc(14.1 / 375 * 100vw);
      }
    }
    .MuiSvgIcon-root {
      font-size: calc(27 / 375 * 100vw);
      color: #5c5a5a;
    }
  }
`;

export default MemoListItem;
