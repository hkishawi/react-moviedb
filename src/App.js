import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
// import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasResults: true,
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
    this.performSearch("");
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  

  performSearch(searchTerm) {
    // if search term is blank, don't perform get request; else perform get request
    
    if (searchTerm === "") {
      this.setState({
        hasResults: false,
        offset: 0,
        currentPage: 0,
        perPage: 0,
      }) 
    } else {

    const API_KEY = "a45060455da3e16ead4c6661b8eeef03";

    const urlString = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&&page=1&query=` + searchTerm;
    
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        
        var results = searchResults.results
    
        results = results.filter(Boolean)

        const slice = results.slice(this.state.offset, this.state.offset + this.state.perPage)

        var movieRows = []
  
        slice.forEach((movie) => {
          const posterPath = movie.poster_path

          if (posterPath == null) {
            movie.poster_src = ""
            const movieRow = 
            <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow) 
          } else {
            movie.poster_src =  `https://image.tmdb.org/t/p/w185/${posterPath}`
            const movieRow = 
              <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow) 
        }
        })
        
        this.setState({
          hasResults: movieRows.length,
          rows: movieRows,
          pageCount: Math.ceil(results.length / this.state.perPage),

          movieRows
          })
      }, 
      error: (xhr, status, err) => {
        console.error("data fetch failed")
    
      }
    })
    console.log(this.state)
  }
  }

  handleSearchChange(event) {
    const boundObject = this
    const searchTerm = event.target.value
    
    boundObject.performSearch(searchTerm)
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.performSearch()
    })
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
              <input className="searchBar input-field col s12" placeholder="so it begins..." onChange={this.handleSearchChange.bind(this)} />
              {this.state.rows}
            
             {this.state.hasResults ? null : (
             <h4 className="errorMessage">Great Scott!! No results found. Try again :)</h4>
             )}
             {/* if there are results, do nothing else show error message*/}
        </div>
        <div>
                {this.state.hasResults}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        </div>
      </div>
    );
    
}
}

export default App;
