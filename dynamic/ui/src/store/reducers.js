import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {registrationReducer} from "./registration/reducers";
import {mainReducer} from "./main/reducers";

export default combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    main: mainReducer
});
