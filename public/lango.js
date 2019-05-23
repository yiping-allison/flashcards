'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Card(props) {
	return React.createElement(
		"div",
		{ className: "textCard" },
		props.children
	);
} // creates Card class item

function Txt(props) {
	if (props.phrase == undefined) {
		return React.createElement(
			"p",
			null,
			"Text missing"
		);
	} else return React.createElement(
		"p",
		null,
		" ",
		props.phrase
	);
} // creates text class item

function Save(props) {
	return React.createElement(
		"div",
		{ className: "saveCard" },
		props.children
	);
} // creates a save class item

function Header(props) {
	return React.createElement(
		"div",
		{ className: "headerDiv" },
		props.children
	);
}

function CardMain(props) {
	return React.createElement(
		"div",
		{ className: "cardMainDiv" },
		props.children
	);
}

function Footer(props) {
	return React.createElement(
		"div",
		{ className: "footer" },
		props.children
	);
}

var CreateCardMain = function (_React$Component) {
	_inherits(CreateCardMain, _React$Component);

	function CreateCardMain(props) {
		_classCallCheck(this, CreateCardMain);

		var _this = _possibleConstructorReturn(this, (CreateCardMain.__proto__ || Object.getPrototypeOf(CreateCardMain)).call(this, props));

		_this.state = {
			korean: "",
			error: null
		};
		_this.checkReturn = _this.checkReturn.bind(_this);
		_this.saveCard = _this.saveCard.bind(_this);
		return _this;
	}

	_createClass(CreateCardMain, [{
		key: "render",
		value: function render() {
			var _state = this.state,
			    word = _state.word,
			    error = _state.error;

			if (error) {
				return React.createElement(
					"div",
					null,
					" Error: ",
					error.message
				);
			}
			return React.createElement(
				"main",
				null,
				React.createElement(
					"head",
					null,
					React.createElement("link", { rel: "stylesheet", type: "text/css", href: "reset.css" }),
					React.createElement("link", { rel: "stylesheet", type: "text/css", href: "lango.css" }),
					React.createElement("meta", { charset: "UTF-8" }),
					React.createElement("meta", { name: "viewport", content: "width=device-width" }),
					React.createElement(
						"title",
						null,
						"Lango"
					)
				),
				React.createElement(
					Header,
					null,
					React.createElement(
						"p",
						{ id: "title" },
						" Lango! "
					),
					React.createElement(
						"button",
						{ id: "startReview" },
						" Start Review "
					)
				),
				React.createElement(
					CardMain,
					null,
					React.createElement(
						Card,
						null,
						React.createElement(
							"div",
							{ id: "inputBox" },
							React.createElement("textarea", { id: "inputEng", placeholder: "English", onKeyPress: this.checkReturn })
						)
					),
					React.createElement(
						Card,
						null,
						React.createElement(
							"div",
							{ id: "translateBox", placeholder: "Translation" },
							React.createElement("textarea", { id: "translationBox", placeholder: "Translation", value: this.state.korean }),
							"//",
							React.createElement(Txt, { phrase: this.state.korean })
						)
					)
				),
				React.createElement(
					Save,
					null,
					React.createElement(
						"button",
						{ id: "saveBttn", onClick: this.saveCard },
						"Save"
					)
				),
				React.createElement(
					Footer,
					null,
					React.createElement(Txt, { phrase: "UserName" })
				)
			);
		} // end of render function

	}, {
		key: "checkReturn",
		value: function checkReturn(event) {
			var _this2 = this;

			if (event.charCode == 13) {
				var newPhrase = document.getElementById("inputEng").value;
				var url = "translate?english=" + newPhrase;
				fetch(url).then(function (res) {
					return res.json();
				}).then(function (result) {
					_this2.setState({
						korean: result.Korean
					});
				}, function (error) {
					_this2.setState({
						error: error
					});
				});
			}
		}
	}, {
		key: "saveCard",
		value: function saveCard() {
			var _this3 = this;

			var translatedWord = this.state.korean;
			var eng = document.getElementById("inputEng").value;
			var url = "store?english=" + eng + "&korean=" + translatedWord;
			fetch(url).then(function (error) {
				_this3.setState({
					error: error
				});
			});
		}
	}]);

	return CreateCardMain;
}(React.Component); // end class

ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));