'use strict';

/*
	Flipcard component is based on flipcard component by
	Alex Devero at:
		https://reactjsexample.com/react-flipping-card-with-tutorial/
	Modified by Nina Amenta for ECS 162, May 2019
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Header(props) {
	return React.createElement(
		"div",
		{ className: "header" },
		props.children
	);
} // DIV :  Header

function CardMain(props) {
	return React.createElement(
		"div",
		{ className: "cardMainDiv" },
		props.children
	);
} // DIV : Card Main

function Txt(props) {
	if (props.phrase == undefined) {
		return React.createElement(
			"p",
			null,
			"Text missing"
		);
	} else {
		return React.createElement(
			"p",
			null,
			" ",
			props.phrase
		);
	}
} // creates text class item

function Next(props) {
	return React.createElement(
		"div",
		{ className: "next" },
		props.children
	);
} // DIV : Next

function Footer(props) {
	return React.createElement(
		"div",
		{ className: "footer" },
		props.children
	);
} // DIV : Footer

var CardFront = function (_React$Component) {
	_inherits(CardFront, _React$Component);

	function CardFront() {
		_classCallCheck(this, CardFront);

		return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
	}

	_createClass(CardFront, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "card-side side-front" },
				React.createElement(
					"div",
					{ className: "card-side-container" },
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "flip.svg", className: "flipImg" }),
						this.props.bttn
					),
					React.createElement(
						"h2",
						{ id: "trans" },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardFront;
}(React.Component); // React Component for front side of the card

var CardBack = function (_React$Component2) {
	_inherits(CardBack, _React$Component2);

	function CardBack() {
		_classCallCheck(this, CardBack);

		return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
	}

	_createClass(CardBack, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "card-side side-back" },
				React.createElement(
					"div",
					{ className: "card-side-container" },
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "flip.svg", className: "flipImg" }),
						this.props.bttn
					),
					React.createElement(
						"h2",
						{ id: "congrats" },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardBack;
}(React.Component); // React Component for back side of the card

var Card = function (_React$Component3) {
	_inherits(Card, _React$Component3);

	function Card() {
		_classCallCheck(this, Card);

		return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	}

	_createClass(Card, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "card-container" },
				React.createElement(
					"div",
					{ className: "card-body" },
					React.createElement(CardBack, { text: this.props.ans, bttn: this.props.flipBttn }),
					React.createElement(CardFront, { text: this.props.word, bttn: this.props.flipBttn })
				)
			);
		}
	}]);

	return Card;
}(React.Component); // React component for the card

var CreateReviewMain = function (_React$Component4) {
	_inherits(CreateReviewMain, _React$Component4);

	function CreateReviewMain(props) {
		_classCallCheck(this, CreateReviewMain);

		var _this4 = _possibleConstructorReturn(this, (CreateReviewMain.__proto__ || Object.getPrototypeOf(CreateReviewMain)).call(this, props));

		_this4.state = {
			error: null,
			user: "",
			kor: "",
			eng: "",
			userAnswered: false
		};
		_this4.getUser = _this4.getUser.bind(_this4);
		_this4.getWord = _this4.getWord.bind(_this4);
		_this4.checkReturn = _this4.checkReturn.bind(_this4);
		_this4.flipClick = _this4.flipClick.bind(_this4);
		_this4.getUser();
		_this4.getWord();
		return _this4;
	}

	_createClass(CreateReviewMain, [{
		key: "render",
		value: function render() {
			var error = this.state.error;

			if (error) {
				return React.createElement(
					"div",
					null,
					" Error: ",
					error.message,
					" "
				);
			} // error checking

			return React.createElement(
				"main",
				null,
				React.createElement(
					Header,
					null,
					React.createElement(
						"p",
						{ id: "title" },
						" Lango! "
					),
					React.createElement(
						"a",
						{ href: "lango.html", id: "addCard" },
						" Add "
					)
				),
				React.createElement(Card, { word: this.state.kor, ans: this.state.eng, flipBttn: React.createElement(
						"button",
						{ id: "flipButton", onClick: this.flipClick },
						"Flip Button Here"
					) }),
				React.createElement(
					"div",
					{ id: "inputArea" },
					React.createElement("textarea", { id: "userInput", placeholder: "Enter your translation here!", onKeyPress: this.checkReturn })
				),
				React.createElement(
					Next,
					null,
					React.createElement(
						"button",
						{ id: "nextBttn", onClick: this.getWord },
						"Next"
					)
				),
				React.createElement(
					Footer,
					null,
					React.createElement(Txt, { phrase: this.state.user })
				)
			);
		}
	}, {
		key: "getUser",
		value: function getUser() {
			var _this5 = this;

			var url = "username?user=name";
			fetch(url).then(function (res) {
				return res.json();
			}).then(function (result) {
				_this5.setState({
					user: result.user
				});
			}, function (error) {
				_this5.setState({
					error: error
				});
			});
		} // END : Gets Username Handler

	}, {
		key: "getWord",
		value: function getWord() {
			var _this6 = this;

			var url = "randomword?word=newWord";
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
			fetch(url).then(function (res) {
				return res.json();
			}).then(function (result) {
				_this6.setState({
					kor: result.korWd,
					eng: result.engWd
				});
			}, function (error) {
				_this6.setState({
					error: error
				});
			});
		} // END : gets a word from user's database

	}, {
		key: "checkReturn",
		value: function checkReturn() {
			if (event.charCode == 13 && !this.state.userAnswered) {
				var userAns = document.getElementById('userInput').value.trim();
				if (userAns === this.state.eng) {
					// user is correct! update state
					document.querySelector(".card-side-container").classList.add("correct");
					this.setState({ eng: "Correct!" });
					if (!this.state.userAnswered) {
						var url = "updateCorrect?cor=" + userAns;
						fetch(url);
						document.querySelector(".card-body").classList.toggle("flip");
						this.setState({ userAnswered: true });
					}
				} else {
					this.setState({ userAnswered: true });
					document.querySelector(".card-body").classList.toggle("flip");
				}
			} else if (event.charCode == 13 && this.state.userAnswered) {
				document.querySelector(".card-body").classList.toggle("flip");
			}
		} // END : Return key check

	}, {
		key: "flipClick",
		value: function flipClick() {
			var userAns = document.getElementById('userInput').value.trim();
			if (userAns === this.state.eng && !this.state.userAnswered) {
				// user is correct! update state
				document.querySelector(".card-side-container").classList.add("correct");
				this.setState({ eng: "Correct!" });
				var url = "updateCorrect?cor=" + userAns;
				fetch(url);
				document.querySelector(".card-body").classList.toggle("flip");
				this.setState({ userAnswered: true });
			} else if (!this.state.userAnswered && userAns !== this.state.eng) {
				this.setState({ userAnswered: true });
				document.querySelector(".card-body").classList.toggle("flip");
			} else {
				document.querySelector(".card-body").classList.toggle("flip");
			}
		} // END : Flip by Click

	}]);

	return CreateReviewMain;
}(React.Component);

ReactDOM.render(React.createElement(CreateReviewMain, null), document.getElementById('root'));