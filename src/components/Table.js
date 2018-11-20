import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import unionBy from 'lodash.uniqby';
import Timeline from './Timeline';
import Header from './Header';
import Body from './Body';
import commonCss from './style/common';
import defaultOptions from './utils/options';

class TimeTable extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    headerHeight: PropTypes.number,
    timelineWidth: PropTypes.number,
    data: PropTypes.array,
    groupBy: PropTypes.string,
    status: PropTypes.object,
    cells: PropTypes.object,
  }
  static defaultProps = {
    width: 600,
    height: 400,
    headerHeight: 40,
    timelineWidth: 60,
    data: [],
    groupBy: '',
    ...defaultOptions,
  }

  static childContextTypes = {
    groupBy: PropTypes.string,
    options: PropTypes.object,
    status: PropTypes.object,
    cells: PropTypes.object,
  }

  state = {
    scrollLeft: 0,
    scrollTop: 0,
    currentMoment: moment(),
  }

  getChildContext = () => ({
    groupBy: this.props.groupBy,
    status: this.props.status,
    cells: this.props.cells,
  })

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

  renderHeader = (data, groupBy) => {
    if (!groupBy) {
      const { currentMoment } = this.state;
      const header = [];
      for (let date = 1; date <= currentMoment.daysInMonth(); date++) {
        const value = moment().set({
          'year': currentMoment.year(),
          'date': date,
          'month': currentMoment.month(),
        });
        header.push({
          key: value.format('YYYY-MM-DD'),
          value,
        });
      }
      return header;
    }
    return unionBy(data.map(d => ({
      key: d.id,
      value: d[groupBy],
    })), 'value');
  }

  render() {
    const { width, height, headerHeight, timelineWidth, data, groupBy, cells } = this.props;
    const header = this.renderHeader(data, groupBy);
    
    return (
      <div style={{ ...commonCss.timeTable, width, height }} className="time-table">
        <div className="timeline-box" style={commonCss.timelineBox}>
          <Timeline cells={cells} saveRef={this.saveRef} onScroll={this.handleScroll} />
        </div>
        <div className="timeline-body" style={{ ...commonCss.timelineBody, width: width - timelineWidth }}>
          <Header header={header} cells={cells} saveRef={this.saveRef} height={headerHeight} onScroll={this.handleScroll} />
          <Body data={data} header={header} saveRef={this.saveRef} height={height - headerHeight} onScroll={this.handleScroll} />
        </div>
      </div>
    );
  }
}

export default TimeTable;
