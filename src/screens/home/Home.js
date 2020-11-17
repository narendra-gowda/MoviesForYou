import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import moviesData from '../../common/moviesData';
import genres from '../../common/genres';
import artists from '../../common/artists';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Checkbox, MenuItem, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


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
  imageTile: {
    height: '100%',
    width: '100%'
  },
  gridList: {
    // width: '100%',
    // height: '100%',
    transform: 'translateZ(0)'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
    textAlign: 'center'
  }
});

class Home extends Component {

  constructor() {
    super();
    this.state = {
      movieName: '',
      genres: [],
      artists: []
    };
  }
  movieNameHandler = (e) => {
    this.setState({ movieName: e.target.value });
  }
  genreChangeHandler = (e) => {
    this.setState({ genres: e.target.value });
  }
  artistChangeHandler = (e) => {
    this.setState({ artists: e.target.value });
  }
  detailsClickHandler(movieId) {
    this.props.history.push('/movie/' + movieId);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="main-container">
       
        <Header />
        
        <div className={classes.upcomingMoviesHeading}>
          <span>Upcoming Movies</span>
        </div>
        <GridList cols={5}  cellHeight={'auto'} className={classes.gridListUpcomingMovies}>
          {
            moviesData.map(movie => (
              <GridListTile key={movie.id} cellHeight={'auto'}>
                <img src={movie.poster_url} alt={movie.title} className={classes.imageTile} />
                <GridListTileBar title={movie.title}></GridListTileBar>
              </GridListTile>
            ))
          }
        </GridList>       
        
        <div className="flex-container">
          <div className="released-movies">
            <GridList cols={3} spacing={20} className={classes.gridList}>
              {moviesData.map(movie => (
                <GridListTile onClick={() => this.detailsClickHandler(movie.id)} key={"grid"+ movie.id} style={{ height:'100%', cursor: 'pointer'}}>
                  <img src={movie.poster_url} alt={movie.title} className={classes.imageTile} />
                  <GridListTileBar title={movie.title} subtitle={<span>Release Date: {moment(movie.release_date).format("ddd MMM DD YYYY")}</span>}></GridListTileBar>
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="filters">
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.title}>FIND MOVIES BY:</Typography>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input id="movieName" onChange={this.movieNameHandler} />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="genre-multi-select">Genre</InputLabel>
                  <Select
                    multiple={true}
                    input={<Input id="genre-multi-select" />}
                    renderValue={selected => selected.join(',')}
                    value={this.state.genres}
                    onChange={this.genreChangeHandler}>
                    <MenuItem value="0">None</MenuItem>
                    {genres.map(genre => (
                      <MenuItem key={genre.id} value={genre.name}>
                        <Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
                        <ListItemText primary={genre.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="artist-multi-select">Artists</InputLabel>
                  <Select
                    multiple
                    input={<Input id="artist-multi-select" />}
                    value={this.state.artists}
                    renderValue={selected => selected.join(',')}
                    onChange={this.artistChangeHandler}>
                    <MenuItem value="0">None</MenuItem>
                    {artists.map(artist => (
                      <MenuItem key={artist.id} value={artist.first_name + " ".concat(artist.last_name)}>
                        <Checkbox checked={this.state.artists.indexOf(artist.first_name + " ".concat(artist.last_name)) > -1} />
                        <ListItemText primary={artist.first_name + " ".concat(artist.last_name)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <TextField
                    id="Release-date-start"
                    label="Release Date Start"
                    type="date"
                    defaultValue=''
                    InputLabelProps={{ shrink: true }}>
                  </TextField>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <TextField
                    id="Release-date-end"
                    label="Release Date End"
                    type="date"
                    defaultValue=''
                    InputLabelProps={{ shrink: true }}>
                  </TextField>
                </FormControl><br /><br />

                <FormControl className={classes.formControl}>
                  <Button variant="contained" color="primary">APPLY</Button>
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