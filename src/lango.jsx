'use strict';

function Card(props) {
	return <div className = "textCard">
			{ props.children }
		</div>;
}

function Txt(props) {
	if (props.phrase == undefined) {
		return <p>Text missing</p>;
	} else 
		return <p> {props.phrase}</p>;
	}

class CreateCardMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			korean: "",
			error: null
		}
		this.checkReturn = this.checkReturn.bind(this);
	}

	render() {
		const { word, error } = this.state;
		if (error) {
			return <div> Error: {error.message}</div>;
		} 
		return (
		<main>
		<Card>
			<textarea id="inputEng" onKeyPress={this.checkReturn} />
		</Card>
		<Card>
			<Txt phrase={this.state.korean} />
		</Card>
		</main>
		);
	} // end of render function

	checkReturn(event) {
		if (event.charCode == 13) {
			let newPhrase = document.getElementById("inputEng").value;
			let url = "translate?english=" + newPhrase;
			// TODO: insert english phrase to Translate API
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
	}
} // end class

ReactDOM.render(
	<CreateCardMain />,
	document.getElementById('root')
);
