import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen2";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen2";
import RegisterScreen from "./screens/RegisterScreen";
import RegisterScreenConfirm from "./screens/RegisterScreenConfirm";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import LieferzeitpunktScreen from "./screens/LieferzeitpunktScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PasswortVergessenScreen from "./screens/PasswortVergessenScreen";
import PasswortResetScreen from "./screens/PasswortResetScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import DeliveryScheduleScreen from "./screens/DeliveryScheduleScreen";
import CookieConsent from "react-cookie-consent";
import cookieImg from "./images/cookie.png";
import Datenschutz from "./components/Datenschutz.js";
import SettingsScreen from "./screens/SettingsScreen";
import FrequentScreen from "./screens/FrequentScreen";
import FrequentListScreen from "./screens/FrequentListScreen";
import AboutScreen from "./screens/AboutScreen";
import HowItWorksScreen from "./screens/HowItWorksScreen";

const useStyles = makeStyles((theme) => ({
  container: {
    "@media (max-width: 456px)": {
      marginTop: 130,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className="App" id="scrollableDiv">
        <Header />

        <div className={classes.container}>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/lieferadresse" component={ShippingScreen} />
          <Route path="/lieferzeitpunkt" component={LieferzeitpunktScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/ueber" component={AboutScreen} />
          <Route path="/howitworks" component={HowItWorksScreen} />
          <Route
            path="/passwort-vergessen"
            component={PasswortVergessenScreen}
          />
          <Route path="/passwort-reset" component={PasswortResetScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/register-confirm" component={RegisterScreenConfirm} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/settings" component={SettingsScreen} />
          <Route path="/frequently" component={FrequentScreen} />
          <Route path="/admin/frequently" component={FrequentListScreen} />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/product/:pageNum/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route
            path="/admin/deliverySchedule"
            component={DeliveryScheduleScreen}
          />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />

          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </div>

        <Footer />
        <CookieConsent location="bottom" buttonText="Verstanden!" expires={60}>
          <div className="flex">
            <div>
              <img
                src={cookieImg}
                alt="cookie"
                style={{
                  maxWidth: "80px",
                  marginRight: "10px",
                }}
              />
            </div>
            <div className="flex items-center">
              Diese Website nutzt Cookies zur Verbesserung der Nutzererfahrung,
              sowie essentielle Cookies wie Warenkorb oder Loginstatus ohne
              diese die Website nicht benutzt werden kann. Bei Nutzung nicht
              essentieller Cookies werden Ihnen diese als An- und Abwahl
              angezeigt. Mit der weiteren Nutzung unserer Website akzeptieren
              Sie unsere Datenschutzerklärung:
            </div>
            <div className="flex items-center">
              <Datenschutz />
            </div>
          </div>
        </CookieConsent>
      </div>
    </Router>
  );
}

export default App;
