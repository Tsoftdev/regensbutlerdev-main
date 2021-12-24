import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Link as ReactRouterLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    backgroundColor: "#F8E6F9",
    paddingLeft: theme.spacing(8),
  },
  linkclass: {
    justifyContent: "space-between",
  },
  linkDesign: {
    color: "#666",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      color: "#111",
    },
  },
}));

const SidemenuDKatMatUi = ({ kat, dkat, ukat, setAllproducts, setParentOpen }) => {
  const classes = useStyles();
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;

  return (
    <>
      <ListItem className={`${classes.nested} ${classes.linkclass}`} button>
        <Link
          component={ReactRouterLink}
          className={classes.linkDesign}
          to={`/page/1?type=${sortiment_type}&key_kat=${kat}&key_ukat=${ukat}&key_dkat=${dkat}`}
          onClick={() => { setAllproducts([]); setParentOpen(false) }}
        >
          <ListItemText primary={dkat} />
        </Link>
      </ListItem>
    </>
  );
};

export default SidemenuDKatMatUi;
