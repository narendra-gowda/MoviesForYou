import React, { Component } from "react";
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { GridListTile, Typography } from "@material-ui/core";
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import {NavLink} from 'react-router-dom';

class Details extends Component {

  constructor() {
    super();
    this.state = {
      movie:{
        genres: [],
        artists: [],
        trailer_url: ''
      },
      starIcons: [
        {
           id: 1,
           stateId: "star1",
           color: "black"
        },
        {
           id: 2,
           stateId: "star2",
           color: "black"
        },
        {
           id: 3,
           stateId: "star3",
           color: "black"
        },
        {
           id: 4,
           stateId: "star4",
           color: "black"
        },
        {
           id: 5,
           stateId: "star5",
           color: "black"
        }
     ]
    }
  }
  componentWillMount() {
    let currentState = this.state;
    currentState.movie = moviesData.filter((movi) => {
      return movi.id === this.props.match.params.id;
    })[0];
    this.setState({ currentState });
    console.log(this.state);

    //-- API CALL TO FETCH DETAILS OF MOVIE VIA IT'S ID -- 
    /* let that = this;
    let detailsData = null;
    let xhrDetails = new XMLHttpRequest();
    xhrDetails.addEventListener("readystatechange", function(){
      if(this.readyState === 4){
        that.setState({movie: JSON.parse(this.responseText)});
      }
    });
    xhrDetails.open("GET", this.props.baseUrl + "movie/"+ this.props.match.params.id);
    xhrDetails.setRequestHeader("Cache-Control", "no-cache");
    xhrDetails.send(detailsData); */
  }
  // returnToHomeHandler = () =>{ --Manual Routing--
  //   ReactDOM.render(<Home />,document.getElementById('root'));
  // }
//   _onReady(event) {   --YouTube package Property--
//     // access to player in all event handlers via event.target
//     event.target.pauseVideo();    //Pauses the video after loading
// }
starRatingHandler(starId) {
  let star = this.state.starIcons;
  for(let i=0; i<star.length; i++){
    if(star[i].id <= starId){
    star[i].color = "yellow";
  }else{
    star[i].color = "black";
  } 
}
  this.setState({star});
}
  render() {
    let movie = this.state.movie;
    const opts = {
      height: 300,
      width: 700,
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <div className="details">
        <Header id={this.props.match.params.id} showBookTicketButton={true}/>
        <div className="back">
          <Typography >
            <NavLink to="/"> &#60; Back to Home </NavLink>
          </Typography>
        </div>
        <div className="flex-containerDetails">
          <div className="leftDetails">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="middleDetails">
            <div>
             <Typography variant="h4">{movie.title}</Typography>
           </div><br/>
           <div>
             <Typography >
               <span className="bold">Genre: </span>{movie.genres.join(', ')}
             </Typography>
           </div>
           <div>
             <Typography><span className="bold">Duration: </span>{movie.duration}</Typography>
           </div>
           <div>
             <Typography ><span className="bold">Release Date: </span>{new Date(movie.release_date).toDateString()}</Typography>
           </div>
           <div>
             <Typography ><span className="bold">Rating: </span>{movie.critics_rating}</Typography>
           </div><br />
           <div>
             <Typography >
               <span className="bold">Plot: </span><a href={movie.wiki_url} target="_blank" rel="noreferrer">(Wiki Link)</a>{movie.storyline}
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
            <Typography><span className="bold">Rate this Movie: </span></Typography>
            {this.state.starIcons.map(star => (
              <StarOutlinedIcon 
                key={star.id} 
                className={star.color}
                onClick={() => this.starRatingHandler(star.id)}></StarOutlinedIcon>
            ))}            
            <div className="marginBottom16 marginTop16">
              <Typography><span className="bold">Artists:</span></Typography>
            </div>
            <div className="paddingRight">
              <GridList cols={2} cellHeight = {'auto'}>
                {movie.artists != null && movie.artists.map(actor => (
                  <GridListTile key={actor.id} style={{maxHeight: 160, maxWidth: 160}} className="gridTile">
                    <a href={actor.wiki_url} target="_blank" rel="noreferrer"><img width="100%" height="100%" src={actor.profile_url} alt={actor.first_name+" "+actor.last_name} /></a>
                    <GridListTileBar title={actor.first_name+" "+actor.last_name}></GridListTileBar>
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Details;
