import React, { Component } from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      modalIsOpen : false,
      value : 0
    };
  }
  modalOpenHandler = () => {
    this.setState({modalIsOpen : true});
  }
  modalCloseHandler = () => {
    this.setState({modalIsOpen : false});
  }
  tabChangeHandler = (event, value) =>{
    this.setState({value});        //Short for {value : value}
  }
    
  
    render() {
    return (
      <div className="header-container">
        <img className="app-logo" src={logo} alt="App Logo" />
        <div className="login-btn">
          <Button variant="contained" onClick={this.modalOpenHandler}>Login</Button>
        </div>
        <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.modalCloseHandler}>
          <Tabs value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="Login"></Tab>
            <Tab label="Register"></Tab>
          </Tabs>
        </Modal>
      </div>
      
    )

  }
}

export default Header;