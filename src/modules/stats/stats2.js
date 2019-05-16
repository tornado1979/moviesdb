import React from 'react'

import { BarChart } from 'react-d3'

const generalChartData = [
  {
    name: 'Darron Weissnat IV',
    BMI: 20.72,
    age: 39,
    birthday: '2005-01-03T00:00:00.000Z',
    city: 'East Russel',
    married: false,
    index: 0,
  },
  {
    name: 'Pablo Ondricka',
    BMI: 19.32,
    age: 38,
    birthday: '1974-05-13T00:00:00.000Z',
    city: 'Lake Edytheville',
    married: false,
    index: 1,
  },
]
const width = 700
const height = 400
const title = 'Bar Chart'
const chartSeries = [
  {
    field: 'frequency',
    name: 'Frequency',
  },
]
const x = d => {
  return d.letter
}
const xScale = 'ordinal'
const xLabel = 'Letter'
const yLabel = 'Frequency'
const yTicks = [10, '%']

const Stats2 = () => {
  return (
    <BarChart
      title={title}
      data={generalChartData}
      width={width}
      height={height}
      chartSeries={chartSeries}
      x={x}
      xLabel={xLabel}
      xScale={xScale}
      yTicks={yTicks}
      yLabel={yLabel}
    />
  )
}

export default Stats2
