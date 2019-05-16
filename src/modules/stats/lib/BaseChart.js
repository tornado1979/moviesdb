"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } })()

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key] } } newObj["default"] = obj; return newObj } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function") } }

var _d3 = require("d3")

var d3 = _interopRequireWildcard(_d3)

var chartConfig = {
    innerRadius: 0,
    showLegend: false,
    showTooltips: true,
    transitionDuration: 1000,
}

var BaseChart = (function () {
    function BaseChart(el, props) {
        var _this = this

        _classCallCheck(this, BaseChart)

        this.el = el
        this.props = props
        this.color = this.getColor()

        Object.keys(chartConfig).forEach(function (configKey) {
            // If a prop is defined, let's just use it, otherwise
            // fall back to the default.
            if (_this.props[configKey] !== undefined) {
                _this[configKey] = _this.props[configKey]
            } else {
                _this[configKey] = chartConfig[configKey]
            }
        })
    }

    // Overwrite this function to apply your own color scheme

    _createClass(BaseChart, [{
        key: "getColor",
        value: function getColor() {
            return d3.scaleOrdinal(d3.schemeCategory20c)
        }

        // We don't show tooltips by default
    }, {
        key: "addTooltips",
        value: function addTooltips() {
            this.tooltip = d3.select(this.el).append("div").classed("d3act-tooltip", true).style("position", "absolute").style("z-index", "10").style("visibility", "hidden").style("border", "1px solid grey").style("border-radius", "3px").style("text-align", "center").style("padding", "8px 0").style("width", "100px").style("background-color", "#000").style("color", "#FFF")
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove() {
            if (!this.showTooltips) {
                return
            }

            var top = d3.event.pageY - 10
            var left = d3.event.pageX + 10

            this.tooltip.style("top", top + "px").style("left", left + "px")
        }
    }, {
        key: "onMouseOut",
        value: function onMouseOut() {
            if (!this.showTooltips) {
                return
            }

            this.tooltip.style("visibility", "hidden")
        }

        // Overwrite this function to apply your own removal logic
    }, {
        key: "unmount",
        value: function unmount() {
            this.el.remove()
        }
    }, {
        key: "create",
        value: function create() {
            // To be implemented by class extending BaseChart.
            // `data` is passed as an argument to this function.
        }
    }, {
        key: "update",
        value: function update() {
            // To be implemented by class extending BaseChart.
            // `data` is passed as an argument to this function.
        }
    }])

    return BaseChart
})()

exports["default"] = BaseChart
module.exports = exports["default"]