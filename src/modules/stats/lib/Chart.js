"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } })()

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3, _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function } } else if ("value" in desc) { return desc.value } else { var getter = desc.get; if (getter === undefined) { return undefined } return getter.call(receiver) } } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function") } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { configurable: true, enumerable: false, value: subClass, writable: true, } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var _react = require("react")

var _react2 = _interopRequireDefault(_react)

var _reactDom = require("react-dom")

var _BubbleChart = require("./BubbleChart")

var _BubbleChart2 = _interopRequireDefault(_BubbleChart)

var _BarChart = require("./BarChart")

var _BarChart2 = _interopRequireDefault(_BarChart)

var _PieChart = require("./PieChart")

var _PieChart2 = _interopRequireDefault(_PieChart)

var Chart = (function (_React$Component) {
    _inherits(Chart, _React$Component)

    function Chart(props) {
        _classCallCheck(this, Chart)

        _get(Object.getPrototypeOf(Chart.prototype), "constructor", this).call(this, props)

        this.chartToClassMappings = {
            bar: _BarChart2["default"],
            bubble: _BubbleChart2["default"],
            pie: _PieChart2["default"]
        }
    }

    _createClass(Chart, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (Object.keys(this.props.data).length === 0) {
                return
            }

            var el = (0, _reactDom.findDOMNode)(this)

            if (this.props.type === "custom") {
                this.chart = new this.props.customChart(el, this.props)
            } else {
                this.chart = new this.chartToClassMappings[this.props.type](el, this.props)
            }

            this.chart.create(this.props.data)
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.chart.update(this.props.data)
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.chart.unmount()
        }
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement("div", { className: "chart" })
        }
    }])

    return Chart
})(_react2["default"].Component)

exports["default"] = Chart
module.exports = exports["default"]