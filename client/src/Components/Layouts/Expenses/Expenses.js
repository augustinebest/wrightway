import React, { Fragment, Component } from 'react';
import Bodywrapper from '../BodyWrapper';
import axios from 'axios';
import { Url } from '../../Factories';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayy: 'select',
            month: 'select',
            yearr: 'select',
            filteredExpenses: [],
            totalAmount: '',
            date: '',
            amount: '',
            reason: ''
        }
    }
    componentDidMount() {
        const d = new Date();
        const year = d.getUTCFullYear();
        this.setState({
            date: [year]
        })
    }
    handlePress = (e) => {
        var char = String.fromCharCode(e.which);
        if(!(/[0-9]/.test(char))) {
            e.preventDefault();
        }
    }
    change = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    selectDay = (e) => {
        this.setState({
            dayy: e.target.value
        })
    }
    selectMonth = (e) => {
        this.setState({
            month: e.target.value
        })
    }
    selectYear = (e) => {
        this.setState({
            yearr: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault();
        const { amount, reason } = this.state;
            const token = JSON.parse(sessionStorage.getItem('hytjz'));
            const company = JSON.parse(sessionStorage.getItem('company'));
            const data = {
                amount: amount,
                reason: reason
            }
            axios.post(`${Url}/admin/${company}/make-expenses`, data, {
                headers: {"Authorization": `Bearer ${token}`}
              }).then(res => {
                  if(res.data.code === 200) {
                      alert(res.data.message);
                      this.setState({
                          amount: '',
                          reason: ''
                      })
                  } else {
                      alert(res.data.message);
                      this.setState({
                        amount: '',
                        reason: ''
                    })
                  }
              })
    }
    submitFiltered = (e) => {
        e.preventDefault();
        const { dayy, month, yearr } = this.state;
        if(dayy==='select' || month==='select' || yearr==='select') {
            alert('Invalid selection')
        } else {
            const token = JSON.parse(sessionStorage.getItem('hytjz'));
            const company = JSON.parse(sessionStorage.getItem('company'));
            const data = {
                date: dayy+'/'+month+'/'+yearr
            }
            axios.post(`${Url}/admin/${company}/getByDay`, data, {
                headers: {"Authorization": `Bearer ${token}`}
              }).then(res => {
                  console.log(res)
                  if(res.data.code === 200) {
                      this.setState({
                        filteredExpenses: res.data.message,
                        totalAmount: res.data.amount
                      })
                  } else {
                      alert(res.data.message);
                  }
              })
        }
    }
  render() {
      const { date, dayy, month, yearr, filteredExpenses, totalAmount } = this.state;
      console.log(dayy+'/'+month+'/'+yearr)
      let day = [];
      let year = [];
      for(let i=1; i<=31; i++) {
        day.push(i);
      } 
      for(let i=date[0]; i>=date[0]-9; i--) {
        year.push(i)
    }
    return (
      <Fragment>
          <div className='navigations'>EXPENSES</div>
          <div className='container' style={{backgroundColor: '#edf1f5', width: '100%', padding: '20px', height: 'auto'}}>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className='expense-card' style={{height: ' 120px', backgroundColor: '#fff', padding: '40px 15px 15px 15px'}}>
                            {
                                totalAmount && totalAmount ?
                                <div style={{position: 'relative'}}>
                                    <div><span className='span-ex'><i className='fa fa-bar-chart'></i></span> <span style={{color: '#f00'}} className='span-ex2'>&#8358;{totalAmount}</span></div>
                                    <center><div style={{fontSize: '14px', fontWeight: 'bolder'}}>Total expenses on {dayy}/{month}/{yearr} </div></center>
                                </div>
                                :
                                <div style={{position: 'relative'}}>
                                    <div><span className='span-ex'><i className='fa fa-bar-chart'></i></span> <span className='span-ex2'>&#8358;0</span></div>
                                    <center><div style={{fontSize: '14px', fontWeight: 'bolder'}}>Search to obtain the total amount of exenses</div></center>
                                </div>
                            }
                        </div>
                        <div className='expense-card' style={{height: 'auto', backgroundColor: '#fff', padding: '5px'}}>
                        <center>
                                <div>Filter expenses by date</div><br />
                                <form onSubmit={this.submitFiltered}>
                                    <div>
                                        <select onChange={this.selectDay} value={dayy}>
                                            <option disabled value='select'>--Select Day--</option>
                                            {
                                                day &&
                                                day.map((d, i) => {
                                                    return (
                                                        <option key={i}>{d}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <select onChange={this.selectMonth} value={month}>
                                            <option disabled value='select'>--Select Month--</option>
                                            <option value='January'>January</option>
                                            <option value='February'>February</option>
                                            <option value='March'>March</option>
                                            <option value='April'>April</option>
                                            <option value='May'>May</option>
                                            <option value='June'>June</option>
                                            <option value='July'>July</option>
                                            <option value='August'>August</option>
                                            <option value='September'>September</option>
                                            <option value='October'>October</option>
                                            <option value='November'>November</option>
                                            <option value='December'>December</option>
                                        </select>
                                        <select onChange={this.selectYear} value={yearr}>
                                            <option disabled value='select'>--Select Year--</option>
                                            {
                                                year &&
                                                year.map((y, i) => {
                                                    return (
                                                        <option key={i}>{y}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div><br />
                                    <button className='exp__button'>Search</button>
                                </form>
                        </center>
                        </div>
                    </div>
                    <div className='col-md-7' style={{paddingLeft: '25px'}}>
                        <div className='expense-card'>
                                <div className='ex-box'>
                                    <div>Enter your expense here</div><br />
                                    <center>
                                        <form onSubmit={this.submit}>
                                            <input className='form-control'
                                                type='text'
                                                name='amount'
                                                required
                                                onChange={this.change}
                                                onKeyPress={this.handlePress}
                                                placeholder='Amount in Naira'
                                            /><br />
                                            <textarea className='form-control' rows='5' cols='6' required placeholder='Reason for expense' name='reason' onChange={this.change}></textarea><br />
                                        <button type='submit' className='exp__button'>Submit</button>
                                        </form>
                                    </center>
                                </div>
                        </div>
                    </div>
                </div><br /><br/>
                <div className='row'>
                    <div className='expense-bigcard'>
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
                                <tbody>
                                    {
                                        filteredExpenses &&
                                        filteredExpenses.map((expense, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th>{index+1}</th>
                                                    <td>&#8358;{expense.amount}</td>
                                                    <td>{expense.person}</td>
                                                    <td>{expense.reason}</td>
                                                    <td>{expense.date} {expense.time}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
          </div>
      </Fragment>
    );
  }
}

export default Bodywrapper()(Expenses);