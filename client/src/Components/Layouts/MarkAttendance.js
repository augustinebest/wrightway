import React, { Fragment, Component } from 'react';
import Bodywrapper from './BodyWrapper';
import axios from 'axios';
import { Url } from '../Factories';

class MarkAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      formatedDate: null,
      workers: [],
      drivers: [],
      operators: [],
      admins: [],
      message: '',
      progress: 0
    }
  }

  componentDidMount() {
    this.change();
    this.setState({
      progress: 0
    })
    const token = JSON.parse(sessionStorage.getItem('hytjz'));
    const companyId = JSON.parse(sessionStorage.getItem('company'));
    axios.get(`${Url}/admin/${companyId}/getFactoryWorkersForAttendance`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      if(res.data.code === 200) {
        this.setState({
          workers: res.data.message
        })
      } else {
        this.setState({
          workers: res.data.message
        })
      }

    })

    axios.get(`${Url}/admin/${companyId}/getDriversForAttendance`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      if(res.data.code === 200) {
        this.setState({
          drivers: res.data.message
        })
      } else {
        this.setState({
          drivers: res.data.message
        })
      }

    })

    axios.get(`${Url}/admin/${companyId}/getOperatorsForAttendance`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      if(res.data.code === 200) {
        this.setState({
          operators: res.data.message
        }) 
      } else {
        this.setState({
          operators: res.data.message
        })
      }

    })

    axios.get(`${Url}/admin/getAdminForAttendance`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      if(res.data.code === 200) {
        this.setState({
          admins: res.data.message
        })
      } else {
        this.setState({
          admins: res.data.message
        })
      }

    })
  }

  mark = (id, status) => {
    var token = JSON.parse(sessionStorage.getItem('hytjz'));
    var compId = JSON.parse(sessionStorage.getItem('company'));
    const data = {
      idNo: id,
      status: status,
      companyId: compId
    }
    axios.post(`${Url}/admin/mark-attendance`, data, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      if(res.data.code === 200) {
        alert(res.data.message);
        window.location.reload()
      } else {
        alert(res.data.message)
      }
    })
  }

  onChange = date => {
    this.setState({ date })
  }
  change = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth()+1;
    const year = d.getUTCFullYear();
    const date1 = day+'/'+month+'/'+year;
    this.setState({formatedDate: date1})
  }

  changeToWorkers = () => {
    this.setState({
      progress: 0
    })
  }
  changeToDrivers = () => {
    this.setState({
      progress: 1
    })
  }
  changeToManagement = () => {
    this.setState({
      progress: 2
    })
  }
  changeToOperators = () => {
    this.setState({
      progress: 3
    })
  }
  render() {
    const { formatedDate, workers, drivers, operators, progress, admins } = this.state;
    if(progress === 0) {
      return (
        <Fragment>
          <div className='navigations'>DASHBOARD / MARK ATTENDANCE</div>
            <div className='emp__base'>
            <div className='row'>
              <div className='col-md-4'>
                <center>
                  <div className='left_base'>
                      <ul>
                        <li className='activeOne' onClick={this.changeToWorkers}>Factory Workers</li>
                        <li onClick={this.changeToDrivers}>Drivers</li>
                        <li onClick={this.changeToManagement}>Management</li>
                        <li onClick={this.changeToOperators}>Operators</li>
                      </ul>
                  </div>
                </center>
              </div>
                <div className='col-md-8'>
                  <div className='attendance_base'>
                  <center>
                    <div className='attendance_title'>
                        <div>Today's Date: {formatedDate}</div>
                        <div>Factory Workers Attendance sheet</div>
                    </div>
                      </center>
                      <div>
                        {
                          workers && workers.length > 0 
                          ?
                          <div>
                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead>
                                          <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Full Name</th>
                                              <th scope="col">Id No.</th>
                                              <th scope="col">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          workers.map((worker, index) => {
                                            const id = worker.idNo
                                            return (
                                              <tr key={index}>
                                                      <th scope="row">{index+1}</th>
                                                      <td>{worker.fullName}</td>
                                                      <td>{worker.idNo}</td>
                                                      <td><button className='absent' onClick={() => this.mark(id, '0')}>Absent</button> <button className='present' onClick={() => this.mark(id, '1')}>Present</button></td>
                                              </tr>
                                          )
                                          })
                                        }
                                      </tbody>
                              </table>
                            </div>
                          </div>
                          :
                          <div>There are no workers currently to be marked</div>
                        }
                      </div>
                  </div>
                </div>
            </div>
            </div>
        </Fragment>
      );
    }
    else if(progress === 1) {
        return (
          <Fragment>
          <div className='navigations'>DASHBOARD / MARK ATTENDANCE</div>
            <div className='emp__base'>
            <div className='row'>
              <div className='col-md-4'>
                <center>
                  <div className='left_base'>
                      <ul>
                        <li onClick={this.changeToWorkers}>Factory Workers</li>
                        <li className='activeOne' onClick={this.changeToDrivers}>Drivers</li>
                        <li onClick={this.changeToManagement}>Management</li>
                        <li onClick={this.changeToOperators}>Operators</li>
                      </ul>
                  </div>
                </center>
              </div>
                <div className='col-md-8'>
                  <div className='attendance_base'>
                  <center>
                    <div className='attendance_title'>
                        <div>Today's Date: {formatedDate}</div>
                        <div>Drivers Attendance sheet</div>
                    </div>
                      </center>
                      <div>
                      {
                          drivers && drivers.length > 0 
                          ?
                          <div>
                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead>
                                          <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Full Name</th>
                                              <th scope="col">Id No.</th>
                                              <th scope="col">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          drivers.map((driver, index) => {
                                            const id = driver.idNo
                                            return (
                                              <tr key={index}>
                                                      <th scope="row">{index+1}</th>
                                                      <td>{driver.fullName}</td>
                                                      <td>{driver.idNo}</td>
                                                      <td><button className='absent' onClick={() => this.mark(id, '0')}>Absent</button> <button className='present' onClick={() => this.mark(id, '1')}>Present</button></td>
                                              </tr>
                                          )
                                          })
                                        }
                                      </tbody>
                              </table>
                            </div>
                          </div>
                          :
                          <div>There are no drivers currently to be marked</div>
                        }
                      </div>
                  </div>
                </div>
            </div>
            </div>
        </Fragment>
        )
    } else if(progress === 2) {
        return(
          <Fragment>
          <div className='navigations'>DASHBOARD / MARK ATTENDANCE</div>
            <div className='emp__base'>
            <div className='row'>
              <div className='col-md-4'>
                <center>
                  <div className='left_base'>
                      <ul>
                        <li onClick={this.changeToWorkers}>Factory Workers</li>
                        <li onClick={this.changeToDrivers}>Drivers</li>
                        <li className='activeOne' onClick={this.changeToManagement}>Management</li>
                        <li onClick={this.changeToOperators}>Operators</li>
                      </ul>
                  </div>
                </center>
              </div>
                <div className='col-md-8'>
                  <div className='attendance_base'>
                  <center>
                    <div className='attendance_title'>
                        <div>Today's Date: {formatedDate}</div>
                        <div>Management Attendance sheet</div>
                    </div>
                      </center>
                      <div>
                      {
                          admins && admins.length > 0 
                          ?
                          <div>
                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead>
                                          <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Full Name</th>
                                              <th scope="col">Id No.</th>
                                              <th scope="col">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          admins.map((admin, index) => {
                                            return (
                                              <tr key={index}>
                                                      <th scope="row">{index+1}</th>
                                                      <td>{admin.fullName}</td>
                                                      <td>{admin.idNo}</td>
                                                      <td><button className='absent'>Absent</button> <button className='present'>Present</button></td>
                                              </tr>
                                          )
                                          })
                                        }
                                      </tbody>
                              </table>
                            </div>
                          </div>
                          :
                          <div>There are no admins currently to be marked</div>
                        }
                      </div>
                  </div>
                </div>
            </div>
            </div>
        </Fragment>
        )
    } else if(progress === 3) {
        return(
          <Fragment>
          <div className='navigations'>DASHBOARD / MARK ATTENDANCE</div>
            <div className='emp__base'>
            <div className='row'>
              <div className='col-md-4'>
                <center>
                  <div className='left_base'>
                      <ul>
                        <li onClick={this.changeToWorkers}>Factory Workers</li>
                        <li onClick={this.changeToDrivers}>Drivers</li>
                        <li onClick={this.changeToManagement}>Management</li>
                        <li className='activeOne' onClick={this.changeToOperators}>Operators</li>
                      </ul>
                  </div>
                </center>
              </div>
                <div className='col-md-8'>
                  <div className='attendance_base'>
                      <center>
                        <div className='attendance_title'>
                        <div>Today's Date: {formatedDate}</div>
                        <div>Operators Attendance sheet</div>
                        </div>
                      </center>
                      <div>
                      {
                          operators && operators.length > 0 
                          ?
                          <div>
                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead>
                                          <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Full Name</th>
                                              <th scope="col">Id No.</th>
                                              <th scope="col">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          operators.map((operator, index) => {
                                            const id = operator.idNo
                                            return (
                                              <tr key={index}>
                                                      <th scope="row">{index+1}</th>
                                                      <td>{operator.fullName}</td>
                                                      <td>{operator.idNo}</td>
                                                      <td><button className='absent' onClick={() => this.mark(id, '0')}>Absent</button> <button className='present' onClick={() => this.mark(id, '1')}>Present</button></td>
                                              </tr>
                                          )
                                          })
                                        }
                                      </tbody>
                              </table>
                            </div>
                          </div>
                          :
                          <div>There are no operators currently to be marked</div>
                        }
                      </div>
                  </div>
                </div>
            </div>
            </div>
        </Fragment>
        )
    }
  }
}

export default Bodywrapper()(MarkAttendance);