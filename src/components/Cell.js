import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import './style/cell.css';

const cellCss = {
  cell: {
    flexShrink: 0,
    border: '1px solid rgba(0,0,0, .45)',
    borderTop: 0,
    borderLeft: 0,
    flex: 1,
  },
  cellDiv: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .45)',
  },
};

class Cell extends Component {
  static propTypes = {
    data: PropTypes.array,
    isToday: PropTypes.bool,
    cells: PropTypes.object,
    status: PropTypes.object,
  }
  static defaultProps = {
    isToday: false,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { data, isToday, cells, status } = this.props;
    const cellStyle = {
      ...cellCss.cell,
      minWidth: cells.minWidth,
      height: cells.height,
      position: 'relative',
    };
    const todayStyle = {
      height: 1,
      width: '100%',
      background: 'red',
      top: moment().minute() / 60 * cells.height,
      position: 'absolute',
    };
    const circleStyle = {
      display: 'block',
      height: 5,
      width: 5,
      borderRadius: '50%',
      background: 'red',
      position: 'absolute',
      top: -1,
      left: cells.minWidth * 0.5 - 5,
    };
    if (data.length === 0) {
      return (
        <div
          className="cell"
          style={cellStyle}
        >
          <div style={{ width: cells.minWidth, height: cells.height }} />
          { isToday ? <div style={todayStyle}><span style={circleStyle} /></div> : null}
        </div>
      );
    }
    const d = data[0];
    const dStartMinute = parseInt(d.startTime.split(':')[1]);
    const dEndMinute = parseInt(d.endTime.split(':')[1]);
    const liStyle = {
      ...cellCss.cellDiv,
      height: dEndMinute - dStartMinute / 60 * cells.height,
      width: '100%',
      background: status[d.status].background,
      borderLeft: `3px solid ${status[d.status].border}`,
    };
    return (
      <div
        className="cell"
        style={cellStyle}
      >
        <div style={liStyle}>{d.courseCategoryName}</div>
        { isToday ? <div style={todayStyle} /> : null}
      </div>
    );
  }
}

export default Cell;