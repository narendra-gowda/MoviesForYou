import React, {Component} from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './BookTicket.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import location from '../../common/location';
import language from '../../common/language';
import showDate from '../../common/showDate';
import showTime from '../../common/showTime';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import {NavLink} from 'react-router-dom'

class BookTicket extends Component{

  constructor(){
    super();
    this.state= {
      location: '',
      language: '',
      showDate: '',
      showTime: '',
      tickets: 0,
      availableTickets: 20,
      unitPrice: 500,
      locationRequired: 'dispNone',
      langRequired: 'dispNone',
      dateRequired: 'dispNone',
      timeRequired: 'dispNone',
      ticketRequired: 'dispNone',
    }
  }
  // backToHomeHandler = () =>{  --Manual Routing--
  //   ReactDOM.render(<Home />, document.getElementById('root'));
  // }
  locationHandler = (e) => {
    this.setState({location : e.target.value});
  }
  languageHandler = (e) =>{
    this.setState({language : e.target.value});
  }
  showDateHandler = (e) =>{
    this.setState({showDate : e.target.value});
  }
  showTimeHandler = (e) =>{
    this.setState({showTime : e.target.value});
  }
  ticketChangeHandler = (e) =>{
    this.setState({tickets : e.target.value});
  }
  bookTicketsHandler = () =>{
    let s = this.state;
    s.location === '' ? this.setState({locationRequired: 'dispBlock'}) : this.setState({locationRequired: 'dispNone'});
    s.language === '' ? this.setState({langRequired: 'dispBlock'}) : this.setState({langRequired: 'dispNone'});
    s.showDate === '' ? this.setState({dateRequired: 'dispBlock'}) : this.setState({dateRequired: 'dispNone'});
    s.showTime === '' ? this.setState({timeRequired: 'dispBlock'}) : this.setState({timeRequired: 'dispNone'});
    s.tickets <= 0 ? this.setState({ticketRequired: 'dispBlock'}) : this.setState({ticketRequired: 'dispNone'});

    if(s.location != '' && s.language != '' &&  s.showDate != '' && s.showTime != '' && s.tickets > 0){
    // ReactDOM.render(<Confirmation bookTicketProps={this.state}/>, document.getElementById('root'));  --Manual Routing--
     this.props.history.push({
       pathname : '/confirm/'+ this.props.match.params.id, 
       bookTicketProps : this.state
     });
    }
  }
  render(){
    return(
      <div>
        <Header style={{width : 100}}/>
        <div className="bookTicket">
          <div className="back-btn">
            <Typography>
              <NavLink to={"/movie/"+this.props.match.params.id}>&#60; Back to Movie Details</NavLink>
            </Typography>        
          </div>
          <Card className="cardStyle">
            <CardContent>
              <Typography variant="h6" color="primary">BOOK TICKET</Typography><br />
                <FormControl className="form-control" required>
                  <InputLabel htmlFor="location">Choose Location</InputLabel>
                  <Select 
                    value={this.state.location}
                    onChange={this.locationHandler}>
                      {location.map(loc => (
                        <MenuItem key={'loc'+loc.id} value={loc.location}>{loc.location}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className={this.state.locationRequired} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br />
                <FormControl className="form-control" required>
                  <InputLabel htmlFor="language">Choose Language</InputLabel>
                  <Select 
                    value={this.state.language}
                    onChange={this.languageHandler}>
                      {language.map(lan => (
                        <MenuItem key={'lan'+lan.id} value={lan.language}>{lan.language}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className={this.state.langRequired} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br/>
                <FormControl className="form-control" required>
                  <InputLabel htmlFor="location">Choose Show Date:</InputLabel>
                  <Select 
                    value={this.state.showDate}
                    onChange={this.showDateHandler}>
                      {showDate.map(date => (
                        <MenuItem key={'date'+date.id} value={date.showDate}>{date.showDate}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className={this.state.dateRequired} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br />
                <FormControl className="form-control" required>
                  <InputLabel htmlFor="location">Choose Show Time:</InputLabel>
                  <Select 
                    value={this.state.showTime}
                    onChange={this.showTimeHandler}>
                      {showTime.map(time => (
                        <MenuItem key={'time'+time.id} value={time.showTime}>{time.showTime}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className={this.state.timeRequired} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br />   
                <FormControl className="form-control" required>
                  <InputLabel htmlFor="tickets">Tickets: ( {this.state.availableTickets} Tickets available )</InputLabel>
                  <Input id="tickets" value={this.state.tickets !== 0 ? this.state.tickets : "" } onChange={this.ticketChangeHandler} />
                  <FormHelperText className={this.state.ticketRequired} style={{color:'red'}}>required</FormHelperText>
                </FormControl><br /><br/>
                <Typography className="left">Unit Price: Rs. {this.state.unitPrice}</Typography><br />
                <Typography className="left">Total Price: Rs. {this.state.unitPrice * this.state.tickets}</Typography><br />
                <Button  variant="contained" color="primary" onClick={this.bookTicketsHandler}>BOOK</Button>    
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
export default BookTicket;