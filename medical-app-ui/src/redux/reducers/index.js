import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";
import logger from "../../components/More/Logger/Logger";
import auth from "./authReducers";
import service from "./serviceReducers";

const rootReducer = combineReducers({
  toastr,
  auth: logger(auth),
  service: logger(service),
});

export default rootReducer;
