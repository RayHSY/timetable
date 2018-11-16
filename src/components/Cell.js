import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/cell.css';

class Cell extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
  }
  static defaultProps = {
    width: 100,
    height: 60,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { width, height, data } = this.props;
    const cellStyle = {
      width,
      height,
    };

    if (data.length === 0) {
      return (
        <div
          className="cell"
          style={cellStyle}
        >
        <li style={{ width, height }}></li>
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
      </div>
    );
  }
}

export default Cell;