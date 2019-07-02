import React, { Fragment, Component } from 'react';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{details: "", price: ""}],
            amount: 0,
            progress: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      addClick(){
        this.setState(prevState => ({ 
            users: [...prevState.users, { details: "", price: "" }]
        }))
      }
      
      createUI(){
         return this.state.users.map((el, i) => (
           <div key={i}>
              <input placeholder="details" name="details" value={el.details ||''} onChange={this.handleChange.bind(this, i)} />
              <input placeholder="price" name="price" value={el.price ||''} onChange={this.handleChange.bind(this, i)} />
              <input type='button' value='x' onClick={this.removeClick.bind(this, i)}/>
           </div>          
         ))
      }
      
      handleChange(i, e) {
         const { name, value } = e.target;
         let users = [...this.state.users];
         users[i] = {...users[i], [name]: value};
         this.setState({ users });
      }
      
      removeClick(i){
         let users = [...this.state.users];
         users.splice(i, 1);
         this.setState({ users });
      }

      getTotal() {
        let totalAmount = this.state.users.map(el => { return el.price })
        let getSum = (total, sum) => { return Number(total) + Number(sum) }
        var amount = totalAmount.reduce(getSum);
        console.log(amount);
        this.setState({
            amount: amount
        })
      }
      
      handleSubmit(event) {
        event.preventDefault();
        this.setState({progress: 1});
        var check = false;
        this.state.users.forEach(el => {
            if(el.details === '' || el.price === '') check = false
                check = true
        })
        if(!check) alert('You cannot submit empty fields');
        this.props.expenses(this.state.users);
      }
    
      render() {
          const { amount, progress } = this.state;
          if(progress === 0) {
              return (
                  <Fragment>
                      <div>amount: {amount}</div>
                      <form onSubmit={this.handleSubmit}>
                          {this.createUI()}        
                          <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
                          <input type="submit" value="Finish" />
                          <input type='button' value='Get Total' onClick={this.getTotal.bind(this)}/>
                      </form>
                  </Fragment>
              );
          } else {
              return (
                  <div>
                      <h1>Table</h1>
                  </div>
              )
          }
      }
}

export default Expenses;