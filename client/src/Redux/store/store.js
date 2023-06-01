import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import profileReducer from "../state-slice/profile-slice";
import protectedReducer from "../state-slice/protected-slice"


export default configureStore({
    reducer:{
        settings:settingsReducer,
        profile:profileReducer,
        protected:protectedReducer
    }
})