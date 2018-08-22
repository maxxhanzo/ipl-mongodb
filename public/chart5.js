Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'top 10 run scorers for the season 2014'
  },
  subtitle: {},
  xAxis: {
    categories: data.batsmenArray,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Runs scored'
    }
  },
  tooltip: {},
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Batsmen',
    data: data.runsArray
  }]
});
