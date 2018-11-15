import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { times } from '../contants/utils';
import './style/timeline.css';

// console.log(styles)
class Timeline extends Component {
  static propTypes = {
    height: PropTypes.number,
    onScroll: PropTypes.func,
    currentMoment: PropTypes.object,
    saveRef: PropTypes.fun,
  }
  static defaultProps = {
    height: 400,
    currentMoment: moment(),
  }

  componentDidMount () {
    this.timeline.scrollTop = (this.props.currentMoment.hour() - 3) * 60;
  }

  bind = (ref) => {
    this.props.saveRef('timeline')(ref);
    this.timeline = ref;
  }

  render () {
    const { onScroll } = this.props;
    return (
      <div className="timeline">
        <ul ref={this.bind} onScroll={onScroll}>
         {
           times.map(time => <li key={time}><span className="time-context">{time === '00:00' ? null : time}</span></li>)
         }
        </ul>
      </div>
    );
  }
}

export default Timeline;