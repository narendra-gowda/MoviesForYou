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
import {NavLink} from 'react-router-dom';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%'
  }
};
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
      phoneHelperDisplay: "dispNone",
      registrationSuccess : true,
      success: "dispNone",
      loggedIn: sessionStorage.getItem('access-token') ? true : false 
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
                    phoneHelperDisplay: "dispNone",
                    success: "dispNone"
                   });
    this.setState({ value: 0 });
  }
  tabChangeHandler = (event, value) => {
    this.setState({ value });        //Short for {value : value}
  }
  loginDisplayHelperTextHandler = () => {
    this.state.username === '' ? this.setState({ usernameHelperDisplay: "dispBlock" }) : this.setState({ usernameHelperDisplay: "dispNone" });
    this.state.password === '' ? this.setState({ passwordHelperDisplay: "dispBlock" }) : this.setState({ passwordHelperDisplay: "dispNone" });

    {/* //API CALL TO LOGIN USING ACCESS TOKEN
    let loginData = null;
    let that = this;
    let param = window.btoa(this.state.username +":"+ this.state.password);
    let xhrLogin = new XMLHttpRequest();
    xhrLogin.addEventListener("readystatechange", function(){
      if(this.readyState === 4){
        sessionStorage.setItem('user-details', JSON.parse(this.responseText).id);
        sessionStorage.setItem('access-token', xhrLogin.getResponseHeader('access-token'));
        that.setState({loggedIn: true});
        this.modalCloseHandler();
      }      
    });
    xhrLogin.open("POST", this.props.baseUrl + "auth/login");
    xhrLogin.setRequestHeader("Authorization", "Basic"+ param);
    xhrLogin.setRequestHeader("Content-Type", "application/json")
    xhrLogin.setRequestHeader("Cache-control", "no-cache");
    xhrLogin.send(loginData);  */}
  } 

  registerDisplayHelperTextHandler = () => {
    this.state.firstName === '' ? this.setState({ firstNameHelperDisplay: "dispBlock" }) : this.setState({ firstNameHelperDisplay: "dispNone" });
    this.state.lastName === '' ? this.setState({ lastNameHelperDisplay: "dispBlock" }) : this.setState({ lastNameHelperDisplay: "dispNone" });
    this.state.email === '' ? this.setState({ emailHelperDisplay: "dispBlock" }) : this.setState({ emailHelperDisplay: "dispNone" });
    this.state.registerPass === '' ? this.setState({ registerPassHelperDisplay: "dispBlock" }) : this.setState({ registerPassHelperDisplay: "dispNone" });
    this.state.phone === '' ? this.setState({ phoneHelperDisplay: "dispBlock" }) : this.setState({ phoneHelperDisplay: "dispNone" });
    
    //TO DISPLAY REGISTRATION SUCCESSFUL MSG
    let s = this.state;
    if(s.firstName !== '' && s.lastname !== '' && s.email !== '' && s.registerPass !== '' && s.phone !== ''){
      this.setState({success: "dispBlock"});
    }else{
      this.setState({success: "dispNone"});
    }


    {/* //API CALL TO REGISTER USER
    let that = this;
    let signupData = JSON.stringify(
      {
        "email-address": this.state.email,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "mobile_number": this.state.phone,
        "password": this.state.password
    });
    let xhrSignup = new XMLHttpRequest();
    xhrSignup.addEventListener("readystatechange" , function() {
      if(this.readyState === 4){
        that.setState({registrationSuccess : true});
      }
    })
    xhrSignup.open("POST", this.props.baseUrl + "signup");
    xhrSignup.setRequestHeader("Content-Type", "application/json");
    xhrSignup.setRequestHeader("Cache-Control", "no-cache");
    xhrSignup.send(signupData);  */}
  } 
  logoutButtonHandler = (e) => {
    sessionStorage.removeItem('user-details');
    sessionStorage.removeItem('access-token');
    this.setState({loggedIn : false});
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
  // bookTicketHandler = () => {    // --Manual Routing--
  //   ReactDOM.render(<BookTicket />, document.getElementById('root'));
  // } 
  render() {
    return (
      
      <div className="header-container">
        <img className="app-logo" src={logo} alt="App Logo" />
        <div className="login-btn">
        {this.state.loggedIn === false ?
          <Button variant="contained" onClick={this.modalOpenHandler}>Login</Button> :
          <Button variant="contained" onClick={this.logoutButtonHandler}>Logout</Button> 
        }  
        </div>
        {
          this.props.showBookTicketButton === true && this.state.loggedIn ?
          <div className="book-ticket-btn">
            <NavLink to={"/bookticket/"+ this.props.id}><Button variant="contained" color="primary">BOOK TICKETS</Button> </NavLink>            
          </div> : ""
        }
        {
          this.props.showBookTicketButton === true && !this.state.loggedIn ?
          <div className="book-ticket-btn">
            <Button variant="contained" color="primary" onClick={this.modalOpenHandler}>BOOK TICKETS</Button>            
          </div> : ""
        }
        
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
              </FormControl><br/><br/>
              {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }<br /><br />
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
              { this.state.registrationSuccess === true &&
                <FormControl>
                  <span className={this.state.success} style={{fontSize: '0.4cm' ,color: 'green'}}>Registration successful! Please Login</span>
                </FormControl>} <br/>                               
              <Button variant="contained" color="primary" onClick={this.registerDisplayHelperTextHandler}>REGISTER</Button>            
            </TabContainer>
          }
        </Modal>
      </div>
    )
  }
}

export default Header;