import React from 'react'
import './App.css'



class MovieHeader extends React.Component<movieProps> {
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
                        <h3 id="title"><b>Relias Media Center®</b></h3>
                    </td>
                    </tr>
                </tbody>
            </table>

            <input className="searchBar input-field col s12" placeholder="so it begins..." onChange={this.searchChangeHandler.bind(this)} />

            {this.state.rows}
      </div>
        )

    }
}

export default MovieHeader