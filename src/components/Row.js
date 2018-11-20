import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cell from './Cell';
// import './style/row.css';

class Row extends Component {
  static propTypes = {
    currentMoment: PropTypes.object,
    data: PropTypes.array,
    isTime: PropTypes.bool,
    header: PropTypes.array,
    groupBy: PropTypes.string,
  }
  static defaultProps = {
    currentMoment: moment(),
    data: [],
    isTime: false,
  }

  constructor (props) {
    super(props);
  }

  renderCells = (currentMoment) => {
    const { data, isTime, header, groupBy } = this.props;
    return header.map(h => <Cell
      isToday={isTime && moment.isMoment(h.value) && h.value.date() === currentMoment.date()}
      key={h.key}
      groupBy={h.groupBy}
      data={data.filter(d => moment.isMoment(h.value) ? d.date === h.value.format('YYYY-MM-DD') : d[groupBy] === h.value)}
    />);
  }

  render () {
    const { currentMoment } = this.props;
    const cells = this.renderCells(currentMoment);
    return (
      <div
        className="row"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
        }}
      >
        { cells }
      </div>
    );
  }
}

export default Row;