import React, { Component } from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      modalIsOpen : false
    };
  }
  modalOpenHandler = () => {
    this.setState({modalIsOpen : true});
  }
  modalCloseHandler = () => {
    this.setState({modalIsOpen : false});
  }
    render() {
    return (
      <div className="header-container">
        <img className="app-logo" src={logo} alt="App Logo" />
        <div className="login-btn">
          <Button variant="contained" onClick={this.modalOpenHandler}>Login</Button>
        </div>
        <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.modalCloseHandler}>

        </Modal>
      </div>
      
    )

  }
}

export default Header;