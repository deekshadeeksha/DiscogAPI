import React from 'react';
import MainPage from './MainPage'
import Discog from './Discogs'
import {BrowserRouter as Router,Route,NavLink,Switch} from 'react-router-dom'
import Playlist from './Playlist';

class Header extends React.Component {

    
    render() {
        return (//router and switch used for navigation,route sets path and NavLink gives a link to that path
            <>
            <Router>
                <div id="header">
                    <nav id="header-nav">
                        <ul id="navigation">
                            <li className="nav-li"><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                            <li className="nav-li"><NavLink exact activeClassName="active" to="/discog">Explore</NavLink></li>
                            <li className="nav-li"><NavLink exact activeClassName="active" to="/playlist">Playlist</NavLink></li>
                            <li className="nav-li"><img src="image/nutrition.png" alt="" width="50px" height="50px" /></li>
                        </ul>
                    </nav>
                </div>
            
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/discog" component={Discog}/>
                    <Route exact path="/playlist" component={Playlist}/>
                </Switch>
            </Router>            
            </>
        )
    }
}

export default Header;