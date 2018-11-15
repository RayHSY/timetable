import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cell from './Cell';
import './style/row.css';

class Row extends Component {
  static propTypes = {
    currentMoment: PropTypes.object,
  }
  static defaultProps = {
    currentMoment: moment(),
  }

  constructor (props) {
    super(props);
  }

  renderCells = (currentMoment) => {
    const dates = [];
    for (let d = 1; d <= moment(currentMoment).daysInMonth(); d++) {
      dates.push(moment().set({
        'year': currentMoment.year(),
        'date': d,
        'month': currentMoment.month(),
      }));
    }
    return dates.map(date => <Cell key={date.date()} />);
  }

  render () {
    const { currentMoment } = this.props;
    const cells = this.renderCells(currentMoment);
    return (
      <div className="row">
        { cells }
      </div>
    );
  }
}

export default Row;