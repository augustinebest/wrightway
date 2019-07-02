import React, { Fragment, Component } from 'react';
import Bodywrapper from './BodyWrapper';
import axios from 'axios';
import { Url } from '../Factories';
import './Layout.css';
import $ from 'jquery';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: null,
      companies: null
    }
  }

  componentDidMount() {
    const compId = JSON.parse(sessionStorage.getItem('company'));
    var token = JSON.parse(sessionStorage.getItem('hytjz'));
    const data  =  compId;
    axios.get(`${Url}/company/get-a-comp/${data}`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      console.log(res)
      if(res.data.code === 200) {
        this.setState({
          dashboard: res.data.message
        })
      } 
    })
    axios.get(`${Url}/company/get`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      if(res.data.code === 200) {
        this.setState({
          companies: res.data.message
        })
      }
    })
  }

  _toggleDivs = () => {
    $(this.refs['toggle-divs']).slideToggle()
  }

  changeCompany = (k) => {
    const data = k;
    var token = JSON.parse(sessionStorage.getItem('hytjz'));
    axios.get(`${Url}/company/get-a-comp/${data}`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => {
      console.log(res);
      this.setState({
        dashboard: res.data.message
      })
      sessionStorage.setItem('company', JSON.stringify(data));
    })
  }

  render() {
    const { dashboard, companies } = this.state;
      return (
        <Fragment>
          <div className='navigations'>DASHBOARD</div>
            <div className="myjumbotron">
                <div onClick={this._toggleDivs}><span className='company__display'>{dashboard && dashboard.name}</span></div><br/>
                <ul className='company__list' style={{display: 'none'}} ref="toggle-divs">
                  {
                    companies && companies.map((company, index) => {
                      const c = company._id
                      return (
                        <li key={index} onClick={() => this.changeCompany(c)}>{company.name}</li>
                      )
                    })
                  }
                </ul>
                <div style={{height: 'auto'}}>
                <div className='row'>
                <center>
                    <div className='col-md-3 box1'>
                        <div className='grid-1'>
                            {
                              dashboard &&
                               <div>
                                  <h4>Late 1</h4>
                                  <h2>{dashboard.late1Start} - {dashboard.late1End}</h2>
                                  <h5>debit - {dashboard.late1Debit}</h5>
                              </div>
                            }
                        </div>
                    </div>
                </center>
                <center>
                    <div className='col-md-3 box2'>
                        <div className='grid-2'>
                        {
                            dashboard &&
                               <div>
                                  <h4>Late 2</h4>
                                  <h2>{dashboard.late2Start} - {dashboard.late2End}</h2>
                                  <h5>debit - {dashboard.late2Debit}</h5>
                              </div>
                            }
                        </div>      
                    </div>
                </center>
                <center>
                    <div className='col-md-3 box3'>
                        <div className='grid-3'>
                        {
                              dashboard &&
                               <div>
                                  <h4>Absent</h4>
                                  <h2>No time</h2>
                                  <h5>debit - {dashboard.absentDebit}</h5>
                              </div>
                            }
                        </div>
                    </div>
                </center>
                <center>
                    <div className='col-md-3 box3'>
                        <div className='grid-3'>
                        {
                               <div>
                                  <h4>water set(11)</h4>
                                  <h2>Price: &#8358;1000</h2>
                              </div>
                            }
                        </div>
                    </div>
                </center>
                </div>
                
                <div className='row'>
                <center>
                    <div className='col-md-3 box1'>
                        <div className='grid-1'>
                            {
                               <div>
                                  <h4>Totals Drivers</h4>
                                  <h2>13</h2>
                              </div>
                            }
                        </div>
                    </div>
                </center>
                <center>
                    <div className='col-md-3 box2'>
                        <div className='grid-2'>
                        {
                               <div>
                                  <h4>Total Factory Workers</h4>
                                  <h2>23</h2>
                              </div>
                            }
                        </div>      
                    </div>
                </center>
                <center>
                    <div className='col-md-3 box3'>
                        <div className='grid-3'>
                        {
                               <div>
                                  <h4>Total Admins</h4>
                                  <h2>7</h2>
                              </div>
                            }
                        </div>
                    </div>
                </center>
                <center>
                    <div className='col-md-3 box3'>
                        <div className='grid-3'>
                        {
                               <div>
                                  <h4>Today's Expenses</h4>
                                  <h2>&#8358;0</h2>
                              </div>
                            }
                        </div>
                    </div>
                </center>
                </div><br />
                  Recent Expenses
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                          <tr>
                              <th scope="col">#</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Person</th>
                              <th scope="col">Reason</th>
                              <th scope="col">Date</th>
                          </tr>
                      </thead>
                    </table>
                  </div>
                </div>
                </div>

            
        </Fragment>
      );
  }
}

export default Bodywrapper()(Dashboard);