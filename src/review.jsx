'use strict';

function Header(props) {
	return <div className = "header">
		{ props.children }
		</div>;
}  // DIV :  Header

function CardMain(props) {
	return <div className = "cardMainDiv">
		{ props.children }
		</div>;
}  // DIV : Card Main

function Txt(props) {
	if (props.phrase == undefined) {
		return <p>Text missing</p>;
	} else { 
		return <p> {props.phrase}</p>;
	}
} // creates text class item

function Next(props) {
	return <div className = "next">
		{ props.children }
		</div>;
}  // DIV : Next

function Footer(props) {
	return <div className = "footer">
		{ props.children }
		</div>;
}  // DIV : Footer

class CreateReviewMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			user: ""
		}
		this.getUser = this.getUser.bind(this);
		this.getUser();
	}

	render() {
		const { error } = this.state;
		if (error) {
			return <div> Error: {error.message} </div>;
		}  // error checking
		
		return (
		<main>
			<Header>
				<p id="title"> Lango! </p>
				<a href="lango.html" id="addCard"> Add </a>
			</Header>
			<CardMain>

			</CardMain>
			<Next>
				<button id="nextBttn" onClick={this.nextCard}>Next</button>
			</Next>
			<Footer>
				<Txt phrase={this.state.user}  />
			</Footer>
		</main>
		);
	}

	getUser() {
		let url = "username?user=name";
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState( {
						user: result.user
					});
				},
				(error) => {
					this.setState( {
						error
					});
				}
			)
	}  // END : Gets Username Handler
}

ReactDOM.render(
	<CreateReviewMain />,
	document.getElementById('root')
);
