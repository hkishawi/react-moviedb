import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasResults: true,
    };
    this.performSearch("");
  
  }

  performSearch(searchTerm) {

    // console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=a45060455da3e16ead4c6661b8eeef03&query=" + searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        // console.log('successful data fetch')
        // console.log(searchResults)
        console.log(searchResults)
        // searchResults is a dictionary that contains the results of comm w api 
        var results = searchResults.results
        // results here is a list of objects acquired from the search results(api call)
        // array.filter(Boolean) filters out all instances of "falsy" values like Null, undefined, "" (empty string); sometimes it seems like we get a list of empty or null values which was causing the error.
        results = results.filter(Boolean)

        var movieRows = []
        //array to store movie data

        results.forEach((movie) => {
          movie.poster_src =  "https://image.tmdb.org/t/p/w185/" + movie.poster_path
          // console.log(movie.post_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow) 
        })
        // if any rows exist, then don't display the "no results" message
        this.setState({hasResults: movieRows.length})
        this.setState({rows: movieRows})
      }, 
      error: (xhr, status, err) => {
        console.error("data fetch failed")
        // display the "no results" message; this also does not check for value to movie data. This merely functions to indicate error in comm w api
      }
    })
  }

  searchChangeHandler(event) {
    // console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
      return (
        boundObject.performSearch(searchTerm)
      )
  }

  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" className="logoImage" src="RMC_logo_1.jpg" />
              </td>
              <td className="titleContainer">
                <h3 id="title"><b>React Media Center®</b></h3>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
              <input className="searchBar input-field col s12" placeholder="so it begins..." onChange={this.searchChangeHandler.bind(this)} />
              {this.state.rows}

             {this.state.hasResults ? null : (
             <h4 className="errorMessage">Great Scott!! No results found. Try again :)</h4>
             )}
             {/* if there are results, do nothing else show error message*/}
        </div>
      </div>
    );
    
}
}

export default App;
