import {setToken, setUserDetails} from "../Helper/SessionHelper";
import store from "../Redux/store/store";
import {HideLoader, ShowLoader} from "../Redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../Helper/FromHelper";
import {BaseURL} from "../Helper/config";


export async function RegistrationRequest(email,name,password){
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL + "/register";
        let PostBody={email:email,name:name,password:password}
        let res = await axios.post(URL,PostBody)
        store.dispatch(HideLoader())
        if (res.status===200){
            if (res.data['status']==="fail"){
                if (res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist");
                    return false;
                }else {
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }else {
                SuccessToast("Registration Success");
                return true;
            }
        }else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }catch (e) {
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    }
}


export async function LoginRequest(email,password){
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/login";
        let PostBody = {"email":email, "password":password};
        let res = await axios.post(URL,PostBody);
        debugger
        setToken(res.data['token']);
        debugger
        setUserDetails(res.data['data']);
        SuccessToast("Login Success");
        store.dispatch(HideLoader());
        return true;
    }catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Invalid Email or Password")
        return false;
    }
}