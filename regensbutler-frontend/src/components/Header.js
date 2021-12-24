import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "../components/Snackbar";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Logo from "../images/logosmall.png";
import "./Header.css";
import { logout } from "../actions/userActions";
import CartManager from "./CartManager";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  NavbarToggleBox: {
    display: "flex",
  },
  NavbarToggle: {
    marginTop: "auto",
    marginBottom: "auto",
    height: 36,
  },
  CartManagerBox: {
    display: "none",
    "@media (max-width: 991px)": { display: "initial" },
  },
  CartManagerBox1: {
    display: "initial",
    "@media (max-width: 991px)": { display: "none" },
  },
  Container: {
    justifyContent: "center !important",
    "@media (max-width: 1023px)": { maxWidth: "100%" },
  },
}));

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const logoutHandler = () => {
    history.push("/");
    localStorage.removeItem("deliveryScheduleItems");
    localStorage.removeItem("deliveryDateItems");
    dispatch(logout());
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <header>
      {error && (
        <Snackbar severity={"success"} alert={"Abmelden erfolgreich"} />
      )}
      <Navbar
        className="bg-white shadow-sm fixed max-w-full z-20 mx-auto inset-x-0 top-0 flex justify-between items-center text-lg"
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
      >
        <Container className={classes.Container}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                className="header__logo"
                src={Logo}
                alt="Regensbutler Logo"
              />
            </Navbar.Brand>
          </LinkContainer>

          <div className={classes.NavbarToggleBox}>
            <div className={classes.CartManagerBox}>
              <CartManager />
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className={classes.NavbarToggle}
            />
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" style={{ alignItems: "center" }}>
              <LinkContainer to="/ueber">
                <Nav.Link>
                  <span className="text-black" style={{ whiteSpace: "nowrap" }}>
                    Über uns
                  </span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/howitworks">
                <Nav.Link>
                  <span className="text-black" style={{ whiteSpace: "nowrap" }}>
                    Wie funktonierts?
                  </span>
                </Nav.Link>
              </LinkContainer>

              <Nav.Link disabled>
                <span className="text-black" style={{ whiteSpace: "nowrap" }}>
                  <EmailIcon className="text-black" /> info@regensbutler.de
                </span>
              </Nav.Link>
              <Nav.Link disabled>
                <span className="text-black" style={{ whiteSpace: "nowrap" }}>
                  <PhoneIcon className="text-black" /> 0941 569 561 40
                </span>
              </Nav.Link>

              {userInfo && userInfo.isRegister ? (
                <NavDropdown title={userInfo.vorname} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <span className="text-lg">Mein Account</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/frequently">
                    <NavDropdown.Item>
                      <span className="text-lg">Meine Abonnements</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span className="text-lg">Ausloggen</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <PersonIcon />
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && userInfo.isRegister && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      <span className="text-lg">Benutzer</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist/1">
                    <NavDropdown.Item>
                      <span className="text-lg">Artikel</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/frequently">
                    <NavDropdown.Item>
                      <span className="text-lg">Abo Liste</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      <span className="text-lg">Bestellungen</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/deliverySchedule">
                    <NavDropdown.Item>
                      <span className="text-lg">Lieferdatum und -uhrzeit</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/settings">
                    <NavDropdown.Item>
                      <span className="text-lg">Einstellungen</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <div className={classes.CartManagerBox1}>
                <CartManager />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
