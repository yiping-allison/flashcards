'use strict';

/*
	Flipcard component is based on flipcard component by
	Alex Devero at:
		https://reactjsexample.com/react-flipping-card-with-tutorial/
	Modified by Nina Amenta for ECS 162, May 2019
*/

//const cardContainer = document.querySelector('.react-card');

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

class CardInput extends React.Component {
	render() {
		return(
			<fieldset>
				<input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} 
				placeholder={this.props.placeholder} required />
			</fieldset>
		)
	}
}  // React Component for form inputs

class CardTextarea extends React.Component {
	render() {
		return(
			<fieldset>
				<textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required>
				</textarea>
			</fieldset>
		)
	}
}  // React component for textarea

class CardFront extends React.Component {
	render() {
		return(
			<div className='card-side side-front'>
				<div className='card-side-container'>
					<h2 id='trans'>{this.props.text}</h2>
				</div>
			</div>
		)
	}
}  // React Component for front side of the card

class CardBack extends React.Component {
	render() {
		return(
			<div className='card-side side-back'>
				<div className='card-side-container'>
					<h2 id='congrats'>{this.props.text}</h2>
				</div>
			</div>
		)
	}
}  // React Component for back side of the card

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			word: ""
		}
		this.getWord = this.getWord.bind(this);
		this.getWord();
	}

	render() {
		return(
			<div className='card-container'>
				<div className='card-body'>
					<CardBack text="Correct!" />

					<CardFront text={this.state.word} />
				</div>
			</div>
		)
	}

	getWord() {
		let url = "randomword?word=newWord";
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState( {
						word: result.wd
					});
				},
				(error) => {
					this.setState( {
						error
					});
				}
			)
	}  // gets a word from user's database

}  // React component for the card

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
			<Card />
			<CardInput />
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
