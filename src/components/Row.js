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
  }
  static defaultProps = {
    currentMoment: moment(),
    data: [],
    isTime: false,
  }

  static contextTypes = {
    groupBy: PropTypes.string,
    cells: PropTypes.object,
    status: PropTypes.object,
  }

  constructor (props) {
    super(props);
  }

  renderCells = (currentMoment) => {
    const { data, isTime, header } = this.props;
    const { groupBy, cells, status } = this.context;
    return header.map((h, index) => <Cell
      isToday={isTime && moment.isMoment(h.value) && h.value.date() === currentMoment.date()}
      key={h.key}
      cells={cells}
      status={status}
      hiddenBorder={index === header.length - 1}
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