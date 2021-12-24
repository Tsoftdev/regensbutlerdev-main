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
import SidemenuUKatMatUi from "./SidemenuUKatMatUi";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  openColor: {
    backgroundColor: "#ddd",
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

const SidemenuKatMatUi = ({ primary, links, setAllproducts, setParentOpen }) => {
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
        className={
          open
            ? `${classes.linkclass} ${classes.openColor}`
            : `${classes.linkclass}`
        }
        button
        onClick={handleOpen}
      >
        <Link
          component={ReactRouterLink}
          className={classes.linkDesign}
          to={`/page/1?type=${sortiment_type}&key_kat=${primary}`}
          onClick={() => { setAllproducts([]); setParentOpen(false) }}
        >
          <ListItemText primary={primary} />
        </Link>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {links.map((link, index) => (
            <SidemenuUKatMatUi
              setParentOpen={setParentOpen}
              sortiment_type={sortiment_type}
              ukat={link.title}
              kat={primary}
              sublinks={link.sublinks}
              key={index}
              setAllproducts={setAllproducts
              }
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidemenuKatMatUi;
