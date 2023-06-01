import React, {Fragment} from 'react';
import {getToken} from "./Helper/SessionHelper";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Page404 from "./Pages/NotFound/Page404";
import LoginPage from "./Pages/Users/LoginPage";
import RegistrationPage from "./Pages/Users/RegistrationPage";

const App = () => {
    if (getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<DashboardPage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />}/>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/registration" element={<RegistrationPage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }
};

export default App;