import React,{Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header'
import {withStyles} from '@material-ui/core/styles';
import moviesData from '../../common/moviesData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
},
upcomingMoviesHeading: {
    textAlign: 'center',
    background: '#ff9999',
    padding: '8px',
    fontSize: '1rem',
    fontWeight: 600
},
gridListUpcomingMovies: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%',    
  },
  imageTile:{
    height: '100%',
    width: '100%'
  },
  gridList: {
    width: 780,
    height: 450,
    transform: 'translateZ(0)'
   },
   formControl: {
    margin: theme.spacing(),
    minWidth: 240,
    maxWidth: 240
 },
 title: {
    color: theme.palette.primary.light,
 }
});

class Home extends Component{
  
  constructor(){
    super();
    this.state= {
      movieName: ''
    };
  }
  movieNameHandler = (e) =>{
    this.setState({movieName: e.target.value});
  }
  render(){
    const {classes} = this.props;
    return(
      <div>
        <Header />
        <div className={classes.upcomingMoviesHeading}>
          <span>Upcoming Movies</span>
        </div>
        <GridList cols={5} className={classes.gridListUpcomingMovies}>
          {
            moviesData.map(movie => (
              <GridListTile key={movie.id} style={{height:270}}>
                <img src={movie.poster_url} alt={movie.title} className={classes.imageTile}/>
            <GridListTileBar title={movie.title}></GridListTileBar>
              </GridListTile>
            ))
          }
        </GridList>
        <div className="flex-container">
        <div className="released-movies">
        <GridList cols={3} spacing={25} className={classes.gridList}>
          {moviesData.map(movie =>(
            <GridListTile key={movie.id} style={{height:370, cursor: 'pointer'}}>
              <img src={movie.poster_url} alt={movie.title} className={classes.imageTile}/>
          <GridListTileBar title={movie.title} subtitle={<span>Release Date: {moment(movie.release_date).format("ddd MMM DD YYYY")}</span>}></GridListTileBar>
            </GridListTile>
          ))} 
        </GridList>
        </div>
        <div className="filters">
          <Card>
            <CardContent>
              <FormControl  className={classes.formControl}>
              <Typography className={classes.title}>FIND MOVIES BY:</Typography>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input id="movieName" onChange={this.movieNameHandler}/>
              </FormControl>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Home);