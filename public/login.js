'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function TitleText(props) {
	return React.createElement(
		"div",
		{ className: "titleDiv" },
		props.children
	);
} // DIV : Title

function Login(props) {
	return React.createElement(
		"div",
		{ className: "login" },
		props.children
	);
} // DIV : Login

var CreateLoginMain = function (_React$Component) {
	_inherits(CreateLoginMain, _React$Component);

	function CreateLoginMain(props) {
		_classCallCheck(this, CreateLoginMain);

		var _this = _possibleConstructorReturn(this, (CreateLoginMain.__proto__ || Object.getPrototypeOf(CreateLoginMain)).call(this, props));

		_this.state = {
			error: null
		};
		return _this;
	}

	_createClass(CreateLoginMain, [{
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
					TitleText,
					null,
					React.createElement(
						"p",
						{ id: "mainTitle" },
						" Welcome to Lango! "
					),
					React.createElement(
						"p",
						{ id: "subText" },
						" Customize your vocabulary "
					)
				),
				React.createElement(
					Login,
					null,
					React.createElement(
						"button",
						{ id: "loginBttn" },
						" Log in with Google "
					)
				)
			);
		}
	}]);

	return CreateLoginMain;
}(React.Component); // END : CreateLoginMain class

ReactDOM.render(React.createElement(CreateLoginMain, null), document.getElementById('root'));