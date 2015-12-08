var React = require('react');

var About = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h1>About</h1>
						<p>This is the about page</p>
					</div>
				</div>	
			</div>
		);
	}

});

module.exports = About;