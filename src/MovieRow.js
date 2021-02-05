import React from 'react'
import './App.css'



class MovieRow extends React.Component {
    viewMovie() {
        // console.log("trying to view movie")
        // console.log(this.props.movie.title)
        const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
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

                <div className='movieInfo'>
                    <td>
                        <h4>{this.props.movie.title}</h4>
                        <p className="flow=text"><b>Summary: </b>{this.props.movie.overview}</p>
                        <input className='waves-effect waves-light btn-small' type="button" value="Learn more" onClick={this.viewMovie.bind(this)} />
                    </td>
                </div>
            </tr>
            </tbody>
      </table>
    )}
}

export default MovieRow