import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import Home from '../../screens/home/Home';
import './BookTicket.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class BookTicket extends Component{
  backToHomeHandler = () =>{
    ReactDOM.render(<Home />, document.getElementById('root'));
  }
  render(){
    return(
      <div>
        <Header />
        <div className="back-btn">
        <Typography onClick={this.backToHomeHandler}>&#60; Back to Movie Details</Typography>
        </div>
        <div className="booking-card">
          <Card>
            <CardContent>
              <Typography variant="h6">BOOK TICKET</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
export default BookTicket;