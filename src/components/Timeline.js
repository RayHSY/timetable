import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { times } from '../contants/utils';
// import './style/timeline.css';

const timelineCss = {
  timeline: {
    width: 60,
    height: '100%',
    overflow: 'hidden',
  },
  
  timelineUl: {
    boxSizing: 'content-box',
    width: 60,
    paddingRight: 20,
    height: '100%',
    listStyle: 'none',
    overflowY: 'scroll',
    textAlign: 'right',
  },
  
  timelineLi: {
    color: 'rgba(0, 0, 0, .45)',
    position: 'relative',
  },
  
  timeContext: {
    position: 'absolute',
    top: -10,
    left: 10,
  },
};

// console.log(styles)
class Timeline extends Component {
  static propTypes = {
    onScroll: PropTypes.func,
    currentMoment: PropTypes.object,
    saveRef: PropTypes.fun,
    cells: PropTypes.object,
  }
  static defaultProps = {
    currentMoment: moment(),
  }

  componentDidMount () {
    this.timeline.scrollTop = (this.props.currentMoment.hour() - 3) * this.props.cells.height;
  }

  bind = (ref) => {
    this.props.saveRef('timeline')(ref);
    this.timeline = ref;
  }

  render () {
    const { onScroll, cells } = this.props;
    return (
      <div className="timeline" style={timelineCss.timeline}>
        <ul style={timelineCss.timelineUl} ref={this.bind} onScroll={onScroll}>
          {
            times.map(time => <li style={{...timelineCss.timelineLi, height: cells.height}} key={time}><span className="time-context" style={timelineCss.timeContext}>{time === '00:00' ? null : time}</span></li>)
          }
        </ul>
      </div>
    );
  }
}

export default Timeline;