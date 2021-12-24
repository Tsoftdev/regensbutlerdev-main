import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "react-bootstrap";
import Snackbar from "../components/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { resendMail } from "../actions/userActions";
import { ENDPOINTURL0, ENDPOINTURL1 } from "../constants/config";
import { getRandomString } from "../constants/secretCode";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  textField: {
    width: "100%",
  },
  btnBox: {
    width: "100%",
    textAlign: "right",
    marginTop: theme.spacing(3),
  },
  btn: {
    margin: theme.spacing(1),
  },
  explainBox: {
    marginBottom: theme.spacing(3),
  },
  resend: {
    color: "#ef00ffd1",
    cursor: "pointer",
    borderBottom: "1px solid #ef00ffd1",
    "&:hover": {
      color: "#0043ffd9",
      borderBottom: "1px solid #0043ffd9",
    },
  },
}));

const RegisterScreenConfirm = ({ history }) => {
  const classes = useStyles();
  const [secretState, setSecret] = React.useState("");
  const [error, setError] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const [severity, setSeverity] = React.useState("error");
  const [disable, setDisable] = React.useState(true);
  const userRegister = useSelector((state) => state.userRegister);
  const { secretData } = userRegister;
  const dispatch = useDispatch();

  const submit = () => {
    if (secretState === "") {
      setError(true);
      setSeverity("error");
      setAlert("Bitte geben Sie den Geheimcode ein");
      setTimeout(() => {
        setError(false);
        setSeverity("");
      }, 3000);
    } else {
      if (secretData !== undefined) {
        if (secretState === secretData.secret) {
          var axios = require("axios");
          var port = window.location.port;
          var data = JSON.stringify({
            email: secretData.email,
          });

          var config = {
            method: "post",
            url: `${
              port ? ENDPOINTURL1 : ENDPOINTURL0
            }/api/users/updateUserRegister`,
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then(function (response) {
              if (response.status === 200) history.push("/login");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setError(true);
          setSeverity("error");
          setAlert("ungültiger Geheimcode");
          setTimeout(() => {
            setError(false);
            setSeverity("");
          }, 3000);
        }
      } else {
        setError(true);
        setSeverity("error");
        setAlert("Bitte senden Sie erneut einen Geheimcode.");
        setTimeout(() => {
          setError(false);
          setSeverity("");
        }, 3000);
      }
    }
  };

  const handleResend = () => {
    var secrt = getRandomString();
    var port = window.location.port;
    var axios = require("axios");
    var resdata = JSON.stringify({
      email: secretData.email,
      secret: secrt,
    });

    var config = {
      method: "post",
      url: `${port ? ENDPOINTURL1 : ENDPOINTURL0}/api/users/resendMail`,
      headers: {
        "Content-Type": "application/json",
      },
      data: resdata,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status) {
          dispatch(resendMail({ secret: secrt, email: secretState }));
          setError(true);
          setSeverity("success");
          setAlert("Senden Sie einen Geheimcode erneut.");
          setTimeout(() => {
            setError(false);
            setSeverity("");
          }, 3000);
          setSecret("");
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setSeverity("error");
        setAlert(error);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <Grid container className="xl:container mx-auto bg-white mt-20 p-0">
      <Grid item xs={12} sm={4}></Grid>
      <Grid item xs={12} sm={4} className={classes.root}>
        <div className={classes.explainBox}>
          <div className="text-xl">
            Wir haben einen Geheimcode an Ihre E-Mail gesendet.
          </div>
          <div className="text-xl">
            Bitte kopieren Sie den enthaltenen Geheimcode hier ein.
          </div>
          <div className="text-xl">
            Wenn Sie den Code nicht erhalten haben,{" "}
            <strong className={classes.resend} onClick={handleResend}>
              Geheimcode erneut senden
            </strong>
          </div>
          <div className="text-xl">
            Im Anschluss können Sie sich einloggen und haben Ihre E-Mail Adresse
            bestätigt.
          </div>
        </div>
        <TextField
          id="outlined-basic"
          label="Geheim Code"
          variant="outlined"
          className={classes.textField}
          value={secretState}
          onChange={(e) => {
            setSecret(e.target.value);
            if (e.target.value === "") setDisable(true);
            else setDisable(false);
          }}
        />
        <div className={classes.btnBox}>
          <Button
            variant="primary"
            onClick={submit}
            disabled={disable}
            autoFocus={disable}
          >
            Bestätigen
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        {error && <Snackbar severity={severity} alert={alert} />}
      </Grid>
    </Grid>
  );
};

export default RegisterScreenConfirm;
