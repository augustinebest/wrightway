import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Components/Homepage';
import AdminLogin from './Components/Auth/AdminLogin';
import Dashboard from './Components/Layouts/Dashboard';
import MarkAttendance from './Components/Layouts/MarkAttendance';
import Applications from './Components/Layouts/Applications';
import Materials from './Components/Layouts/Materials';
import AllWorkers from './Components/Layouts/AllWorkers';
import Expenses from './Components/Layouts/Expenses/ExpenseLayout';
import Costs from './Components/Layouts/Costs';
import ProfilePage from './Components/Layouts/ProfilePage';
import SetSalary from './Components/Layouts/SubLayout/SetSalary';
import AttendanceOverview from './Components/Layouts/SubLayout/AttendanceOverview';
import Errror from './Components/Error';

const Router = () => {
    return (
        <div>
            <Switch>
                <Route path='/' exact strict component={Homepage} />
                <Route path='/admin/login' exact strict component={AdminLogin} />
                <Route path='/dashboard' exact strict component={Dashboard} />
                <Route path='/dashboard/attendance' exact strict component={MarkAttendance} />
                <Route path='/dashboard/applications' exact strict component={Applications} />
                <Route path='/dashboard/materials' exact strict component={Materials} />
                <Route path='/dashboard/all-workers' exact strict component={AllWorkers} />
                <Route path='/dashboard/expenses' exact strict component={Expenses} />
                <Route path='/dashboard/costs' exact strict component={Costs} />
                <Route path='/dashboard/:id/profile' exact strict component={ProfilePage} />
                <Route path='/dashboard/:id/profile/set-salary' exact strict component={SetSalary} />
                <Route path='/dashboard/:id/profile/attendance-overview' exact strict component={AttendanceOverview} />
                <Route path='/dashboard/:id/profile/debit' exact strict component={Errror} />
                <Route path='/dashboard/:id/profile/credit' exact strict component={Errror} />
                <Route path='/dashboard/:id/profile/role' exact strict component={Errror} />
                <Route path='/dashboard/:id/profile/net-salary' exact strict component={Errror} />
                <Route path='*' exact strict component={Errror} />
            </Switch>
        </div>
    )
}
export default Router;