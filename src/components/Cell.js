import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Popover from './Popover';
import { circle } from './style/common';

const cellCss = {
  cell: {
    flexShrink: 0,
    border: '1px solid rgb(225, 228,236)',
    borderTop: 0,
    borderLeft: 0,
    flex: 1,
  },
  cellDiv: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, .45)',
  },
};

const cardCss = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  headerName: {},
  headerStatus: {},

  content: {
    fontSize: 12,
  },

  mt: {
    marginTop: 10,
  }
};

const CardHeader = ({ courseCategoryName, teacher, statusKey, status }) => {
  return (
    <div style={cardCss.header}>
      <div style={cardCss.headerName}>{`${courseCategoryName}: ${teacher}`}</div>
      <div style={cardCss.headerStatus}><span style={{ ...circle, backgroundColor: status[statusKey].border }} />{status[statusKey].text}</div>
    </div>
  );
};
CardHeader.propTypes = {
  courseCategoryName: PropTypes.string,
  teacher: PropTypes.string,
  status: PropTypes.object,
  statusKey: PropTypes.string,
};

const CardContent = ({ date, startTime, endTime, classRoom, student, creator }) => {
  const mDate = moment(date);
  return (
    <div style={cardCss.content}>
      <p>{`${mDate.format('YYYY年MM月DD日')} 周${mDate.day()}`}</p>
      <p>{`${startTime} ~ ${endTime}`}</p>
      <p>{classRoom}</p>
      <p style={cardCss.mt}>排课人：{creator}</p>
      <p>学生：{student.map(st => st + ' ')}</p>
    </div>
  );
};
CardContent.propTypes = {
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  classRoom: PropTypes.string,
  student: PropTypes.array,
  creator: PropTypes.string,
};

class Cell extends Component {
  static propTypes = {
    data: PropTypes.array,
    isToday: PropTypes.bool,
    cells: PropTypes.object,
    status: PropTypes.object,
    hiddenBorder: PropTypes.bool,
  }
  static defaultProps = {
    isToday: false,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { data, isToday, cells, status, hiddenBorder } = this.props;
    const cellStyle = {
      ...cellCss.cell,
      minWidth: cells.minWidth,
      height: cells.height,
      position: 'relative',
      borderRight: hiddenBorder ? 0 : '1px solid rgb(225, 228,236)',
    };
    const todayStyle = {
      height: 1,
      width: '100%',
      background: 'rgba(227,98,130,1)',
      top: moment().minute() / 60 * cells.height,
      position: 'absolute',
    };
    const circleStyle = {
      display: 'block',
      height: 5,
      width: 5,
      borderRadius: '50%',
      background: 'rgba(227,98,130,1)',
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
      height: (dEndMinute - dStartMinute) / 60 * cells.height,
      width: '100%',
      background: status[d.status].background,
      borderLeft: `3px solid ${status[d.status].border}`,
    };
    return (
      <div
        className="cell"
        style={cellStyle}
      >
        <Popover
          title={<CardHeader
            courseCategoryName={d.courseCategoryName}
            teacher={d.teacher}
            status={status}
            statusKey={d.status}
          />}
          content={<CardContent
            date={d.date}
            startTime={d.startTime}
            endTime={d.endTime}
            classRoom={d.classRoom}
            student={d.student}
            creator={d.creator}
          />}
        >
          <div style={liStyle}>{d.courseCategoryName}</div>
        </Popover>
        { isToday ? <div style={todayStyle} /> : null}
      </div>
    );
  }
}

export default Cell;