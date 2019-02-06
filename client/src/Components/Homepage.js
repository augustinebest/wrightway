import React, { Fragment, Component } from 'react';
import Calendar from 'react-calendar';
import { NavLink } from 'react-router-dom';
import '../App.css';
class Homepage extends Component {
  state = {
    date: new Date(),
    formatedDate: null
  }
  onChange = date => {
    this.setState({ date })
  }
  change = (value) => {
    const d = new Date(value);
    const day = d.getUTCDate();
    const month = d.getUTCMonth()+1;
    const year = d.getUTCFullYear();
    const date1 = day+'-'+month+'-'+year;
    this.setState({formatedDate: date1})
  }
  render() {
    return (
      <Fragment> 
      <div className="App">
        <Calendar 
          onChange={this.onChange}
          value={this.state.date}
          onClickDay={(value) => this.change(value)}
        />
        <div>{this.state.formatedDate}</div>
        <NavLink to='/admin/login'>LOGIN</NavLink>
      </div>
      </Fragment>
    );
  }
}

export default Homepage;