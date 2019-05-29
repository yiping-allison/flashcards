'use strict';

/*
	Flipcard component is based on flipcard component by
	Alex Devero at:
		https://reactjsexample.com/react-flipping-card-with-tutorial/
	Modified by Nina Amenta for ECS 162, May 2019
*/

//const cardContainer = document.querySelector('.react-card');

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

var CardInput = function (_React$Component) {
	_inherits(CardInput, _React$Component);

	function CardInput() {
		_classCallCheck(this, CardInput);

		return _possibleConstructorReturn(this, (CardInput.__proto__ || Object.getPrototypeOf(CardInput)).apply(this, arguments));
	}

	_createClass(CardInput, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"fieldset",
				null,
				React.createElement("input", { name: this.props.name, id: this.props.id, type: this.props.type || 'text',
					placeholder: this.props.placeholder, required: true })
			);
		}
	}]);

	return CardInput;
}(React.Component); // React Component for form inputs

var CardTextarea = function (_React$Component2) {
	_inherits(CardTextarea, _React$Component2);

	function CardTextarea() {
		_classCallCheck(this, CardTextarea);

		return _possibleConstructorReturn(this, (CardTextarea.__proto__ || Object.getPrototypeOf(CardTextarea)).apply(this, arguments));
	}

	_createClass(CardTextarea, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"fieldset",
				null,
				React.createElement("textarea", { name: this.props.name, id: this.props.id, placeholder: this.props.placeholder, required: true })
			);
		}
	}]);

	return CardTextarea;
}(React.Component); // React component for textarea

var CardFront = function (_React$Component3) {
	_inherits(CardFront, _React$Component3);

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

var CardBack = function (_React$Component4) {
	_inherits(CardBack, _React$Component4);

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

var Card = function (_React$Component5) {
	_inherits(Card, _React$Component5);

	function Card(props) {
		_classCallCheck(this, Card);

		var _this5 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this5.state = {
			error: null,
			word: ""
		};
		_this5.getWord = _this5.getWord.bind(_this5);
		_this5.getWord();
		return _this5;
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
					React.createElement(CardBack, { text: "Correct!" }),
					React.createElement(CardFront, { text: this.state.word })
				)
			);
		}
	}, {
		key: "getWord",
		value: function getWord() {
			var _this6 = this;

			var url = "randomword?word=newWord";
			fetch(url).then(function (res) {
				return res.json();
			}).then(function (result) {
				_this6.setState({
					word: result.wd
				});
			}, function (error) {
				_this6.setState({
					error: error
				});
			});
		} // gets a word from user's database

	}]);

	return Card;
}(React.Component); // React component for the card

var CreateReviewMain = function (_React$Component6) {
	_inherits(CreateReviewMain, _React$Component6);

	function CreateReviewMain(props) {
		_classCallCheck(this, CreateReviewMain);

		var _this7 = _possibleConstructorReturn(this, (CreateReviewMain.__proto__ || Object.getPrototypeOf(CreateReviewMain)).call(this, props));

		_this7.state = {
			error: null,
			user: ""
		};
		_this7.getUser = _this7.getUser.bind(_this7);
		_this7.getUser();
		return _this7;
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
				React.createElement(Card, null),
				React.createElement(CardInput, null),
				React.createElement(
					Next,
					null,
					React.createElement(
						"button",
						{ id: "nextBttn", onClick: this.nextCard },
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
			var _this8 = this;

			var url = "username?user=name";
			fetch(url).then(function (res) {
				return res.json();
			}).then(function (result) {
				_this8.setState({
					user: result.user
				});
			}, function (error) {
				_this8.setState({
					error: error
				});
			});
		} // END : Gets Username Handler

	}]);

	return CreateReviewMain;
}(React.Component);

ReactDOM.render(React.createElement(CreateReviewMain, null), document.getElementById('root'));