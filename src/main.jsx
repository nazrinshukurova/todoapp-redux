import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";

createRoot(document.getElementById("root")).render(
  //7.Wrap your main `App` component with the `Provider` and pass the
  // store to it.
  <Provider  store={store}>
    <App />
  </Provider>
);
