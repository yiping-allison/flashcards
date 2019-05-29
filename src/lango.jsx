'use strict';

function Card(props) {
	return <div className = "textCard">
			{ props.children }
		</div>;
}  // creates Card class item

function Txt(props) {
	if (props.phrase == undefined) {
		return <p>Text missing</p>;
	} else 
		return <p> {props.phrase}</p>;
}  // creates text class item

function Save(props) {
	return <div className = "saveCard">
		{ props.children }
		</div>; 
}  // creates a save class item

function Header(props) {
	return <div className = "headerDiv">
		{ props.children }
		</div>;
}

function CardMain(props) {
	return <div className = "cardMainDiv">
		{ props.children }
		</div>;
}

function Footer(props) {
	return <div className = "footer">
		{ props.children }
		</div>;
}

class CreateCardMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			korean: "",
			error: null,
			user: ""
		}
		this.checkReturn = this.checkReturn.bind(this);
		this.saveCard = this.saveCard.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getUser();
	}

	render() {
		const { word, error } = this.state;
		if (error) {
			return <div> Error: {error.message}</div>;
		} 
		return (
		<main>
			<Header>
				<p id="title"> Lango! </p>
				<button id="startReview"> Start Review </button>
			</Header>
			<CardMain>
				<Card>
					<div id="inputBox">
						<textarea id="inputEng" placeholder="English"  onKeyPress={this.checkReturn} />
					</div>
				</Card>
				<Card>
					<div id="translateBox" placeholder="Translation">
						<textarea id="translationBox" placeholder="Translation" readOnly value={this.state.korean} />
					</div>
				</Card>
			</CardMain>
			<Save>
				<button id="saveBttn" onClick={this.saveCard}>Save</button>
			</Save>
			<Footer>
				<Txt phrase={ this.state.user } />
			</Footer>
		</main>
		);
	} // end of render function

	checkReturn(event) {
		if (event.charCode == 13) {
			let newPhrase = document.getElementById("inputEng").value;
			let url = "translate?english=" + newPhrase;
			fetch(url)
				.then(res => res.json())
				.then(
					(result) => {
						this.setState( {
							korean: result.Korean
						});
					},
					(error) => {
						this.setState( {
							error
						});
					}
				)
		}
	}  // END : Check Return Handler

	saveCard() {
		let translatedWord = this.state.korean;
		let eng = document.getElementById("inputEng").value;
		let url = "store?english=" + eng + "&korean=" + translatedWord;
		fetch(url)
			.then(
				(error) => {
					this.setState( {
						error
					});
				}
			)
	}  // END : Save Card Handler

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
	} // END : Gets Username Handler	

} // end class

ReactDOM.render(
	<CreateCardMain />,
	document.getElementById('root')
);
