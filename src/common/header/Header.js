import React, { Component } from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import multimedia from '../../assets/multimedia.svg';

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <img className="app-logo" src={multimedia} alt="App Logo" />
        <div className="login-btn">
          <Button variant="contained">Login</Button>
        </div>
      </div>
    )

  }
}

export default Header;