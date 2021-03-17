import React, { Component } from 'react';
import './App.css';
import MovieRow from './components/MovieRow.js';
import TitleBar from './components/TitleBar.js';
import SearchBar from './components/SearchBar.js';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:'',
      pageCount: 0,
      hasResults: true,
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
    this.performSearch("");
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  performSearch() {
    const searchTerm = this.state.searchTerm
    if (searchTerm === "") {
      this.setState({
        hasResults: false,
        offset: 0,
        currentPage: 0,
        perPage: 5,
      }) 
    } else {

    const API_KEY = "a45060455da3e16ead4c6661b8eeef03";
    
    const urlString = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=` + searchTerm + `&page=${this.state.currentPage + 1}`;
   
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log(searchResults)
        var results = searchResults.results
         
        results = results.filter(Boolean)

        const slice = results.slice(this.state.offset, this.state.offset + this.state.perPage)
        
        var movieRows = []
  
        const postData = slice.forEach((movie) => {
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

          postData
          })
      }, 
      error: (xhr, status, err) => {
        console.error("data fetch failed")
    
      }
    })
   
  }
  }

  handleSearchChange(event) {
    const boundObject = this
    const searchTermValue = event.target.value
    this.setState({
      searchTerm: searchTermValue,
      offset: 0,
      currentPage: 0,
    })
    console.log(this.state)
    boundObject.performSearch()
    console.log(this.state)
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
      })
      this.performSearch()
}

  render() {
    return (
      <div className='App'>
        <TitleBar className='title-bar'/>
        <SearchBar 
          handleSearchChange={this.handleSearchChange}
          className='search-bar'/>
        {this.state.rows}
            {this.state.hasResults ? null : (
            <h4 className="errorMessage">Great Scott!! No results found. Try again :)</h4>
            )}
            {/* if there are results, do nothing else show error message*/}
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
