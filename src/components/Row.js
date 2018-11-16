import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cell from './Cell';
import './style/row.css';

class Row extends Component {
  static propTypes = {
    currentMoment: PropTypes.object,
    data: PropTypes.array,
  }
  static defaultProps = {
    currentMoment: moment(),
    data: [],
  }

  constructor (props) {
    super(props);
  }

  renderCells = (currentMoment) => {
    const { data } = this.props;
    const dates = [];
    for (let date = 1; date <= moment(currentMoment).daysInMonth(); date++) {
      dates.push({
        time: moment().set({
          'year': currentMoment.year(),
          'date': date,
          'month': currentMoment.month(),
        }),
        data: data.filter(d => moment(d.date).date() === date),
      });
    }
    return dates.map(d => <Cell key={d.time.date()} data={d.data} />);
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