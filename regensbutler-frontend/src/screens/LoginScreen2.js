import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import PersonIcon from "@material-ui/icons/Person";
import Snackbar from "../components/Snackbar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import Spinner from "../components/Spinner";
import { login } from "../actions/userActions";
import { getRandomString } from "../constants/secretCode";
import { ENDPOINTURL0, ENDPOINTURL1 } from "../constants/config";
import { resendMail } from "../actions/userActions";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Regensbutler
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    float: "left",
    borderRadius: 3,
    textAlign: "center",
    height: 45,
    background: "#b7de01",
    boxShadow: "0px 5px #6b6d5f",
    color: "#000",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      background: "#99ba01",
      boxshadow: "0px 4px #435100",
      color: "#fff",
    },
    "&:active": {
      boxshadow: "0px 0px #717a33",
    },
  },
  LoginBox: {
    padding: "30px 70px",
    background: "#fff",
    borderRadius: 5,
    boxShadow: "0px 0px 10px rgba(0,0,0,.2)",
    marginTop: theme.spacing(18),
  },
  PassForm: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "right",
  },
}));

export default function LoginScreen({ location, history }) {
  const classes = useStyles();
  const [logerror, setLogerror] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isRegister === true) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        history.push(redirect);
      } else {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: null });
        setLogerror(true);
      }
    }
  }, [history, userInfo, redirect, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleSendmail = () => {
    var secrt = getRandomString();
    var port = window.location.port;
    var axios = require("axios");

    var resdata = JSON.stringify({
      email: email,
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
          history.push("/register-confirm");
          dispatch(resendMail({ secret: secrt, email: email }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.LoginBox}>
      {error && (
        <Snackbar
          severity={"error"}
          alert={"Falscher Benutzername oder falsches Passwort:"}
        />
      )}
      {loading && <Spinner />}
      <div>
        <Dialog
          open={logerror}
          onClose={() => {
            setLogerror(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sie haben eine E-Mail von uns erhalten. Bitte bestätigen Sie vor
              der ersten Anmeldung den Verifizierungscode. Danke!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setLogerror(false);
              }}
              color="secondary"
              variant="contained"
            >
              Disagree
            </Button>
            <Button
              onClick={handleSendmail}
              color="primary"
              variant="contained"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <OutlinedInput
              variant="outlined"
              required
              fullWidth
              id="email"
              placeholder={"Email Adresse"}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.PassForm}>
            <Link href="/passwort-vergessen" variant="body2">
              Passwort vergessen?
            </Link>
          </div>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <OutlinedInput
              placeholder={"Password"}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container style={{ justifyContent: "center" }}>
            <Grid item>
              <Link
                href={redirect ? `/register?redirect=${redirect}` : "/register"}
                variant="body2"
              >
                {"Noch keinen Account? Registrieren!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
