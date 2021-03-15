import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasResults: true,
    };
    this.performSearch("");
    
  }

  

  performSearch(searchTerm) {

    const API_KEY = "a45060455da3e16ead4c6661b8eeef03";

    const urlString = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=` + searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        
        
        var results = searchResults.results
        
        results = results.filter(Boolean)

        var movieRows = []
  

        results.forEach((movie) => {
          movie.poster_src =  "https://image.tmdb.org/t/p/w185/" + movie.poster_path
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow) 
        })
        
        this.setState({hasResults: movieRows.length})
        this.setState({rows: movieRows})
      }, 
      error: (xhr, status, err) => {
        console.error("data fetch failed")
    
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
      <div className='App'>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <h3 className='logo'>🍿</h3>
              </td>
              <td className="titleContainer">
                <h3 id="site-name"><b>React Media Center®</b></h3>
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
