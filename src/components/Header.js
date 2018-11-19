import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// import './style/header.css';

const headerCss = {
  timeHeader: {
    width: '100%',
    height: 50,
    overflow: 'hidden',
    borderBottom: '1px solid lightblue',
  },
  
  timeheaderUl: {
    boxSizing: 'content-box',
    height: 50,
    overflowX: 'scroll', 
    overflowY: 'hidden',
    paddingBottom: 20, 
    display: 'flex',
    flexWrap: 'nowrap',
    listStyle: 'none',
  },
  
  timeheaderLi: {
    /* flex: 1, */
    width: 100,
    flexShrink: 0,
    textAlign: 'center',
    cursor: 'pointer',
  },
  
  date: {
    marginRight: '1em', 
  },
};

class Header extends Component {
  static propTypes = {
    height: PropTypes.number,
    onScroll: PropTypes.func,
    currentMoment: PropTypes.object,
    saveRef: PropTypes.func,
  }
  static defaultProps = {
    height: 40,
    currentMoment: moment(),
  }

  componentDidMount () {
    this.timeUl.scrollLeft = (this.props.currentMoment.date() - 3) * 100;
  }

  parseDay = (day) => {
    switch (day) {
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
      case 0:
        return '周日';
      default:
        return 'error';
    }
  }

  bind = (ref) => {
    this.props.saveRef('timeHeader')(ref);
    this.timeUl = ref;
  }

  render () {
    const { height, onScroll, currentMoment } = this.props;
    const headerSt = {
      height,
    };
    const dates = [];
    for (let d = 1; d <= moment(currentMoment).daysInMonth(); d++) {
      dates.push(moment().set({
        'year': currentMoment.year(),
        'date': d,
        'month': currentMoment.month(),
      }));
    }
    
    return (
      <div style={{...headerCss.timeHeader, ...headerSt}} className="time-header">
        <ul ref={this.bind} style={{...headerCss.timeheaderUl, ...headerSt}} onScroll={onScroll}>
         {
           dates.map((date, index) =>
            <li
              style={{
                ...headerCss.timeheaderLi,
                ...headerSt,
                lineHeight: height + 'px',
                color: index === currentMoment.date() - 1 ? 'red' : 'rgba(0, 0, 0, .8)',
              }}
              key={date.format('YYYY-MM-DD')}
            >
              <span className="date" style={headerCss.date}>{index + 1}</span>{this.parseDay(date.day())}
            </li>
          )
         }
        </ul>
      </div>
    );
  }
}

export default Header;