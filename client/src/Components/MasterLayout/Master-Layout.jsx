import React, {Fragment} from "react";
import {Container,Navbar} from "react-bootstrap";
import logo from "../../Assets/Images/logo.svg";
import { removeSessions} from "../../Helper/SessionHelper";



const MasterLayout = () => {

    const onLogout=()=>{
        removeSessions();
    }





    return (
        <Fragment>
            <Navbar  className="fixed-top px-0 shadow-sm ">
                <Container fluid={true}>
                    <Navbar.Brand >
                        <img className="nav-logo mx-2"  src={logo} alt="logo"/>
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">

                                <a onClick={onLogout}  className="side-bar-item">
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                </Container>
            </Navbar>


        </Fragment>
    );
};

export default MasterLayout;