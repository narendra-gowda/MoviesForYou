import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import BookTicket from '../screens/bookTicket/BookTicket';
import Confirmation from '../screens/confirmation/Confirmation';
import moviesData from '../common/moviesData';

class Controller extends Component {

  constructor(){
    super();
    this.baseUrl = "http://34.238.240.39:8085/api/v1"
  }
  render() {
    return(
      <Router>
        <div className="main-container">
          <Route exact path = '/' render={(props) => <Home {...props} moviesData = {moviesData} baseUrl = {this.baseUrl}/>} />
          <Route path = '/movie/:id' render={(props) => <Details {...props} baseUrl = {this.baseUrl}/>} />
          <Route path = '/bookticket/:id' render={(props) => <BookTicket {...props} baseUrl = {this.baseUrl}/>} />
          <Route path = '/confirm/:id' render={(props) => <Confirmation {...props} baseUrl = {this.baseUrl}/>} />
        </div>
      </Router>
    )
  }
}
export default Controller;