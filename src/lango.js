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
}

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
					Card,
					null,
					React.createElement("textarea", { id: "inputEng", onKeyPress: this.checkReturn })
				),
				React.createElement(
					Card,
					null,
					React.createElement(Txt, { phrase: this.state.korean })
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
				// TODO: insert english phrase to Translate API
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
	}]);

	return CreateCardMain;
}(React.Component); // end class

ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));