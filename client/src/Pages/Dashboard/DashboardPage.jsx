import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../Components/MasterLayout/Master-Layout";
import LazyLoader from "../../Components/MasterLayout/LazyLoader";
import Dashboard from "../../Components/Dashboard/Dashboard";

const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;