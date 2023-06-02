import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../Helper/FromHelper";
import {RegistrationRequest} from "../../APIRequest/UsersAPI";

const Registration = () => {

    let emailRef, nameRef, passwordRef = useRef();
    let navigate = useNavigate();

    const onRegistration = async ()=>{
        let email = emailRef.value;
        let name = nameRef.value;
        let password = passwordRef.value;

        if (IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        } else if(IsEmpty(name)){
            ErrorToast("Name Required !")
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required !")
        } else {
            let result = await RegistrationRequest(email,name,password)
            if (result === true){
                navigate("/login")
            }
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10 col-lg-10 center-screen">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4 className="text-start">Sign Up</h4>
                            <hr/>
                            <div className="row m-0 p-0">
                                <div className="col-md-4 text-start p-2">
                                    <label>Email Address</label>
                                    <input ref={(input) =>emailRef=input}  placeholder="User Email" className="form-control" type="email"/>
                                </div>
                                <div className="col-md-4 text-start p-2">
                                    <label>Name</label>
                                    <input ref={(input)=>nameRef=input} placeholder="User Name" className="form-control" type="text"/>
                                </div>
                                <div className="col-md-4 text-start p-2">
                                    <label>Password</label>
                                    <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control" type="password"/>
                                </div>

                            </div>
                            <div className="row m-0  p-0">
                                <div className="col-md-4 text-start p-2">
                                    <button onClick={onRegistration} className="btn w-100 mt-2 btn-success">Complete</button>
                                    <Link className="text-center ms-3 h5" to="/login">Sign In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;