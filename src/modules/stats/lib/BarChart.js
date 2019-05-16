"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } })()

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3, _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function } } else if ("value" in desc) { return desc.value } else { var getter = desc.get; if (getter === undefined) { return undefined } return getter.call(receiver) } } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj } }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key] } } newObj["default"] = obj; return newObj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function") } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { configurable: true, enumerable: false, value: subClass, writable: true, } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var _d3 = require("d3")

var d3 = _interopRequireWildcard(_d3)

var _BaseChart2 = require("./BaseChart")

var _BaseChart3 = _interopRequireDefault(_BaseChart2)

var BarChart = (function (_BaseChart) {
    _inherits(BarChart, _BaseChart)

    function BarChart() {
        _classCallCheck(this, BarChart)

        _get(Object.getPrototypeOf(BarChart.prototype), "constructor", this).apply(this, arguments)
    }

    _createClass(BarChart, [{
        key: "getScaleX",
        value: function getScaleX() {
            return d3.scaleBand().range([0, this.props.width], 0.1)
        }
    }, {
        key: "getScaleY",
        value: function getScaleY() {
            return d3.scaleLinear().range([this.props.height, 0])
        }
    }, {
        key: "createAxisX",
        value: function createAxisX(x) {
            return d3.axisBottom(x)
        }
    }, {
        key: "createAxisY",
        value: function createAxisY(y) {
            return d3.axisLeft(y)
        }
    }, {
        key: "onMouseOver",
        value: function onMouseOver(d) {
            return this.tooltip.style("visibility", "visible").text(d.xValue + " (" + d.yValue + ")")
        }
    }, {
        key: "create",
        value: function create(data) {
            var _this = this

            this.x = this.getScaleX()
            this.y = this.getScaleY()

            var xAxis = this.createAxisX(this.x)
            var yAxis = this.createAxisY(this.y)
            var width = this.props.width + this.props.margin.left + this.props.margin.right
            var height = this.props.height + this.props.margin.top + this.props.margin.bottom

            this.svg = d3.select(this.el).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + this.props.margin.left + ", " + this.props.margin.top + ")")

            this.x.domain(data.map(function (d) {
                return d.xValue
            }))
            this.y.domain([0, d3.max(data, function (d) {
                return d.yValue
            })])

            this.svg.append("g").attr("class", "x axis").attr("transform", "translate(0, " + this.props.height + ")").call(xAxis)

            this.svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end")

            this.svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
                return _this.x(d.xValue)
            }).attr("width", this.x.bandwidth()).attr("y", function (d) {
                return _this.y(d.yValue)
            }).attr("height", function (d) {
                return _this.props.height - _this.y(d.yValue)
            }).on("mouseover", this.onMouseOver.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("mouseout", this.onMouseOut.bind(this)).style("fill", "steelblue")

            this.svg.selectAll("path").style("fill", "none").style("stroke", "#000").style("shape-rendering", "crispEdges")

            if (this.showTooltips) {
                this.addTooltips()
            }
        }
    }, {
        key: "update",
        value: function update(data) {
            var _this2 = this
            // Recalculate domain given new data
            this.y.domain([0, d3.max(data, function (d) {
                return d.yValue
            })])
            this.x.domain(data.map(function (d) {
                return d.xValue
            }))

            // We now have an updated Y axis
            var updatedAxisY = this.createAxisY(this.y)
            var updatedAxisX = this.createAxisX(this.x)

            // Let's update the x & y axis
            this.svg.selectAll("g.y.axis").call(updatedAxisY)
            this.svg.selectAll("g.x.axis").call(updatedAxisX)

            this.svg.selectAll(".bar").data(data).enter().append("rect").on("mouseover", this.onMouseOver.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("mouseout", this.onMouseOut.bind(this)).style("fill", "steelblue")

            this.svg.selectAll("rect").data(data).transition().duration(this.transitionDuration).attr("class", "bar").attr("y", function (d) {
                return _this2.y(d.yValue)
            }).attr("height", function (d) {
                return _this2.props.height - _this2.y(d.yValue)
            }).attr("x", function (d) {
                return _this2.x(d.xValue)
            }).attr("width", this.x.bandwidth())
        }
    }])

    return BarChart
})(_BaseChart3["default"])

exports["default"] = BarChart
module.exports = exports["default"]