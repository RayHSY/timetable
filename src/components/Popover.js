import React, { Component } from "react";
import PropTypes from 'prop-types';

const popoverStyle = {
  wrapper: {
    position: 'relative',
  },

  popover: {
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    minWidth: 177,
    background: '#fff',
    left: '88%',
    top: '80%',
    boxShadow: '1px 1px 10px #ccc',
    opacity: 0,
    transition: 'opacity .3s ease-in',
  },

  header: {
    margin: '0 16px',
    padding: '5px 0 4px',
    borderBottom: '1px solid #e8e8e8',
  },

  content: {
    padding: '12px 16px',
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
    };
  }

  hoverShow = () => {
    this.setState({
      isShow: true,
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
    });

    setTimeout(() => {
      this.setState({
        opacity: 0,
      });
    });
  }

  render () {
    const { children, title, content } = this.props;
    return (
      <div style={popoverStyle.wrapper} onMouseEnter={this.hoverShow} onMouseLeave={this.hoverHidden}>
        { children }

        { this.state.isShow ?
          <div style={{...popoverStyle.popover, opacity: this.state.opacity}}>
            <header style={popoverStyle.header}>{title}</header>
            <div style={popoverStyle.content}>{content}</div>
          </div> : null 
        }
      </div>
    );
  }
}

export default Popover;