import React, {Component} from "react";
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import './Details.css';

class Details extends Component{
  constructor(){
    super();
    this.state = {
      movie : {}
    }
  }
  componentDidMount(){
    let currentState = this.state;
    currentState.movie = moviesData.filter((movi) => {
      return movi.id === this.props.movieId;
    });
    this.setState({currentState});
    console.log(this.state);
  }
  render(){
    return(
      <div className="flexContainer">
        <Header />
        <div className="left-details">

        </div>
        <div className="middle-details">

        </div>
        <div className="right-details">

        </div>
      </div>
    );
  }
}
export default Details;
