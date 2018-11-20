import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from './Row';
import { times } from '../contants/utils';

// import './style/body.css';

class Body extends Component {
  static propTypes = {
    height: PropTypes.number,
    currentMoment: PropTypes.object,
    onScroll: PropTypes.func,
    data: PropTypes.array,
    header: PropTypes.array,
    saveRef: PropTypes.func,
  }
  static defaultProps = {
    currentMoment: moment(),
    data: [],
  }

  constructor (props) {
    super(props);
  }

  renderRows = (data) => {
    const { currentMoment, header } = this.props;
    return times.map((time, index) => {
      const tStartTime = moment(time, 'HH:mm');
      const tEndTime = moment(times[index + 1], 'HH:mm');
      const filterData = data.filter(d => {
        const startTime = moment(d.startTime, 'HH:mm');
        const endTime = moment(d.endTime, 'HH:mm');
        return (startTime.isAfter(tStartTime) || startTime.isSame(tStartTime)) && (endTime.isBefore(tEndTime) || endTime.isSame(tEndTime));
      });
      const isTime = (currentMoment.isAfter(tStartTime) || currentMoment.isSame(tStartTime)) && (currentMoment.isBefore(tEndTime) || currentMoment.isSame(tEndTime));
      return <Row isTime={isTime} key={time} data={filterData} header={header} />;
    });
  }

  bind = (ref) => {
    this.props.saveRef('timeBody')(ref);
    this.body = ref;
  }

  render () {
    const { height, onScroll, data } = this.props;
    const body = this.renderRows(data);
    return (
      <div
        className="body"
        style={{
          height,
          overflow: 'scroll',
        }}
        onScroll={onScroll}
        ref={this.bind}
      >
        { body }
      </div>
    );
  }
}

export default Body;