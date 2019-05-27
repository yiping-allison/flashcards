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
				<button id="loginBttn"> Log in with Google </button>
			</Login>
		</main>
		);
	}
}  // END : CreateLoginMain class

ReactDOM.render(
	<CreateLoginMain />,
	document.getElementById('root')
);
