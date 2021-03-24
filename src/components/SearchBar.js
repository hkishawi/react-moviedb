import React from 'react';


class SearchBar extends React.Component {
    render () {
        return (
            <input 
            className="searchBar input-field col s12" 
            placeholder="so it begins..." 
            onChange={this.props.handleSearchChange} 
           
            />
            
        )
    }
}

export default SearchBar