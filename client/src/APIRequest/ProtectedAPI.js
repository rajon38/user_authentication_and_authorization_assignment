import {BaseURL} from "../Helper/config";
import {getToken} from "../Helper/SessionHelper";
import store from "../Redux/store/store";
import {HideLoader, ShowLoader} from "../Redux/state-slice/settings-slice";
import {ErrorToast, SuccessToast} from "../Helper/FromHelper";
import axios from "axios";
import {setAuthenticated} from "../Redux/state-slice/protected-slice";

const AxiosHeader= {headers:{"token":getToken()}}

export async function getProtectedData(){
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL + "/protected";
        let res = await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader());

        if (res.status === 200 && res.data['status'] === "success") {
            SuccessToast("Request Successful");
            store.dispatch(setAuthenticated(true))
            return  res.data;
        }
    }catch (e) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return e;
    }
}