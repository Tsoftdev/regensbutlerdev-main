import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({
  severity,
  alert,
  posVert = "top",
  posHori = "right",
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const vertical = posVert;
  const horizontal = posHori;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  );
}
