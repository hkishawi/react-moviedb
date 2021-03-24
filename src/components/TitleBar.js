import React from 'react';
import About from './About';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';



class TitleBar extends React.Component {
    render(){
        return (
            <table className="titleBar">
                <tbody>
                    <tr>
                    <td>
                        <span role='img' aria-label="&#127871" className='logo'>🍿</span>
                    </td>
                    <td className="titleContainer">
                        <h3 id="site-name"><b>React Media Center®</b></h3>
                    </td>
                    </tr>
                    {/* <div>
                        <Router>
                            <div className="nav-links">
                                <nav>
                                    <ul>
                                        <li>
                                        <Link to='/'>Home</Link>
                                        </li>
                                        <li>
                                        <Link to='/about'>About</Link>
                                        </li>
                                    </ul>
                                    
                                   
                                </nav>
                            <Switch>
                                <Route path='/about' component={About} />
                                <Route path='/' component='' />
                            </Switch>
                            </div>
                        </Router>
                    </div> */}
                </tbody>
            </table>
        )
    }
    
}

export default TitleBar