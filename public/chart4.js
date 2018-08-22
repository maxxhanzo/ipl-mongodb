Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'top 10 economical bowlers for season 2015'
  },
  subtitle: {},
  xAxis: {
    categories: data.nameArray,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Economy rate'
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
    name: 'Bowlers',
    data: data.ecoArray
  }]
});
