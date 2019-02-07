import React, { Fragment, Component } from 'react';
import axios from 'axios';
import BodyWrapper from '../BodyWrapper';
import './SubLayout.css'
import { Url } from '../../Factories';

class AttendanceOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            selectedMonth: 'select',
            selectedYear: 'select',
            buttonValue: 'Get Attendance',
            action: false,
            records: []
        }
    }
    componentDidMount() {
        const d = new Date();
        const year = d.getUTCFullYear();
        this.setState({
            date: [year]
        })
    }
    preferredMonth = (e) => {
        this.setState({
            selectedMonth: e.target.value
        })
    }
    preferredYear = (e) => {
        this.setState({
            selectedYear: e.target.value
        })
    }
    submitDetails = (e) => {
        e.preventDefault();
        this.setState({
            buttonValue: 'loading...',
            action: true
        })
        const token = JSON.parse(sessionStorage.getItem('hytjz'));
        const id = this.props.match.params.id;
        const { selectedMonth, selectedYear } = this.state;
        const data = {
            date: selectedMonth+'/'+selectedYear
        }
        if(selectedMonth === 'select' || selectedYear === 'select') {
            alert('Invalid selection');
            this.setState({
                buttonValue: 'Get Attendance',
                action: false
            })
        } else {
            axios.post(`${Url}/admin/${id}/worker-attendance-in-a-month`, data, {
                headers: {"Authorization": `Bearer ${token}`}
              }).then(res => {
                //   console.log(res);
                if(res.data.code === 200) {
                    this.setState({
                      records: res.data.message,
                      buttonValue: 'Get Attendance',
                      action: false
                    })
                } else {
                    alert(res.data.message);
                    this.setState({
                        buttonValue: 'Get Attendance',
                        action: false
                    })
                }
              })
        }
    }

    render() {
        const { date, selectedMonth, selectedYear, records, buttonValue, action } = this.state;
        var p = []
        for(let i=date[0]; i>=date[0]-9; i--) {
            p.push(i)
        }
        return (
            <Fragment>
                <div className='emp__base1'>
                <div className='navigations'>DASHBOARD / ATTENDANCE OVERVIEW</div>
                    <div className='select'>
                    <form onSubmit={this.submitDetails}>
                        <select onChange={this.preferredMonth} value={selectedMonth}>
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
                        <select onChange={this.preferredYear} value={selectedYear}>
                            <option disabled value='select'>--Select Year--</option>
                            {
                                p && 
                                p.map((yr, index) => {
                                    return (
                                        <option key={index}>{yr}</option>
                                    )
                                })
                            }
                        </select>
                        <button disabled={action}>{buttonValue}</button>
                    </form>
                    </div>
                    <div className='display__section'>
                        This is the display section
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Day</th>
                                            <th scope="col">Time In</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Amount Deducted</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                records && 
                                                records.map((record, index) => {
                                                    return (
                                                    <tr key={index}>
                                                        <td>{record.date}</td>
                                                        <td>{record.day}</td>
                                                        <td>{record.status === 0 ? 'No time' : record.timeIn}</td>
                                                        <td>{record.status === 0 ? 'Absent' : 'Present'}</td>
                                                        <td>{record.amountDeducted}</td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default BodyWrapper()(AttendanceOverview);