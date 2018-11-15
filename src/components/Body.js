import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from './Row';
import { times } from '../contants/utils';

import './style/body.css';

class Body extends Component {
  static propTypes = {
    height: PropTypes.number,
    currentMoment: PropTypes.object,
    onScroll: PropTypes.func,
    saveRef: PropTypes.func,
  }
  static defaultProps = {
    currentMoment: moment(),
  }

  constructor (props) {
    super(props);
  }

  renderRows = () => {
    return times.map(time => <Row key={time} />);
  }

  bind = (ref) => {
    this.props.saveRef('timeBody')(ref);
    this.body = ref;
  }

  render () {
    const { height, onScroll } = this.props;
    const body = this.renderRows();
    return (
      <div
        className="body"
        style={{
          height,
        }}
        onScroll={onScroll}
        ref={this.bind}
      >
        { body }
      </div>
    );
  }
}

export default Body;