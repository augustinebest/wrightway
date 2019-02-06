import React, { Fragment, Component } from 'react';
import Bodywrapper from './BodyWrapper';

class Costs extends Component {
  render() {
    return (
      <Fragment>
          This is the Costs
      </Fragment>
    );
  }
}

export default Bodywrapper()(Costs);