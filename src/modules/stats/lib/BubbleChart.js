"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } })()

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function } } else if ("value" in desc) { return desc.value } else { var getter = desc.get; if (getter === undefined) { return undefined } return getter.call(receiver) } } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj } }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key] } } newObj["default"] = obj; return newObj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function") } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { configurable: true, enumerable: false, value: subClass, writable: true, } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var _d3 = require("d3")

var d3 = _interopRequireWildcard(_d3)

var _BaseChart2 = require("./BaseChart")

var _BaseChart3 = _interopRequireDefault(_BaseChart2)

var BubbleChart = (function (_BaseChart) {
    _inherits(BubbleChart, _BaseChart)

    function BubbleChart() {
        _classCallCheck(this, BubbleChart)

        _get(Object.getPrototypeOf(BubbleChart.prototype), "constructor", this).apply(this, arguments)
    }

    _createClass(BubbleChart, [{
        key: "addText",
        value: function addText() {
            this.text = this.node.append("text").attr("dy", ".3em").attr("class", "bubble-text").style("text-anchor", "middle").style("pointer-events", "none").text(this.setText)
        }
    }, {
        key: "setText",
        value: function setText(node) {
            if (node.data.value > 15) {
                return node.data.name
            }
        }
    }, {
        key: "onMouseOver",
        value: function onMouseOver(node) {
            return this.tooltip.style("visibility", "visible").text(node.data.name + " (" + node.data.value + ")")
        }
    }, {
        key: "create",
        value: function create(data) {
            var _this = this

            this.bubble = d3.pack().size([this.props.diameter, this.props.diameter]).padding(1.5)

            this.root = d3.hierarchy(data).sum(function (nodeData) {
                return nodeData.value
            })

            this.svg = d3.select(this.el).append("svg").attr("width", this.props.diameter).attr("height", this.props.diameter).attr("class", "bubble")

            this.node = this.svg.selectAll(".node").data(this.bubble(this.root).children).enter().append("g").attr("class", "node").attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")"
            })

            this.node.append("circle").attr("r", function (node) {
                return node.r
            }).style("fill", function (node) {
                return _this.color(node.data.name)
            }).on("mouseover", this.onMouseOver.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("mouseout", this.onMouseOut.bind(this))

            d3.select(document.frameElement).style("height", this.props.diameter + " px")

            this.addText()

            if (this.showTooltips) {
                this.addTooltips()
            }
        }
    }, {
        key: "update",
        value: function update(data) {
            var _this2 = this

            var formattedData = this.bubble(this.root).children

            this.node = this.svg.selectAll(".node").data(formattedData)

            var nodeEnter = this.node.enter().append("g").attr("class", "node").attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")"
            })

            nodeEnter.append("circle").attr("r", function (d) {
                return d.r
            }).style("fill", function (d, i) {
                return _this2.color(i)
            }).on("mouseover", this.onMouseOver.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("mouseout", this.onMouseOut.bind(this))

            this.text.data(formattedData).text(this.setText)

            this.node.select("circle").transition().duration(this.transitionDuration).attr("r", function (d) {
                return d.r
            }).style("fill", function (d, i) {
                return _this2.color(i)
            })

            this.node.transition().attr("class", "node").attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")"
            })

            this.node.exit().remove()
        }
    }])

    return BubbleChart
})(_BaseChart3["default"])

exports["default"] = BubbleChart
module.exports = exports["default"]