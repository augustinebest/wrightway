import React, { Fragment, Component } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import { Url } from '../Factories';
import validate from '../../validate';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idNo: null,
            password: null,
            color: 'alert alert-danger',
            err: '',
            loading: false
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { idNo, password } = this.state;
        if(!validate('idNo', idNo)) {
            this.setState({
                err: 'The input you typed is invalid'
            })
        } else {
            this.setState({
                loading: true
            })
            const data = {
                idNo: idNo,
                password: password
            }
            axios.post(`${Url}/admin/login`, data).then(res => {
                if(res.data.code === 200) {
                    console.log(res)
                    this.setState({
                        err: res.data.message,
                        color: 'alert alert-success',
                        loading: false
                    })
                    sessionStorage.setItem('hytjz', JSON.stringify(res.data.token));
                    sessionStorage.setItem('company', JSON.stringify(res.data.comp));
                    setTimeout(() => {
                        this.props.history.push("/dashboard");
                    }, 2000)
                } else {
                    this.setState({
                        err: res.data.message,
                        loading: false
                    })
                }
            })
        }
    }

    render() {
        const { color, err, loading } = this.state;
        const token = JSON.parse(sessionStorage.getItem('hytjz'));
        if(token) {
            this.props.history.push("/dashboard");
        }
        return (
            <Fragment>
                {
                    loading &&
                    <Loader />
                }
                <div style={{margin: '0px', padding: '0px', height: '100vh'}} className='login'>
                    <div className="login-header">SITE LOGO</div>
                    <br /><br /><br /><br /><br />

                      <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="login-card"><br />
                                    <center>
                                        <span style={{fontSize: '17px'}}>LOGIN</span><br />
                                        {
                                            err &&
                                            <p className={color}>{err}</p>
                                        }
                                        <br />
                                        <form onSubmit={this.onSubmit}>    
                                            <input type="text" 
                                                className="student_id login-input" 
                                                placeholder="Admin ID" 
                                                name="idNo"
                                                onChange={this.handleChange}
                                                required
                                            />
                                            <br /><br />

                                            <input type="password" 
                                                className="password login-input" 
                                                placeholder="Password" 
                                                name="password"
                                                onChange={this.handleChange}
                                                required
                                            />
                                            <br /><br />
                                            <div>
                                                <button className="login-btn">LOGIN</button>
                                            </div>
                                        </form>
                                    </center>
                                </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                            </div>

                            <div className="col-md-7"><br /><br /><br /><br />
                                <div style={{color: '#fff'}}>
                                    <span style={{fontSize: '35px'}}>WRIGHT WAY</span><br />
                                    <span style={{fontSize: '13px'}}>Access database informations</span><br />
                                    <span style={{fontSize: '13px'}}>Factories</span><span style={{fontSize: '30px'}}>.</span><span style={{fontSize: '13px'}}>Workers</span>
                                </div>
                            </div>
                        </div>
                    </div><br /><br /><br /><br /><br /><br />

                    <div className="login-footer">
                        WWW 2019 &copy;<br />
                        Database management<br />
                        <small>Designed by anonymous</small>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AdminLogin;