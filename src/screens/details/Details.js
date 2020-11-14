import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import Home from '../home/Home';
import './Details.css';
import YouTube from 'react-youtube';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      movie: {}
    }
  }
  componentWillMount() {
    let currentState = this.state;
    currentState.movie = moviesData.filter((movi) => {
      return movi.id === this.props.movieId;
    })[0];
    this.setState({ currentState });
    console.log(this.state);
  }
  returnToHomeHandler = () =>{
    ReactDOM.render(<Home />,document.getElementById('root'));
  }
//   _onReady(event) {
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();    //Pauses the video after loading
// }
  render() {
    let movie = this.state.movie;
    const opts = {
      // height: 300,
      // width: 500,
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <div className="details">
        <Header />
        <div className="back">
          <Typography onClick={this.returnToHomeHandler}>
          &#60; Back to Home
          </Typography>
        </div>
        <div className="flex-containerDetails">
          <div className="leftDetails">
          <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="middleDetails">
          <div>
             <Typography variant="headline" component="h2">
               {movie.title}
             </Typography>
           </div><br/>
           <div>
             <Typography >
               <span className="bold">Genre: </span>{movie.genres.join(', ')}
             </Typography>
           </div>
           <div>
             <Typography >
               <span className="bold">Duration: </span>{movie.duration}
             </Typography>
           </div>
           <div>
             <Typography >
               <span className="bold">Release Date: </span>{new Date(movie.release_date).toDateString()}
             </Typography>
           </div>
           <div>
             <Typography >
               <span className="bold">Rating: </span>{movie.critics_rating}
             </Typography>
           </div><br />
           <div>
             <Typography >
               <span className="bold">Plot: </span><a href={movie.wiki_url} target="_blank">(Wiki Link)</a>{movie.storyline}
             </Typography>
           </div><br/>
           <div className="trailerContainer">
             <Typography><span className="bold">Trailer: </span></Typography>
             <YouTube 
                videoId={movie.trailer_url.split('?v=')[1]}
                opts={opts}
                onReady={this._onReady}>
             </YouTube>
           </div>
          </div>
          <div className="rightDetails">
          </div>
        </div>
      </div>
    );
  }
}
export default Details;
