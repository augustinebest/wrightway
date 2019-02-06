import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css';
import DrawerToggleButton from '../Sidebar/DrawerToggleButton';
import $ from 'jquery';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
        this._toggleDivs = this._toggleDivs.bind(this)
      }
      
      _toggleDivs() {
        $(this.refs['toggle-div']).slideToggle()
      }

      logout = () => {
        sessionStorage.clear();
        window.location.href = '/admin/login';
    }

    render() {
        const ID = JSON.parse(sessionStorage.getItem('hytjz'));
        if(!ID) {
            window.location = '/admin/login'
        } else {
            return (
            <header className='toolbar'>
                <nav className='toolbar__navigation'>
                    <div className='toolbar__toggle-button'>
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                    </div>
                    <Link to='/'><div className='toolbar__logo'>THE LOGO</div></Link>
                    <div className='spacer'/>
                    <ul className='toolbar_navigation-itemsa' onClick={this._toggleDivs}>
                        <li><button><i className="fa fa-search searcha"></i></button></li>
                    </ul>
                    <div className='toolbar_navigation-items'>
                        <ul>
                            <li><form><input type='text' /><button><i className="fa fa-search"></i></button></form></li>
                            <Link to='/'><li><i className="fa fa-bell"></i> Notification<span className="notification-count1"> 0 </span></li></Link>
                            <li onClick={this.logout}><i className="fa fa-sign-out"></i> Logout</li>
                        </ul>
                    </div>
                </nav>

                    <div style={{display: 'none'}} ref="toggle-div" className='toggle__search'></div>
            </header>
        )
        }
    }
}

export default Toolbar;