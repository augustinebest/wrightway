import React, { Fragment, Component } from 'react';
import Navbar from '../Toolbar/Toolbar';
import SideDrawer from '../Sidebar/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import SideDesktop from '../Sidebar/sideDesktop';

function Bodywrapper() {
    return function (WrappedComponent) {
        class MainComponents extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    sideDrawerOpen: false
                  }
            }
            drawerClickHandler = () => {
                this.setState((prevState) => {
                  return {
                    sideDrawerOpen: !prevState.sideDrawerOpen
                  }
                })
              }
              backdropClickHandler = () => {
                this.setState({
                  sideDrawerOpen: false
                })
              }

              click = () => {
                  alert(1);
              }

            render() {
                let backdrop;
                if(this.state.sideDrawerOpen) {
                backdrop = <Backdrop click={this.backdropClickHandler}/>
                }
                return (
                    <Fragment>
                        <div style={{height: '100%'}}>
                        <Navbar drawerClickHandler={this.drawerClickHandler}/>
                        <SideDrawer show={this.state.sideDrawerOpen} />
                        {backdrop}
                        <main className='main'>
                        <SideDesktop />
                            <WrappedComponent {...this.props} />
                        </main>
                        </div>
                    </Fragment>
                )
            }
        }
        return MainComponents;
    }
}

export default Bodywrapper;