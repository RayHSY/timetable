import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import unionBy from 'lodash.uniqby';
import Timeline from './Timeline';
import Header from './Header';
import Body from './Body';
import commonCss from './style/common';
import { defaultOptions } from './utils/utils';

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
    style: PropTypes.object,

    onChange: PropTypes.func,

    datePick: PropTypes.any,
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

  previous1 = () => {
    const { onChange, groupBy } = this.props;

    if (!groupBy) {
      this.setState({
        currentMoment: this.state.currentMoment.subtract(1, 'month'),
      });
    }

    if (groupBy === 'teacher' || groupBy === 'classRoom') {
      this.setState({
        currentMoment: this.state.currentMoment.subtract(1, 'day'),
      });
    }

    if (onChange) {
      onChange();
    }
  }

  previous2 = () => {
    const { onChange, groupBy } = this.props;

    if (!groupBy) {
      this.setState({
        currentMoment: this.state.currentMoment.subtract(1, 'year'),
      });
    }

    if (onChange) {
      onChange();
    }
  }

  next1 = () => {
    const { onChange, groupBy } = this.props;

    if (!groupBy) {
      this.setState({
        currentMoment: this.state.currentMoment.add(1, 'month'),
      });
    }

    if (groupBy === 'teacher' || groupBy === 'classRoom') {
      this.setState({
        currentMoment: this.state.currentMoment.add(1, 'day'),
      });
    }

    if (onChange) {
      onChange();
    }
  }

  next2 = () => {
    const { onChange, groupBy } = this.props;

    if (!groupBy) {
      this.setState({
        currentMoment: this.state.currentMoment.add(1, 'year'),
      });
    }

    if (onChange) {
      onChange();
    }
  }

  switchHeader = (groupBy) => {
    const { currentMoment } = this.state;
    switch (groupBy) {
      case 'teacher': case 'classRoom':
        return <p style={{ width: '40%' }}>{currentMoment.format('YYYY年MM月DD日')}</p>;
      case 'date':
        return <p style={{ width: '40%' }}>title</p>;
      default:
        return <p style={{ width: '34%' }}>{currentMoment.format('YYYY年MM月')}</p>;
    }
  }

  filterData = () => {
    const { currentMoment } = this.state;
    const { groupBy, data } = this.props;

    switch (groupBy) {
      case 'teacher': case 'classRoom':
        return data.filter(d => d.date === currentMoment.format('YYYY-MM-DD'));
      default:
        return data;
    }
  }

  renderDatePick = (datePick) => {
    if (!datePick) {
      return <div style={commonCss.datepick}>
      { !this.props.groupBy ? <span style={commonCss.arrowLeft} onClick={this.previous2}>{`<<`}</span> : null }
      <span style={commonCss.arrowLeft} onClick={this.previous1}>{`<`}</span>
      { this.switchHeader(this.props.groupBy) }
      <span style={commonCss.arrowRight} onClick={this.next1}>{`>`}</span>
      { !this.props.groupBy ? <span style={commonCss.arrowRight} onClick={this.next2}>{`>>`}</span> : null }
    </div>
    }

    return datePick;
  }

  render() {
    const { width, height, headerHeight, timelineWidth, datePick, data: DATA, groupBy, cells, style, status} = this.props;
    const { currentMoment } = this.state;
    const data = DATA && this.filterData(DATA);

    // 用原型data去渲染header
    const header = this.renderHeader(DATA, groupBy);

    const DatePick = this.renderDatePick(datePick);
    
    return (
      <div className="timetable-wrapper" style={{ ...commonCss.timeTableWrapper, width, ...style }}>
        <header className="t-header" style={{...commonCss.timeTableHeader, paddingLeft: timelineWidth}}>
          <div style={commonCss.flex1}>other</div>
          { DatePick }
          {/* <div style={commonCss.datepick}>
            { !groupBy ? <span style={commonCss.arrowLeft} onClick={this.previous2}>{`<<`}</span> : null }
            <span style={commonCss.arrowLeft} onClick={this.previous1}>{`<`}</span>
            { this.switchHeader(groupBy) }
            <span style={commonCss.arrowRight} onClick={this.next1}>{`>`}</span>
            { !groupBy ? <span style={commonCss.arrowRight} onClick={this.next2}>{`>>`}</span> : null }
          </div> */}
          <div style={commonCss.statusUl}>
            {Object.keys(status).map(key => <div style={commonCss.statusLi} key={key}><span style={{ ...commonCss.circle, backgroundColor: status[key].border }} />{status[key].text}</div>)}
          </div>
        </header>

        <div style={{...commonCss.timeTable, height}} className="time-table">
          <div className="timeline-box" style={commonCss.timelineBox}>
            <Timeline cells={cells} saveRef={this.saveRef} onScroll={this.handleScroll} />
          </div>
          <div className="timeline-body" style={{ ...commonCss.timelineBody, width: width - timelineWidth }}>
            <Header currentMoment={currentMoment} header={header} cells={cells} saveRef={this.saveRef} height={headerHeight} onScroll={this.handleScroll} />
            <Body currentMoment={currentMoment} data={data} header={header} saveRef={this.saveRef} height={height - headerHeight} onScroll={this.handleScroll} />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeTable;
