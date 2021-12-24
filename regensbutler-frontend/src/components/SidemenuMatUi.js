import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import Loader from "./Loader";
import Spinner from "./Spinner";
import SearchBar from "material-ui-search-bar";
import { ListSubheader } from "@material-ui/core";
import SidemenuKatMatUi from "./SidemenuKatMatUi";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CustomScrollbars } from "./CustomScrollbar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  SORTIMENT_REQUEST,
  SORTIMENT_SUCCESS,
} from "../constants/sortimentonstants";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex-row",
    width: "100%",
  },
  paginateGrid: {
    display: "flex",
    margin: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  productItem: {
    minWidth: 250,
    height: 550,
  },
  appBar: {
    zIndex: 10,
    display: "flex",
    position: "sticky",
    top: 80,
    backgroundColor: "rgba(58,197,55,0.8)",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "@media (max-width: 467px)": {
      top: 140,
    },
  },
  appBarShift: {
    display: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    zIndex: 20,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    zIndex: 20,
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  searchBar: {
    margin: theme.spacing(2),
    backgroundColor: "white",
  },
}));

const PersistentDrawerLeft = ({
  kategorien,
  products,
  loadingCategories,
  pages,
  page,
  key_kat,
  key_ukat,
  key_dkat,
  setAllproducts,
  loading,
  keywordInBox,
  setKeywordInBox,
  submitHandler,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const refiScroll = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const sortimentType = useSelector((state) => state.sortimentType);
  const { sortimentType: sortiment_type } = sortimentType;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    function updateScrollPosition() {
      if (refiScroll.current !== null) {
        // console.log(page, pages, document.documentElement.scrollTop, refiScroll.current.scrollHeight)
        if (
          document.documentElement.scrollTop >= refiScroll.current.scrollHeight
        ) {
          if (page !== pages && page < pages)
            history.push(
              `/page/${
                page + 1
              }?type=${sortiment_type}&keyword=&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
            );
        }
      }
    }

    window.addEventListener("scroll", updateScrollPosition);
  }, [history, key_dkat, key_kat, key_ukat, page, pages, sortiment_type]);

  const [ex_sortiment, setEXSortiment] = React.useState(true);
  const [voll_sortiment, setVollSortiment] = React.useState(false);
  const [FLsortiment, setFLsortiment] = React.useState(false);

  const handleChangeType = (event) => {
    switch (event.target.name) {
      case "voll":
        setFLsortiment(true);
        break;
      case "express":
        setEXSortiment(event.target.checked);
        setVollSortiment(false);
        setAllproducts([]);
        dispatch({ type: SORTIMENT_REQUEST });
        dispatch({
          type: SORTIMENT_SUCCESS,
          payload: "PRIO",
        });
        history.push(
          `/page/1?type=PRIO&keyword=&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
        );
        break;
      default:
        break;
    }
  };

  const handleSearchVoll = () => {
    setFLsortiment(false);
    setVollSortiment(true);
    setEXSortiment(false);
    setAllproducts([]);
    dispatch({ type: SORTIMENT_REQUEST });
    dispatch({
      type: SORTIMENT_SUCCESS,
      payload: "VOLL",
    });
    history.push(
      `/page/1?type=VOLL&keyword=&key_kat=${key_kat}&key_ukat=${key_ukat}&key_dkat=${key_dkat}`
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <Dialog
          open={FLsortiment}
          onClose={() => {
            setFLsortiment(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>Sie wechseln nun in unseren Vollsortiment Bereich.</div>
              <div>Diese Waren sind nicht immer garantiert verfügbar</div>
              <div>und werden für Sie direkt aus einem Geschäft abgeholt!</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setFLsortiment(false);
              }}
              color="secondary"
              variant="contained"
            >
              Ablehnen
            </Button>
            <Button
              onClick={handleSearchVoll}
              color="primary"
              variant="contained"
              autoFocus
            >
              Verstanden
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Produktkategorien
            </Typography>
          </div>

          <FormGroup
            row
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <SearchBar
              className={classes.searchBar}
              placeholder="Produktsuche"
              value={keywordInBox}
              onChange={(newValue) => setKeywordInBox(newValue)}
              onRequestSearch={() => submitHandler(keywordInBox)}
              onCancelSearch={() => submitHandler("")}
            />
            <FormControlLabel
              style={{ marginBottom: 0 }}
              control={
                <Checkbox
                  checked={ex_sortiment}
                  onChange={handleChangeType}
                  name="express"
                />
              }
              label="Express Sortiment"
            />

            <FormControlLabel
              style={{ marginBottom: 0 }}
              control={
                <Checkbox
                  checked={voll_sortiment}
                  onChange={handleChangeType}
                  name="voll"
                />
              }
              label="Voll Sortiment"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item style={open ? { display: "initial" } : { display: "none" }}>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <CustomScrollbars
              autoHide
              autoHideTimeout={500}
              autoHideDuration={200}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List
                subheader={
                  <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    style={{
                      backgroundColor: "#61d15f",
                      color: "#fff",
                      fontSize: "1.2rem",
                    }}
                  >
                    Kategorien
                  </ListSubheader>
                }
              >
                {loadingCategories ? (
                  <Loader />
                ) : (
                  kategorien.map((kategorie, index) => (
                    <SidemenuKatMatUi
                      setParentOpen={setOpen}
                      setAllproducts={setAllproducts}
                      primary={kategorie.name}
                      links={kategorie.links}
                      key={index}
                    />
                  ))
                )}
              </List>
            </CustomScrollbars>
          </Drawer>
        </Grid>
        <Grid item>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <Grid
              container
              spacing={1}
              className={classes.productContainer}
              ref={refiScroll}
              style={{ overflow: "auto" }}
            >
              {products.map((product, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  xl={2}
                  className={classes.productItem}
                >
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </main>
        </Grid>
        {loading && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Spinner />
          </div>
        )}
      </Grid>
    </div>
  );
};

PersistentDrawerLeft.defaultProps = {
  products: [],
  pages: 0,
  page: 0,
};

export default PersistentDrawerLeft;
