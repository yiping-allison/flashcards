'use strict';

function TitleText(props) {
	return <div className = "titleDiv">
		{ props.children }
		</div>;
}  // DIV : Title

function Login(props) {
	return <div className = "login">
		{ props.children }
		</div>;
}  // DIV : Login

class CreateLoginMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		}
		this.logIn = this.logIn.bind(this);
	}

	render() {
		const { error } = this.state;
		if (error) {
			return <div> Error: {error.message} </div>;
		}  // error checking
		
		return (
		<main>
			<TitleText>
				<p id="mainTitle"> Welcome to Lango! </p>
				<p id="subText"> Customize your vocabulary </p>
			</TitleText>

			<Login>
				<a href="auth/google" id="googleLink" onClick={this.logIn}> Log in with Google </a>
			</Login>
		</main>
		);
	}

	logIn() {
		let url = 'auth/google';
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onload = function () { console.log('logged in!'); };
		xhr.onerror = function () { console.log('browser sees error'); };
		xhr.send();
	}  // END : Log In Handler
}  // END : CreateLoginMain class

ReactDOM.render(
	<CreateLoginMain />,
	document.getElementById('root')
);
