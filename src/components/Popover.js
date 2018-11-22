import React, { Component } from "react";
import PropTypes from 'prop-types';

const popoverStyle = {
  wrapper: {
    // position: 'relative',
  },

  popover: {
    position: 'fixed',
    width: 260,
    zIndex: 100,
    minWidth: 177,
    background: '#fff',
    boxShadow: '1px 1px 10px #ccc',
    borderRadius: '5px',
    opacity: 0,
    padding: '0 16px',
    transition: 'opacity .3s ease-in',
  },

  header: {
    padding: '6px 0',
    borderBottom: '1px solid #e8e8e8',
  },

  content: {
    padding: '10px 0',
  },
};

class Popover extends Component {
  static propTypes = {
    children: PropTypes.element,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  }
  constructor (props) {
    super(props);

    this.state = {
      isShow: false,
      opacity: 0,
      screen: {
        x: 0,
        y: 0,
      },
    };
  }

  hoverShow = (e) => {
    this.setState({
      isShow: true,
      screen: {
        x: e.clientX,
        y: e.clientY,
      },
    });

    setTimeout(() => {
      this.setState({
        opacity: 1,
      });
    });
  }

  hoverHidden = () => {
    this.setState({
      isShow: false,
      screen: {
        x: 0,
        y: 0,
      },
    });

    setTimeout(() => {
      this.setState({
        opacity: 0,
      });
    });
  }

  render () {
    const { children, title, content } = this.props;
    const { opacity, screen } = this.state;
    return (
      <div style={popoverStyle.wrapper} onMouseEnter={this.hoverShow} onMouseLeave={this.hoverHidden}>
        { children }

        { this.state.isShow ?
          <div style={{...popoverStyle.popover, opacity, top: screen.y, left: screen.x }}>
            <header style={popoverStyle.header}>{title}</header>
            <div style={popoverStyle.content}>{content}</div>
          </div> : null 
        }
      </div>
    );
  }
}

export default Popover;