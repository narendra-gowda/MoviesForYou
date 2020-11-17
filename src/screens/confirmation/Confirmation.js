import React, { Component } from 'react';
import './Confirmation.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-modal';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import coupons from '../../common/coupon';
import {NavLink} from 'react-router-dom';


const modalStyle = {
  content: {
    width: '25%',
    padding: '10px 30px',
    top: '13%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%',
    backgroundColor: 'rgb(60, 60, 60)'
  }
}

class Confirmation extends Component {

  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      coupon: '',
      totalPrice: 0,
      discountedPrice: 0,
    }
  }
  componentDidMount(){
    let currentState = this.state;
    currentState.discountedPrice = currentState.totalPrice = this.props.location.bookTicketProps.unitPrice * this.props.location.bookTicketProps.tickets;
    this.setState({state : currentState});
  }
  confirmBookingHandler = () =>{
    this.setState({ isModalOpen: true });
  }
  modalCloseHandler = () =>{
    this.setState({ isModalOpen : false});
    // ReactDOM.render(<Home />, document.getElementById('root')); --Manual Routing--
    this.props.history.push("/");
  }
  // backToBookShowHandler = () =>{
  //    ReactDOM.render(<BookTicket />, document.getElementById('root'));
  // }
  couponCodeHandler = (e) =>{
    this.setState({coupon : e.target.value});
  }
  couponApplyHandler = () =>{
    let currentstate = this.state;    
    let couponObj = coupons.filter(coup => {
      return currentstate.coupon === coup.code
    })[0];
    console.log(couponObj);

    if(couponObj !== undefined && couponObj.value>0 && couponObj.applied === false){
      currentstate.discountedPrice = currentstate.totalPrice - ((currentstate.totalPrice * couponObj.value) / 100);
      currentstate.totalPrice = currentstate.discountedPrice;
      couponObj.applied = true;  //Logic to use coupon code only once
      this.setState({currentstate});
    }else{
      this.setState({discountedPrice : currentstate.totalPrice}); 
    }
  }
  render() {
    return (
      <div className="summary">
        <Header />

        <div className="confirmation">
          <div className="back">
            <Typography >
              <NavLink to={"/bookticket/" + this.props.match.params.id} >&#60; Back to Book Show </NavLink>          
            </Typography>
          </div>
          <Card className="confirm-card">
            <CardContent>
              <Typography variant="h6" color="primary">SUMMARY</Typography><br/>  
              <Typography component="div">        
                <div className="grid-container">            
                  <span className="grid-item">Location:</span>
                  <span className="grid-item">{this.props.location.bookTicketProps.location}</span>
                  <span className="grid-item">Language:</span>
                  <span className="grid-item">{this.props.location.bookTicketProps.language}</span>
                  <span className="grid-item">Show Date:</span>
                  <span className="grid-item">{this.props.location.bookTicketProps.showDate}</span>
                  <span className="grid-item">Show Time:</span>
                  <span className="grid-item">{this.props.location.bookTicketProps.showTime}</span>
                  <span className="grid-item">Tickets:</span>
                  <span className="grid-item">{this.props.location.bookTicketProps.tickets}</span>
                  <span className="grid-item">Unit Price:</span>
                  <span className="grid-item">{this.props.location.bookTicketProps.unitPrice}</span>
                  <TextField style={{width: '160px'}} id="standard-basic" label="Coupon Code" onChange={this.couponCodeHandler}/>
                  <div className="apply-btn">
                  <Button variant="contained" color="primary" onClick={this.couponApplyHandler}>APPLY</Button>
                  </div>
                  <span className="grid-item-btm">Total Price:</span>
                  <span className="grid-item-btm">{this.state.discountedPrice}</span> 
                </div>
              </Typography><br/>
              <Button variant="contained" color="primary" onClick={this.confirmBookingHandler}>CONFIRM BOOKING</Button>                      
            </CardContent>
          </Card>
        </div>  
        <Modal ariaHideApp={false}
              isOpen={this.state.isModalOpen}
              contentLabel="Booking successful"
              onRequestClose={this.modalCloseHandler}
              style={modalStyle}>
                <div className="grid">
                   <div className="grid-i">
                      <CheckCircleIcon style={{height:'2.5rem', width:'2.5rem'}} className="icon" />
                   </div>
                   <div className="green">
                     <Typography style={{fontSize:'1.3rem', fontWeight:'bold'}}>Booking Confirmed!</Typography>                      
                   </div>                   
                   <span className="close" onClick={this.modalCloseHandler}> &times; </span>
                  </div>
        </Modal>
      </div>
    );
  }
}
export default Confirmation;