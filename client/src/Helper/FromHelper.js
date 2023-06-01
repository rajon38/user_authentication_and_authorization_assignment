import cogoToast from "@successtar/cogo-toast";
let EmailRegx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class FromHelper{
    IsEmpty(value){
        return value.length === 0;
    }
    IsEmail(value){
        return !EmailRegx.test(value);
    }
    ErrorToast(msq){
        cogoToast.error(msq, {position: "bottom-center"});
    }
    SuccessToast(msg){
        cogoToast.success(msg,{position: "bottom-center"})
    }
}

export const {IsEmpty,IsEmail,ErrorToast,SuccessToast} = new FromHelper();