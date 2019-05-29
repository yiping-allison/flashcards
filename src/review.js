'use strict';

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

var CreateReviewMain = function (_React$Component) {
	_inherits(CreateReviewMain, _React$Component);

	function CreateReviewMain(props) {
		_classCallCheck(this, CreateReviewMain);

		var _this = _possibleConstructorReturn(this, (CreateReviewMain.__proto__ || Object.getPrototypeOf(CreateReviewMain)).call(this, props));

		_this.state = {
			error: null,
			user: ""
		};
		_this.getUser = _this.getUser.bind(_this);
		_this.getUser();
		return _this;
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
				React.createElement(CardMain, null),
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
			var _this2 = this;

			var url = "username?user=name";
			fetch(url).then(function (res) {
				return res.json();
			}).then(function (result) {
				_this2.setState({
					user: result.user
				});
			}, function (error) {
				_this2.setState({
					error: error
				});
			});
		} // END : Gets Username Handler

	}]);

	return CreateReviewMain;
}(React.Component);

ReactDOM.render(React.createElement(CreateReviewMain, null), document.getElementById('root'));