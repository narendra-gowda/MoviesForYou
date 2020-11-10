import React, { Component } from 'react';
import './Header.css';
import { Button } from '@material-ui/core';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div></div>
        <div className="login-btn">
        <Button variant="contained">Login</Button>;
        </div>
      </div>
  )

  }
}

export default Header;