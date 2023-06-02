import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProtectedData} from "../../APIRequest/ProtectedAPI";
import {setAuthenticated} from "../../Redux/state-slice/protected-slice";
import {ErrorToast} from "../../Helper/FromHelper";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.protected.isAuthenticated);

    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const result = await getProtectedData();
                setData(result);
            } catch (e) {
                dispatch(setAuthenticated(false));
            }
        };
        fetchData();
    },[]);



    if(!data){
        return <div>Loading...</div>
    }

    if (!isAuthenticated){
        ErrorToast("You are not Authenticated. Please log in")
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h3>Welcome to the Dashboard</h3>
                                <br/>
                                <p>User-specific content: {data.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;