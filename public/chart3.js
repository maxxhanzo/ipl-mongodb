
Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Extra runs conceded per team for season 2016'
  },
  subtitle: {},
  xAxis: {
    categories: data.teamsArray,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Extra runs per team'
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
    name: 'Teams',
    data: data.extrasArray
  }]
});
