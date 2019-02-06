import React, { Fragment, Component } from 'react';
import axios from 'axios';
import BodyWrapper from '../BodyWrapper';
import './SubLayout.css'
import { Url } from '../../Factories';

class SetSalary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSalary: '',
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
            this.setState({
                [name]: value,
            })
    }

    handlePress = (e) => {
        var char = String.fromCharCode(e.which);
        if(!(/[0-9]/.test(char))) {
            e.preventDefault();
        }
    }

    submit = (e) => {
        const { newSalary } = this.state;
        const token = JSON.parse(sessionStorage.getItem('hytjz'));
        const id = this.props.match.params.id;
        const data = {
            newSalary: newSalary,
            workerId: id
        }
        e.preventDefault();
        if(newSalary.length < 0) {
            alert('You cannot submit an empty value');
        } else {
            axios.post(`${Url}/admin/ascribeSalary`, data, {
                headers: {"Authorization": `Bearer ${token}`}
              }).then(res => {
                  console.log(res)
                  if(res.data.code === 200) {
                      alert(res.data.message);
                  } else {
                      alert(res.data.message);
                  }
                  this.props.history.push(`/dashboard/${id}/profile`);
              })
        }
    }

    render() {
        const { newSalary } = this.state;
        return (
            <Fragment>
                <div className='emp__base1'>
                <div className='navigations'>DASHBOARD / ALL WORKERS / PROFILE / SET SALARY</div>
                    <div className='base_sublayout'>
                        <div className='row'>
                            <div className='col-md-3'>

                            </div>
                            <div className='col-md-9 content'>
                            <div className='main1'>  
                                Current Salary: 
                                <center>
                                    <div className='form_box'>
                                        <form onSubmit={this.submit}>
                                            <input 
                                                type='text'
                                                placeholder='Enter new salary...'
                                                name='newSalary'
                                                onChange={this.handleChange}
                                                onKeyPress={this.handlePress}
                                            /><br />
                                            <button>Set Salary</button>
                                        </form>
                                    </div>
                                </center>
                            </div>
                            </div>
                        </div>
                </div>
                </div>
            </Fragment>
        )
    }
}

export default BodyWrapper()(SetSalary);