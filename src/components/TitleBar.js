import React from 'react';


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
                </tbody>
            </table>
        )
    }
    
}

export default TitleBar