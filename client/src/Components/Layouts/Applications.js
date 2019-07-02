import React, { Fragment, Component } from 'react';
import Bodywrapper from './BodyWrapper';
import './Layout.css';
import axios from 'axios';
import { Url } from '../Factories';
import Loader from '../loader/Loader';
import $ from 'jquery';
import A from './img/avatar1.png'

class EmpApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            middleName: null,
            lastName: null,
            email: null,
            nationality: null,
            address: null,
            stateOfOrigin: null,
            role: 'select',
            localGovtArea: null,
            town: null,
            religion: 'select',
            phoneNumber: null,
            sex: 'select',
            passport: null,
            age: null,
            maritalStatus: 'select',
            prySch: '',
            secSch: '',
            college: '',
            courseOfStudy: '',
            loading: false,
            progress: '0'
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }
    selectRole = (e) => {
        this.setState({
            role: e.target.value
        })
    }
    selectReligion = (e) => {
        this.setState({
            religion: e.target.value
        })
    }
    selectGender = (e) => {
        this.setState({
            sex: e.target.value
        })
    }
    selectMaritalStatus = (e) => {
        this.setState({
            maritalStatus: e.target.value
        })
    }
    fileSelectedHandler = (e) => {
        this.setState({
            passport: e.target.files[0]
        })
        if(e.target.files[0]) {
          var reader = new FileReader();
          reader.onload = function(b) {
            $('#img').attr('src', b.target.result).width(180).height(200)
          }
          reader.readAsDataURL(e.target.files[0])
        }
    }
    submit = (e) => {
        e.preventDefault();
        var token = JSON.parse(sessionStorage.getItem('hytjz'));
        var companyId = JSON.parse(sessionStorage.getItem('company'));
        var { firstName, middleName, lastName, email, nationality, address, stateOfOrigin, role, localGovtArea, town, religion, phoneNumber, sex, passport, age, maritalStatus, prySch, secSch, college, courseOfStudy } = this.state;
        console.log(firstName, middleName, lastName, email, nationality, address, stateOfOrigin, role, localGovtArea, town, religion, phoneNumber, sex, passport, age, maritalStatus, prySch, secSch, college, courseOfStudy)
        var fullName = firstName+' '+lastName+' '+middleName;
        if (!(/\.(jpe?g|png|gif)$/i.test(passport.name))) {
          alert('You cannot upload file of this nature')
        } else {
          if(passport.size >= 1048576) {
              alert('image too large')
            } else {
              this.setState({
                  loading: true
              })
              const fd = new FormData();
              fd.append('fullName', fullName);  fd.append('email', email); fd.append('nationality', nationality); fd.append('address', address); fd.append('stateOfOrigin', stateOfOrigin); fd.append('role', role);
              fd.append('localGovtArea', localGovtArea); fd.append('town', town); fd.append('religion', religion); fd.append('phoneNumber', phoneNumber); fd.append('sex', sex); 
              fd.append('passport', passport); fd.append('age', age); fd.append('maritalStatus', maritalStatus); fd.append('prySch', prySch); fd.append('secSch', secSch);
              fd.append('college', college); fd.append('courseOfStudy', courseOfStudy); fd.append('token', token); fd.append('companyId', companyId);
              axios.post(`${Url}/admin/create`, fd, {
                headers: {"Authorization": `Bearer ${token}`}
              }).then(res => {
                // console.log(res)
                  if(res.data.code === 200) {
                      alert(res.data.message);
                      this.setState({
                          loading: false
                      })
                  } else {
                      alert(res.data.message);
                      this.setState({
                          loading: false
                      })
                  }
              })
          }
      }
    }
    trigger = () => {
      $(this.refs['fileRef']).click();
    }
    render() {
        const { role, religion, sex, maritalStatus, loading } = this.state;
        return (
            <Fragment>
                {
                    loading &&
                    <Loader />
                }
                <div className='dashboard__tag'>APPLICATION FORM</div>
                <div className='emp__base'>
                    <div style={{padding: '20px 20px 20px 20px'}} className="row">

                    <form onSubmit={this.submit}>
                    <div className="col-md-4 box_div">
                        <div className="block__form">
                            <div className='labels'>First Name</div>
                            <input 
                                type='text'
                                name='firstName'
                                required
                                onChange={this.handleChange}
                            />
                            <div className='labels'>Middle Name (Optional)</div>
                            <input 
                                type='text'
                                name='middleName'
                                onChange={this.handleChange}
                            />
                            <div className='labels'>Last Name</div>
                            <input 
                                type='text'
                                name='lastName'
                                required
                                onChange={this.handleChange}
                            />
                            <div className='labels'>Email</div>
                            <input 
                                type='email'
                                name='email'
                                onChange={this.handleChange}
                            />
                            <div className='labels'>Nationality</div>
                            <input 
                                    type='text'
                                    name='nationality'
                                    required
                                    onChange={this.handleChange}
                                />
                            <div className='labels'>Home Address</div>
                            <input 
                                type='text'
                                name='address'
                                required
                                onChange={this.handleChange}
                            />
                            <div className='labels'>State of origin</div>
                            <input 
                                type='text'
                                name='stateOfOrigin'
                                required
                                onChange={this.handleChange}
                            />
                            <div className="form-group">
                                <div className='labels'>Role</div>
                                <select className="form-control" id="sel1" onChange={this.selectRole} value={role}>
                                    <option disabled value="select">--Select Role--</option>
                                    <option value="Factory">Factory Worker</option>
                                    <option value="Driver">Driver</option>
                                    <option value="Operator">Operator</option>
                                </select>
                                </div>
                        </div>
                    </div>

                    <div className="col-md-4 box_div">
                        <div className="block__form">
                            <center><div style={{maxWidth: '270px', height: '250px', border: '2px solid rgb(5, 58, 138);', boxShadow: '-1px 4px 10px rgb(134, 119, 119'}}>
                              <center><div ><img id='img' style={{width: '180px', height: '205px', margin: '5px 0px'}} src={A} alt='' /></div></center>
                              <div className="button_upload1" onClick={this.trigger}>Upload Image</div>
                            </div></center>
                            <input style={{display: 'none'}} ref='fileRef'
                                type='file'
                                required
                                onChange={this.fileSelectedHandler}
                            /><br />
                            <div className='labels'>Local Govt. Area</div>
                            <input 
                                type='text'
                                name='localGovtArea'
                                required
                                onChange={this.handleChange}
                            />
                            <div className='labels'>Town</div>
                            <input 
                                type='text'
                                name='town'
                                required
                                onChange={this.handleChange}
                            />
                            <div className="form-group">
                                <div className='labels'>Religion</div>
                                <select className="form-control" id="sel1" onChange={this.selectReligion} value={religion}>
                                    <option disabled value="select">--Select Religion--</option>
                                    <option value="Christianity">Christianity</option>
                                    <option value="Islamic">Islamic</option>
                                </select>
                                </div> 
                            <div className='labels'>Phone Number</div>
                            <input 
                                type='text'
                                name='phoneNumber'
                                required
                                onChange={this.handleChange}
                              />
                        </div>
                    </div>
                    <div className="col-md-4 box_div">
                        <div className="block__form">
                              <div className="form-group">
                                <div className='labels'>Sex</div>
                                <select className="form-control" id="sel1" onChange={this.selectGender} value={sex}>
                                    <option disabled value="select">--Select Gender--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                </div>
                                <div className='labels'>Age</div>
                                <input 
                                    type='text'
                                    name='age'
                                    required
                                    onChange={this.handleChange}
                                />
                                <div className="form-group">
                                <div className='labels'>Marital Status</div>
                                <select className="form-control" id="sel1" onChange={this.selectMaritalStatus} value={maritalStatus}>
                                    <option disabled value="select">--Select Status--</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                                </div> <br />
                                
                                <div className='labels'>Primary School Education</div>
                                <input 
                                    type='text'
                                    name='prySch'
                                    onChange={this.handleChange}
                                />
                                <div className='labels'>Secondary School Education</div>
                                <input 
                                    type='text'
                                    name='secSch'
                                    onChange={this.handleChange}
                                />
                                <div className='labels'>University/Poly</div>
                                <input 
                                    type='text'
                                    name='college'
                                    onChange={this.handleChange}
                                />
                                <div className='labels'>Course of Study</div>
                                <input 
                                    type='text'
                                    name='courseOfStudy'
                                    onChange={this.handleChange}
                                /><br />
                        <center><button className="button_upload" type='submit'>Submit</button></center>
                        </div>
                    </div>
                        </form>
                </div>
                </div>

                {/* Guarantor Fields */}

            </Fragment>
        )
    }
}

export default Bodywrapper()(EmpApplications);