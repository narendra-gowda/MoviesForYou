import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import BookTicket from '../screens/bookTicket/BookTicket';
import Confirmation from '../screens/confirmation/Confirmation';
import moviesData from '../common/moviesData';

class Controller extends Component {
  render() {
    return(
      <Router>
        <div className="main-container">
          <Route exact path = '/' render={(props) => <Home {...props} moviesData = {moviesData}/>} />
          <Route path = '/movie/:id' render={(props) => <Details {...props} />} />
          <Route path = '/bookticket/:id' render={(props) => <BookTicket {...props} />} />
          <Route path = '/confirm/:id' render={(props) => <Confirmation {...props} />} />
        </div>
      </Router>
    )
  }
}
export default Controller;