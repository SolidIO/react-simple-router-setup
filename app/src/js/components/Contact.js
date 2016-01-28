var React 	= require('react');
var Router 	= require('react-router');

var Contact = React.createClass({
	mixins: [Router.History],

	_redirectTo: function () {
		this.history.pushState(null, '/home');
	},

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h1>Contact</h1>
						<p>This is the contact page</p>
						<p>Redirect inside components: <a onClick={this._redirectTo}>Back to home</a></p>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Contact;
