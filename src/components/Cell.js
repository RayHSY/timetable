import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/cell.css';
import moment from 'moment';

class Cell extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    isToday: PropTypes.bool,
  }
  static defaultProps = {
    width: 100,
    height: 60,
    isToday: false,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { width, height, data, isToday } = this.props;
    const cellStyle = {
      width,
      height,
      position: 'relative',
    };
    const todayStyle = {
      height: 1,
      width: '100%',
      background: 'red',
      top: moment().minute() / 60 * height,
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
      left: width * 0.5 - 5,
    };

    if (data.length === 0) {
      return (
        <div
          className="cell"
          style={cellStyle}
        >
        <li style={{ width, height }}></li>
        { isToday ? <div style={todayStyle}><span style={circleStyle}></span></div> : null}
        </div>
      );
    }
    const d = data[0];
    const dStartMinute = parseInt(d.startTime.split(':')[1]);
    const dEndMinute = parseInt(d.endTime.split(':')[1]);
    const liStyle = {
      height: dEndMinute - dStartMinute / 60 * height,
      width,
      background: 'rgba(0, 200, 0, .8)',
      borderLeft: '3px solid red',
    };
    return (
      <div
        className="cell"
        style={cellStyle}
      >
        <li style={liStyle}>{`${d.name}  ${d.teacher}`}</li>
        { isToday ? <div style={todayStyle}></div> : null}
      </div>
    );
  }
}

export default Cell;