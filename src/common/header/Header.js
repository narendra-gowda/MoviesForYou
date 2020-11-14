import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import BookTicket from '../../screens/bookTicket/BookTicket';

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
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  )
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}
class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      username: '',
      usernameHelperDisplay: "dispNone",
      password: '',
      passwordHelperDisplay: "dispNone",
      firstName: '',
      firstNameHelperDisplay: "dispNone",
      lastName: '',
      lastNameHelperDisplay: "dispNone",
      email: '',
      emailHelperDisplay: "dispNone",
      registerPass: '',
      registerPassHelperDisplay: "dispNone",
      phone: '',
      phoneHelperDisplay: "dispNone"
    };
  }
  modalOpenHandler = () => {
    this.setState({ modalIsOpen: true });
  }
  modalCloseHandler = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ usernameHelperDisplay: "dispNone", 
                    passwordHelperDisplay: "dispNone",
                    firstNameHelperDisplay: "dispNone",
                    lastNameHelperDisplay: "dispNone",
                    emailHelperDisplay: "dispNone",
                    registerPassHelperDisplay: "dispNone",
                    phoneHelperDisplay: "dispNone"
                   });
    this.setState({ value: 0 });
  }
  tabChangeHandler = (event, value) => {
    this.setState({ value });        //Short for {value : value}
  }
  loginDisplayHelperTextHandler = () => {
    this.state.username === '' ? this.setState({ usernameHelperDisplay: "dispBlock" }) : this.setState({ usernameHelperDisplay: "dispNone" });
    this.state.password === '' ? this.setState({ passwordHelperDisplay: "dispBlock" }) : this.setState({ passwordHelperDisplay: "dispNone" });
  }
  registerDisplayHelperTextHandler = () => {
    this.state.firstName === '' ? this.setState({ firstNameHelperDisplay: "dispBlock" }) : this.setState({ firstNameHelperDisplay: "dispNone" });
    this.state.lastName === '' ? this.setState({ lastNameHelperDisplay: "dispBlock" }) : this.setState({ lastNameHelperDisplay: "dispNone" });
    this.state.email === '' ? this.setState({ emailHelperDisplay: "dispBlock" }) : this.setState({ emailHelperDisplay: "dispNone" });
    this.state.registerPass === '' ? this.setState({ registerPassHelperDisplay: "dispBlock" }) : this.setState({ registerPassHelperDisplay: "dispNone" });
    this.state.phone === '' ? this.setState({ phoneHelperDisplay: "dispBlock" }) : this.setState({ phoneHelperDisplay: "dispNone" });
  }
  loginUsernameChangeHandler = (event) => {
    let username = event.target.value;
    this.setState({ username });
  }
  loginPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  }
  registerFirstNameChangeHandler = (e) => {
    this.setState({ firstName: e.target.value});
  }
  registerLastNameChangeHandler = (e) => {
    this.setState({ lastName: e.target.value});
  }
  registerEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value});
  }
  registerRegisterPassChangeHandler = (e) => {
    this.setState({ registerPass: e.target.value});
  }
  registerPhoneChangeHandler = (e) => {
    this.setState({ phone: e.target.value});
  }
  bookTicketHandler = () => {
    ReactDOM.render(<BookTicket />, document.getElementById('root'));
  }
  render() {
    return (
      <div className="header-container">
        <img className="app-logo" src={logo} alt="App Logo" />
        <div className="login-btn">
          <Button variant="contained" onClick={this.modalOpenHandler}>Login</Button>          
        </div>
        {this.props.showBookTicketButton === true ?
        <div className="book-ticket-btn">
          <Button variant="contained" color="primary" onClick={this.bookTicketHandler}>BOOK TICKETS</Button>
          </div> : ""}
        
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
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" type="text" onChange={this.loginUsernameChangeHandler} />
                <FormHelperText className={this.state.usernameHelperDisplay} style={{ color: 'red' }}>required</FormHelperText>
              </FormControl><br /><br />
              <FormControl required>
                <InputLabel htmlFor="password" >Password</InputLabel>
                <Input id="password" type="password" onChange={this.loginPasswordChangeHandler} />
                <FormHelperText className={this.state.passwordHelperDisplay} style={{ color: 'red' }}>required</FormHelperText>    
              </FormControl><br /><br />
              <Button variant="contained" color="primary" onClick={this.loginDisplayHelperTextHandler}>LOGIN</Button>
            </TabContainer>
          }
          {this.state.value === 1 &&
            <TabContainer>
              <FormControl required>
                <InputLabel htmlFor="fName">First Name</InputLabel>
                <Input id="fName" type="text" onChange={this.registerFirstNameChangeHandler}/>
                <FormHelperText className={this.state.firstNameHelperDisplay} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br/>
                <FormControl required>
                <InputLabel htmlFor="lName">Last Name</InputLabel>
                <Input id="lName" type="text" onChange={this.registerLastNameChangeHandler}/>
                <FormHelperText className={this.state.lastNameHelperDisplay} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br/>
                <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" onChange={this.registerEmailChangeHandler}/>
                <FormHelperText className={this.state.emailHelperDisplay} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br/>
                <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" onChange={this.registerRegisterPassChangeHandler}/>
                <FormHelperText className={this.state.registerPassHelperDisplay} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br/>
                <FormControl required>
                <InputLabel htmlFor="phone">Contact No</InputLabel>
                <Input id="phone" type="text" onChange={this.registerPhoneChangeHandler}/>
                <FormHelperText className={this.state.phoneHelperDisplay} style={{color:'red'}}>required</FormHelperText>              
              </FormControl><br/><br/>  
              <Button variant="contained" color="primary" onClick={this.registerDisplayHelperTextHandler}>REGISTER</Button>            
            </TabContainer>
          }
        </Modal>
      </div>
    )
  }
}

export default Header;