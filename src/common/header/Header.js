import React, { Component } from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%'
  }
}
const TabContainer = function (props) {
  return(
    <Typography component="div" style={{padding:0, textAlign:'center'}}>
      {props.children}
    </Typography>
  )
}
TabContainer.propTypes = {
  children : PropTypes.node.isRequired
}
class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      username: '',
      displayAction: "dispNone"
    };
  }
  modalOpenHandler = () => {
    this.setState({ modalIsOpen: true });
  }
  modalCloseHandler = () => {
    this.setState({ modalIsOpen: false });
  }
  tabChangeHandler = (event, value) => {
    this.setState({ value });        //Short for {value : value}
  }
  displayHelperTextHandler = () =>{
    this.state.username === '' ? this.setState({displayAction: "dispBlock"}) : this.setState({displayAction: "dispNone"});
  }
  inputChangeHandler = (event) =>{
    let username = event.target.value;
    this.setState({username});
  }
  render() {
    return (
      <div className="header-container">
        <img className="app-logo" src={logo} alt="App Logo" />
        <div className="login-btn">
          <Button variant="contained" onClick={this.modalOpenHandler}>Login</Button>
        </div>
        <Modal ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.modalCloseHandler}
          style={modalStyle}>
          <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {this.state.value === 0 &&
          <TabContainer >
            <FormControl  required>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" type="text" onChange={this.inputChangeHandler}/>
              <FormHelperText className={this.state.displayAction} style={{color:'red'}}>required</FormHelperText>
              </FormControl><br/><br/>
              <FormControl required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" /><br/><br/>
              <Button variant="contained" color="primary" onClick={this.displayHelperTextHandler}>LOGIN</Button>
            </FormControl>
          </TabContainer>
          }          
        </Modal>
      </div>
    )
  }
}

export default Header;