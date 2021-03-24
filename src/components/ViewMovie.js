import React from 'react'
import { Redirect, Route, Switch } from "react-router";

class viewMovie extends React.Component {
    viewMovie() {
     
        const movieId = this.props.movie.id

        const url = `https://www.themoviedb.org/movie/${movieId}`
        window.location.href = url
    }

 
    render() {
        return (
        <table className='movieContainer' key={this.props.movie.id}>
            <tbody>
            <tr>
                <td>
                    <img className='logoImg' alt="poster" src={this.props.movie.poster_src}/>
                </td>

                <td className='movieInfo'>
                    <h4 className='movie-title'>{this.props.movie.title}</h4>
                    <p className="info-text"><b>Summary: </b>{this.props.movie.overview}</p>
                <Switch>    
                    <Route exact path={this.viewMovie.bind(this)}>
                    <input className='waves-effect waves-light btn-small' type="button" value="Learn more" onClick={this.viewMovie.bind(this)} />
                    </Route>
                </Switch>
                </td>
            </tr>
            </tbody>
      </table>
    )}
}

export default viewMovie