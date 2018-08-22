console.log(data.seasons);
Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'IPL matches per season'
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    categories: data.seasonsArray,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'no. of matches'
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
    name: 'total matches each year',
    data: data.matchesArray

  }]
});
