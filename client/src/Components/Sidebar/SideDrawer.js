import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';

class Sidedrawer extends Component {

  logout = () => {
    sessionStorage.clear();
    window.location.href = '/admin/login';
}

  render() {
      let drawerClasses = 'side-drawer';
      if(this.props.show) {
          drawerClasses = 'side-drawer open'
      } 
    return (
      <Fragment>
            <nav className={drawerClasses}>
            <div className='box-mobile'></div><br  />
            <ul style={{margin: '0px', padding: '0px 0px 0px 5px'}}>
                <NavLink to='/dashboard'><li className='sub-drop actives' ><i className='fa fa-clock-o'></i> Dashboard</li></NavLink>
                <NavLink to='/dashboard/applications'><li className='sub-drop'><i className='fa fa-id-card-o'></i> Employee's Application</li></NavLink>
                <NavLink to='/dashboard/attendance'><li className='sub-drop'><i className='fa fa-book'></i> Mark Attendance</li></NavLink>
                <NavLink to='/dashboard/materials'><li className='sub-drop'><i className='fa fa-sitemap'></i> Prod. Raw Materials</li></NavLink>
                <NavLink to='/dashboard/all-workers'><li className='sub-drop'><i className='fa fa-group'></i> All Workers</li></NavLink>
                <NavLink to='/dashboard/costs'><li className='sub-drop'><i className='fa fa-mail-reply'></i> Expenses</li></NavLink>
                <NavLink to='/dashboard/stocks'><li className='sub-drop'><i className='fa fa-glass'></i> Stock</li></NavLink>
                <NavLink to='/dashboard/records'><li className='sub-drop'><i className='fa fa-database'></i> Today's Record</li></NavLink>
                <li onClick={this.logout} style={{backgroundColor: 'rgb(136, 6, 6)', color: '#fff', cursor: 'pointer'}} className='sub-drop'><i className='fa fa-sign-out'></i> Logout</li>
            </ul>
            </nav>
      </Fragment>
    );
  }
}

export default Sidedrawer;