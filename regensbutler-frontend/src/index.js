import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import SimpleReactLightbox from "simple-react-lightbox";

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </Provider>,
  document.getElementById("root")
);
