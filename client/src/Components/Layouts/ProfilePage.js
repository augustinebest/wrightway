import React, { Fragment, Component } from 'react';
import Bodywrapper from './BodyWrapper';
import axios from 'axios';
import { Url } from '../Factories';
import { NavLink } from 'react-router-dom';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            userId: ''
        }
    }
    componentDidMount() {
        const token = JSON.parse(sessionStorage.getItem('hytjz'));
        const id = this.props.match.params.id;
        this.setState({
            userId: id
        })
        axios.get(`${Url}/admin/${id}/worker`, {
            headers: {"Authorization": `Bearer ${token}`}
          }).then(res => {
              if(res.data.code === 200) {
                  this.setState({
                      profile: res.data.message
                  })
              } else {
                      alert(res.data.message)
                }
            })
    }
  render() {
      const { profile, userId } = this.state;
      console.log('profile', profile.passport)
    return (
      <Fragment>
          <div className='dashboard__tag'>PROFILE INFORMATION</div><br />
          <div className='emp__base'>
            <div className='col-md-4 profile_page'>
                <div className='block__profile'>
                    <center><div style={{width: '250px', height: '200px', border: '1px solid rgb(0,30,74)'}}>
                    {
                        profile &&
                        <img width='230px' height='195px' src={profile.passport} alt='loading...' />
                    }
                    </div>
                    <div className='salary__base'>
                        <div className='salary__header'>Salary</div>
                        <div className='salary__body'>&#8358;{profile && profile.salary}</div>
                    </div><br />
                    <ul className='profile__options'>
                        <NavLink to={`/dashboard/${userId}/profile/set-salary`}><li>Set Salary</li></NavLink>
                        <NavLink to={`/dashboard/${userId}/profile/debit`}><li>Debit Worker</li></NavLink>
                        <NavLink to={`/dashboard/${userId}/profile/credit`}><li>Credit worker</li></NavLink>
                        <NavLink to={`/dashboard/${userId}/profile/role`}><li>Change Role</li></NavLink>
                        <NavLink to={`/dashboard/${userId}/profile/attendance-overview`}><li>Accumulated salary</li></NavLink>
                    </ul>
                    </center>
                </div>
            </div>
            
            <div className='col-md-8 profile_page'>
                <div style={{backgroundColor: '#f5f8fa', border: '1px solid #f00'}} className='block__profile'>
                    <div className='row'>
                        <div className='col-md-6'>
                            
                        </div>
                        <div className='col-md-6'>
                            
                        </div>
                    </div>
                {/* <center>
                    <div>
                        <div><span className='profile_label'>Full Name</span><span className='profile_content'>{profile && profile.fullName}</span></div>
                        <div><span className='profile_label'>Address</span><span className='profile_content'>{profile && profile.address}</span></div>
                        <div><span className='profile_label'>Phone Number</span><span className='profile_content'>{profile && profile.phoneNumber}</span></div>
                        <div><span className='profile_label'>ID No.</span><span className='profile_content'>{profile && profile.idNo}</span></div>
                        <div><span className='profile_label'>Email</span><span className='profile_content'>{profile && profile.email}</span></div>
                        <div><span className='profile_label'>Nationality</span ><span className='profile_content'>{profile && profile.nationality}</span></div>
                    </div>
                </center> */}
                </div>      
            </div>
          </div>
      </Fragment>
    );
  }
}

export default Bodywrapper()(ProfilePage);