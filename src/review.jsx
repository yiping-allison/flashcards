'use strict';

/*
	Flipcard component is based on flipcard component by
	Alex Devero at:
		https://reactjsexample.com/react-flipping-card-with-tutorial/
	Modified by Nina Amenta for ECS 162, May 2019
*/

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

class CardFront extends React.Component {
	render() {
		return(
			<div className='card-side side-front'>
				<div className='card-side-container'>
					<div>
						{this.props.bttn}
					</div>
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
					<div>
						{this.props.bttn}
					</div>
					<h2 id='congrats'>{this.props.text}</h2>
				</div>
			</div>
		)
	}
}  // React Component for back side of the card

class Card extends React.Component {
	render() {
		return(
			<div className='card-container'>
				<div className='card-body'>
					<CardBack text={ this.props.ans } bttn={this.props.flipBttn} />

					<CardFront text={this.props.word} bttn={this.props.flipBttn} />
				</div>
			</div>
		)
	}
}  // React component for the card

class CreateReviewMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			user: "",
			kor: "",
			eng: "",
			userAnswered: false
		}
		this.getUser = this.getUser.bind(this);
		this.getWord = this.getWord.bind(this);
		this.checkReturn = this.checkReturn.bind(this);
		this.flipClick = this.flipClick.bind(this);
		this.getUser();
		this.getWord();
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
			<Card word={this.state.kor} ans={this.state.eng} flipBttn={<button id="flipButton" onClick={this.flipClick} />} />
			<div id="inputArea">
				<textarea id="userInput" placeholder="Enter your translation here!" onKeyPress={this.checkReturn} />
			</div>
			<Next>
				<button id="nextBttn" onClick={this.getWord}>Next</button>
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
	
	getWord() {
		let url = "randomword?word=newWord";
		if (this.state.userAnswered) {
			// user answered before - reset states
			if (document.querySelector(".card-body").classList.contains("flip")) {
				document.querySelector(".card-body").classList.toggle("flip");
			}
			this.state.userAnswered = false;
			if (document.querySelector(".card-side-container").classList.contains("correct")) {
				// remove
				document.querySelector(".card-side-container").classList.remove("correct");
			}	
		}
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState( {
						kor: result.korWd,
						eng: result.engWd
					});
				},
				(error) => {
					this.setState( {
						error
					});
				}
			)				
	}  // END : gets a word from user's database

	checkReturn() {
		if (event.charCode == 13) {
			let userAns = document.getElementById('userInput').value.trim();
			if (userAns === this.state.eng) {
				// user is correct! update state
				document.querySelector(".card-side-container").classList.add("correct");
				this.setState({ eng: "Correct!" });
				if (!this.state.userAnswered) {
					let url = "updateCorrect?cor="+userAns;
					fetch(url);
					document.querySelector(".card-body").classList.toggle("flip");
					this.setState({ userAnswered: true });
				}
			} else {
				if (!this.state.userAnswered) {
					this.setState({ userAnswered: true });
					document.querySelector(".card-body").classList.toggle("flip");
				}
			}
			document.querySelector(".card-body").classList.toggle("flip");
		}
	}  // END : Return key check

	flipClick() {
		let userAns = document.getElementById('userInput').value.trim();
		if (userAns === this.state.eng) {
			// user is correct! update state
			document.querySelector(".card-side-container").classList.add("correct");
			this.setState({ eng: "Correct!" });
			if (!this.state.userAnswered) {
				let url = "updateCorrect?cor="+userAns;
				fetch(url);
				document.querySelector(".card-body").classList.toggle("flip");
				this.setState({ userAnswered: true });
			}
		} else {
			if (!this.state.userAnswered) {
				this.setState({ userAnswered: true });
				document.querySelector(".card-body").classList.toggle("flip");
			}
		}
		document.querySelector(".card-body").classList.toggle("flip");
	}  // END : Flip by Click
}

ReactDOM.render(
	<CreateReviewMain />,
	document.getElementById('root')
);
