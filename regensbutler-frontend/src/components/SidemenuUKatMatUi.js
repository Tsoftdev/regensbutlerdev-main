import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Link as ReactRouterLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SidemenuDKatMatUi from "./SidemenuDKatMatUi";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    backgroundColor: "#FBF7FB",
    paddingLeft: theme.spacing(4),
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

const SidemenuUKatMatUi = ({ ukat, sublinks, kat, setAllproducts, setParentOpen }) => {
  const classes = useStyles();
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        className={`${classes.nested} ${classes.linkclass}`}
        button
        onClick={handleOpen}
      >
        <Link
          component={ReactRouterLink}
          className={classes.linkDesign}
          to={`/page/1?type=${sortiment_type}&key_kat=${kat}&key_ukat=${ukat}`}
          onClick={() => { setAllproducts([]); setParentOpen(false) }}
        >
          <ListItemText primary={ukat} />
        </Link>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublinks.map((link, index) => (
            <SidemenuDKatMatUi
              setParentOpen={setParentOpen}
              kat={kat}
              ukat={ukat}
              dkat={link.title}
              key={index}
              setAllproducts={setAllproducts}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidemenuUKatMatUi;
