import React, { Fragment, Component } from 'react';
import Bodywrapper from '../BodyWrapper';
import ExtraRevenue from './ExtraRevenue';
import Expenses from './Expense';
import Sales from './Sales';
import './expenses.css';

class ExpenseLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: '',
            sales: '',
            expenses: ''
        }
    }
    getRevenue = (details) => {
        this.setState({revenue: details})
    }
    getSales = (details) => {
        this.setState({sales: details})
    }
    getExpenses = (details) => {
        this.setState({expenses: details})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { revenue, sales, expenses } = this.state;
        console.log('revenue', revenue, 'sales', sales, 'expenses', expenses)
    }
  render() {
    //   const { revenue, sales, expenses } = this.state;
    return (
      <Fragment>
          <div>Balance Brought forward: </div>
          <div className='row'>
            <div className='col-md-6 expense-box'>
                <center>
                    <div className='box-1'>
                    EXPENSES
                        <ExtraRevenue revenue={this.getRevenue} />
                    </div>
                    <div className='box-1'>
                    SALES
                        <Sales sales={this.getSales}/>
                    </div>
                </center>
            </div>
            <div className='col-md-6 expense-box'>
                <center>
                    <div className='box-1'>
                        Expenses Layout
                        <Expenses expenses={this.getExpenses} />
                    </div>
                </center>
            </div>
          </div>
          <div className='row'>
            <center>
                <form onClick={this.handleSubmit}>
                    <button>SUBMIT</button>
                </form>
            </center>
          </div>
      </Fragment>
    );
  }
}

export default Bodywrapper()(ExpenseLayout);