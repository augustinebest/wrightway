import React, { Fragment, Component } from 'react';
import Bodywrapper from './BodyWrapper';
import axios from 'axios';
import { Url } from '../Factories';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';

class AllWorkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allWorkers: [],
            allDrivers: [],
            allManagement: [],
            operators: [],
            noOfWorkers: '',
            noOfDrivers: '',
            noOfManagers: '',
            noOfOperators: '',
            progress: 0
        }
    }

        componentDidMount() {
        const token = JSON.parse(sessionStorage.getItem('hytjz'));
        const companyId = JSON.parse(sessionStorage.getItem('company'));
        axios.get(`${Url}/admin/${companyId}/factoryWorkers`, {
            headers: {"Authorization": `Bearer ${token}`}
          }).then(res => {
                this.setState({
                allWorkers: res.data.message,
                noOfWorkers: res.data.count
            })
        })
        axios.get(`${Url}/admin/getDrivers`, {
            headers: {"Authorization": `Bearer ${token}`}
          }).then(res => {
                this.setState({
                allDrivers: res.data.message,
                noOfDrivers: res.data.count
            })
        })
        axios.get(`${Url}/admin/getDrivers`, {
            headers: {"Authorization": `Bearer ${token}`}
          }).then(res => {
                this.setState({
                operators: res.data.message,
                noOfOperators: res.data.count
            })
        })
        axios.get(`${Url}/admin/allWorkers`, {
            headers: {"Authorization": `Bearer ${token}`}
          }).then(res => {
                this.setState({
                allManagement: res.data.message,
                noOfManagers: res.data.count
            })
        })
    }

    showWorkers = () => {
        this.setState({
            progress: 0
        })
    }
    
    showManagement = () => {
        this.setState({
            progress: 1
        })
    }

    showDrivers = () => {
        this.setState({
            progress: 2
        })
    }

    showOperators = () => {
        this.setState({
            progress: 3
        })
    }

    render() {
        const { progress, noOfDrivers, noOfWorkers, noOfManagers, allWorkers } = this.state;
        if(progress === 0) {
            return (
                <Fragment>
                <div className='dashboard__tag'>ALL WORKERS</div>
                <div className='emp__base_workers'>
                    <div>
                             <ul className='categories'>
                                <li className='active' onClick={this.showWorkers}>Factory Workers</li>
                                <li onClick={this.showDrivers}>Drivers</li>
                                <li onClick={this.showOperators}>Operators</li>
                                <li onClick={this.showManagement}>Management</li>
                            </ul>
                    </div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-head">Factory Workers ({noOfWorkers}) &nbsp; <i className="fa fa-building"></i></div>
                        <div className="card-body">
                        {
                            allWorkers && allWorkers.length > 0 ?
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Id No.</th>
                                            <th scope="col">Phone No.</th>
                                            <th scope="col">State of Origin</th>
                                            <th scope="col">Religion</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Marital Status</th>
                                            <th scope="col">Salary</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allWorkers.map((worker, index) => {
                                                return (
                                                    <tr key={index}>
                                                            <th scope="row">{index+1}</th>
                                                            <td>{worker.fullName}</td>
                                                            <td>{worker.idNo}</td>
                                                            <td>{worker.phoneNumber}</td>
                                                            <td>{worker.stateOfOrigin}</td>
                                                            <td>{worker.religion}</td>
                                                            <td>{worker.sex}</td>
                                                            <td>{worker.maritalStatus}</td>
                                                            <td>{worker.salary}</td>
                                                            <td><span style={{textDecoration: 'underline', cursor: 'pointer', color: 'rgb(8, 75, 8)'}}><Link to={`/dashboard/${worker.idNo}/profile`}>view details</Link></span></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                 </table>
                            </div>
                            : 
                            <div>
                                There are no worker currently
                            </div>
                        }
                        </div>
                    </div><br />
                    </div>
                </div>
                </div>
                </Fragment>
            )
        } else if(progress === 1) {
            return (
                <Fragment>
                <div className='dashboard__tag'>ALL WORKERS</div>
                <div className='emp__base_workers'>
                    <div>
                             <ul className='categories'>
                                <li onClick={this.showWorkers}>Factory Workers</li>
                                <li onClick={this.showDrivers}>Drivers</li>
                                <li onClick={this.showOperators}>Operators</li>
                                <li className='active' onClick={this.showManagement}>Management</li>
                            </ul>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-head">Management ({noOfManagers}) &nbsp; <i className="fa fa-building"></i></div>
                        <div className="card-body">
                            
                        </div>
                    </div><br />
                    </div>
                </div>
                </div>
                </Fragment>
            )
        } else if(progress === 2) {
            return (
                <Fragment>
                <div className='dashboard__tag'>ALL WORKERS</div>
                <div className='emp__base_workers'>
                        <div>
                             <ul className='categories'>
                                <li onClick={this.showWorkers}>Factory Workers</li>
                                <li className='active' onClick={this.showDrivers}>Drivers</li>
                                <li onClick={this.showOperators}>Operators</li>
                                <li onClick={this.showManagement}>Management</li>
                            </ul>
                        </div>
                    <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-head">Drivers ({noOfDrivers}) &nbsp; <i className="fa fa-building"></i></div>
                        <div className="card-body">
                            
                        </div>
                    </div><br />
                    </div>
                </div>
                </div>
                </Fragment>
            )
        } else if(progress === 3) {
            return (
                <Fragment>
                <div className='dashboard__tag'>ALL WORKERS</div>
                <div className='emp__base_workers'>
                        <div>
                             <ul className='categories'>
                                <li onClick={this.showWorkers}>Factory Workers</li>
                                <li onClick={this.showDrivers}>Drivers</li>
                                <li className='active' onClick={this.showOperators}>Operators</li>
                                <li onClick={this.showManagement}>Management</li>
                            </ul>
                        </div>
                    <div className="row">
                    <div className="col-md-12">
                    <div className="card">
                        <div className="card-head">Operators ({noOfDrivers}) &nbsp; <i className="fa fa-building"></i></div>
                        <div className="card-body">
                            
                        </div>
                    </div><br />
                    </div>
                </div>
                </div>
                </Fragment>
            )
        }
    }
}

export default Bodywrapper()(AllWorkers);