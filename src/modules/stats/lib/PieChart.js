"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } })()

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function } } else if ("value" in desc) { return desc.value } else { var getter = desc.get; if (getter === undefined) { return undefined } return getter.call(receiver) } } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj } }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key] } } newObj["default"] = obj; return newObj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function") } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { configurable: true, enumerable: false, value: subClass, writable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var _d3 = require("d3")

var d3 = _interopRequireWildcard(_d3)

var _BaseChart2 = require("./BaseChart")

var _BaseChart3 = _interopRequireDefault(_BaseChart2)

var PieChart = (function (_BaseChart) {
    _inherits(PieChart, _BaseChart)

    function PieChart() {
        _classCallCheck(this, PieChart)

        _get(Object.getPrototypeOf(PieChart.prototype), "constructor", this).apply(this, arguments)
    }

    _createClass(PieChart, [{
        key: "arcTween",

        // d3's default transition does not interpolate pie chart
        // segments correctly all intermediate `d` values for
        // the `path`s are invalid, so will throw errors.
        // What we are doing here is specifying to d3 how to
        // correctly generate all those previously invalid
        // values.
        value: function arcTween(a) {
            var _this = this

            var interpolated = d3.interpolate(this.originalAngles, a)
            this.originalAngles = interpolated(0)

            return function (t) {
                return _this.arc(interpolated(t))
            }
        }
    }, {
        key: "onMouseOver",
        value: function onMouseOver(d) {
            return this.tooltip.style("visibility", "visible").text(d.data.key + " (" + d.data.value + ")")
        }
    }, {
        key: "addLegend",
        value: function addLegend() {
            var _this2 = this

            this.legend = this.svg.selectAll(".d3act-legend").data(this.color.domain()).enter().append("g").attr("class", "d3act-legend").attr("transform", function (d, i) {
                var height = _this2.legendRectSize + _this2.legendSpacing
                var offset = 20
                var horz = -2 * _this2.legendRectSize
                var vert = _this2.props.height / 2 + i * height + offset

                return "translate(" + horz + "," + vert + ")"
            })

            this.legend.append("rect").attr("width", this.legendRectSize).attr("height", this.legendRectSize).style("fill", this.color).style("stroke", this.color)

            this.legend.append("text").attr("x", this.legendRectSize + this.legendSpacing).attr("y", this.legendRectSize - this.legendSpacing).text(function (d) {
                var name = Object.keys(_this2.data)[d]
                var value = _this2.data[name]

                return name + " (" + value + ")"
            })
        }
    }, {
        key: "getHeight",
        value: function getHeight(numberOfItems) {
            if (this.showLegend) {
                var legendRectExtraHeight = numberOfItems * this.legendRectSize
                var legendSpacingExtraHeight = numberOfItems * this.legendSpacing

                return this.props.height * 1.5 + legendSpacingExtraHeight + legendRectExtraHeight
            }

            return this.props.height
        }
    }, {
        key: "create",
        value: function create(data) {
            var _this3 = this

            this.legendRectSize = 18
            this.legendSpacing = 4
            this.data = data

            var numberOfItems = Object.keys(data).length

            var width = this.props.width
            var height = this.props.height
            var svgHeight = this.getHeight(numberOfItems)
            var radius = Math.min(width, height) / 2
            var halfWidth = width / 2
            var halfHeight = height / 2

            this.arc = d3.arc().outerRadius(radius - 10).innerRadius(this.innerRadius)

            this.pie = d3.pie().sort(null).value(function (d) {
                return d.value
            })

            this.svg = d3.select(this.el).append("svg").attr("width", width).attr("height", svgHeight).append("g").attr("transform", "translate(" + halfWidth + ", " + halfHeight + ")")

            this.path = this.svg.selectAll("path").data(this.pie(d3.entries(data))).enter().append("path")

            this.path.attr("fill", function (d, i) {
                return _this3.color(i)
            }).attr("d", this.arc).each(function (d) {
                // Let's keep a reference to the
                // original angles to make use of
                // in our arcTween helper.
                _this3.originalAngles = d
            }).on("mouseover", this.onMouseOver.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("mouseout", this.onMouseOut.bind(this))

            if (this.showTooltips) {
                this.addTooltips()
            }

            if (this.showLegend) {
                this.addLegend()
            }
        }
    }, {
        key: "update",
        value: function update(data) {
            var _this4 = this

            this.path.data(this.pie(d3.entries(data))).transition().duration(this.transitionDuration).attrTween("d", this.arcTween.bind(this))

            this.path.data(this.pie(d3.entries(data))).enter().append("path").attr("fill", function (d, i) {
                return _this4.color(i)
            }).attr("d", this.arc).each(function (d) {
                // Let's keep a reference to the
                // original angles to make use of
                // in our arcTween helper.
                _this4.originalAngles = d
            }).on("mouseover", this.onMouseOver.bind(this)).on("mousemove", this.onMouseMove.bind(this)).on("mouseout", this.onMouseOut.bind(this))
        }
    }])

    return PieChart
})(_BaseChart3["default"])

exports["default"] = PieChart
module.exports = exports["default"]