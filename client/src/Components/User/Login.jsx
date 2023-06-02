import React, {Fragment, useRef} from 'react';
import {Link} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../Helper/FromHelper";
import {LoginRequest} from "../../APIRequest/UsersAPI";

const Login = () => {

    let passRef, emailRef = useRef();

    const SubmitLogin = async ()=>{
        let email = emailRef.value;
        let password = passRef.value;
        if (IsEmail(email)){
            ErrorToast("Invalid Email Address")
        }else if(IsEmpty(password)){
            ErrorToast("Password Required")
        }else {
            debugger;
            let result = await LoginRequest(email,password)
            debugger;
            if (result){
                window.location.href="/"
            }
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h3>SIGN IN</h3>
                                <br/>
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control" type="password"/>
                                <br/>
                                <button onClick={SubmitLogin}  className="btn btn-success w-100 animated ">Next</button>
                                <div className="float-none mt-3">
                                    <span>
                                        <Link className="text-center ms-3 h6" to="/Registration">Sign Up</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;