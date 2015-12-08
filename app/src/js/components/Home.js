var React = require('react');

var Home = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h1>Welcome</h1>
						<p>This is the home page</p>
					</div>
				</div>	
			</div>
		);
	}

});

module.exports = Home;