import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/cell.css';

class Cell extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }
  static defaultProps = {
    width: 100,
    height: 60,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { width, height } = this.props;
    const cellStyle = {
      width,
      height,
    };
    return (
      <div
        className="cell"
        style={cellStyle}
      >cell</div>
    );
  }
}

export default Cell;