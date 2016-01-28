var React 			= require('react');
var ReactDOM 		= require('react-dom');
var Router 			= require('react-router').Router;
var Route 			= require('react-router').Route;
var Link 			  = require('react-router').Link;
var IndexRoute 	= require('react-router').IndexRoute;
var Home			  = require('./components/Home');
var About			  = require('./components/About');
var Contact			= require('./components/Contact');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
            );
        }
    });

    // Render router with routes
    ReactDOM.render((
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />
                <Route path="about" component={About} />
                <Route path="contact" component={Contact} />
            </Route>
        </Router>
    ), document.getElementById('app'));
