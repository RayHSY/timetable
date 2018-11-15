import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import Header from './Header';
import Body from './Body';
import './style/common.css';

class TimeTable extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    headerHeight: PropTypes.number,
    headerWidth: PropTypes.number,
  }
  static defaultProps = {
    width: 600,
    height: 400,
    headerHeight: 40,
    headerWidth: 60,
  }

  state = {
    scrollLeft: 0,
    scrollTop: 0,
  }

  handleScroll = (e) => {
    const { scrollLeft, scrollTop } = this;
    switch (e.target) {
      case this.timeline:
        if (scrollTop !== e.target.scrollTop) {
          this.timeBody.scrollTop = e.target.scrollTop;
          this.scrollTop = e.target.scrollTop;
        }
        break;
      case this.timeBody:
        if (scrollTop !== e.target.scrollTop || scrollLeft !== e.target.scrollLeft) {
          this.timeline.scrollTop = e.target.scrollTop;
          this.timeHeader.scrollLeft = e.target.scrollLeft;
          this.scrollTop = e.target.scrollTop;
          this.scrollLeft = e.target.scrollLeft;
        }
        break;
      case this.timeHeader:
        if (scrollLeft !== e.target.scrollLeft) {
          this.timeBody.scrollLeft = e.target.scrollLeft;
          this.scrollLeft = e.target.scrollLeft;
        }
        break;
      default: break;
    }
  }

  saveRef = (name) => (ref) => {
    this[name] = ref;
  }

  render() {
    const { width, height, headerHeight, headerWidth } = this.props;
    return (
      <div style={{ width, height }} className="time-table">
        <div className="timeline-box">
          <Timeline saveRef={this.saveRef} onScroll={this.handleScroll} />
        </div>
        <div className="timeline-body" style={{ width: width - headerWidth }}>
          <Header saveRef={this.saveRef} height={headerHeight} onScroll={this.handleScroll} />
          <Body saveRef={this.saveRef} height={height - headerHeight} onScroll={this.handleScroll} />
        </div>
      </div>
    );
  }
}

export default TimeTable;
