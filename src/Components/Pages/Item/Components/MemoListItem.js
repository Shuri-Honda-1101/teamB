import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MemoListItem = ({ memo, id, date, drinkId }) => {
  const classes = useStyles();
  return (
    <li>
      <div className={classes.root}>
        <SAccordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{memo}</Typography>
            <Link to={`/edit/${drinkId}/${id}`}>編集</Link>
            <button>削除</button>
          </AccordionDetails>
        </SAccordion>
      </div>
    </li>
  );
};

const SAccordion = styled(Accordion)`
  width: calc(302 / 375 * 100vw);
  background-color: #212121;
  color: #fff;
  margin-top: calc(13 / 375 * 100vw);
  border: 1px solid #ac966f;
  border-radius: calc(5 / 375 * 100vw);
  .MuiAccordionSummary-root {
    padding: 0;
    height: calc(36 / 375 * 100vw);
  }
  .MuiTypography-root {
    font-size: calc(13 / 375 * 100vw);
    letter-spacing: calc(1.3 / 375 * 100vw);
    font-family: "ヒラギノ角ゴシック";
    font-weight: 100;
    margin: 0 auto;
  }
  .MuiAccordionSummary-content {
    margin: 0;
  }
  .MuiSvgIcon-root {
    color: #ac966f;
    font-size: calc(24 / 375 * 100vw);
  }
  .MuiAccordionSummary-expandIcon {
    padding: 0;
    margin-right: calc(-24 / 375 * 100vw);
    transform: translate(calc((-40.5) / 375 * 100vw), 0);
  }
`;

export default MemoListItem;
