import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
        <Accordion>
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
        </Accordion>
      </div>
    </li>
  );
};

export default MemoListItem;
