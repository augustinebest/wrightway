import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sideDesktop.css';

class Sidedrawer extends Component {
  
  render() {
    return (
      <Fragment>
            <nav className='side-drawer1'>
            <div className='box'></div><br  /><br />
                <ul>
                        <NavLink to='/dashboard'><li className='sub-drop actives' ><i className='fa fa-clock-o'></i> Dashboard</li></NavLink>
                        <NavLink to='/dashboard/applications'><li className='sub-drop'><i className='fa fa-id-card-o'></i> Employee's Application</li></NavLink>
                        <NavLink to='/dashboard/attendance'><li className='sub-drop'><i className='fa fa-book'></i> Mark Attendance</li></NavLink>
                        <NavLink to='/dashboard/materials'><li className='sub-drop'><i className='fa fa-sitemap'></i> Prod. Raw Materials</li></NavLink>
                        <NavLink to='/dashboard/all-workers'><li className='sub-drop'><i className='fa fa-group'></i> All Workers</li></NavLink>
                        <NavLink to='/dashboard/costs'><li className='sub-drop'><i className='fa fa-mail-reply'></i> Expenses</li></NavLink>
                        <NavLink to='/dashboard/costs'><li className='sub-drop'><i className='fa fa-glass'></i> Stock</li></NavLink>
                        <NavLink to='/dashboard/costs'><li className='sub-drop'><i className='fa fa-database'></i> Today's Record</li></NavLink>
                </ul>
            </nav>
      </Fragment>
    );
  }
}

export default Sidedrawer;