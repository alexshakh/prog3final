google.charts.load('45', { packages: ['corechart', 'table', 'treemap'] });

google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawHistogramChart);
google.charts.setOnLoadCallback(drawTable);


function drawColumnChart() {
    $.ajax({
        url: "/movies",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Year');
            data.addColumn('number', 'Count');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].date,
                   jsonData[i].rating,
                ]);

            }

            var options = {
                colors: ['#228B22'],
                legend: { position: 'none' },
                title: "Movies' Ratings",
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' },
                isStacked: true,
              };
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
};


function drawHistogramChart() {
    $.ajax({
        url: "/movies",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Year');
            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].date,
                ]);

            }

            var options = {
                title: 'Movies per Year',
                legend: { position: 'center' },
                colors: ['#228B22'],
                hAxis: { title: 'Year' },
                vAxis: { minValue: 0, title: 'Count' },
                histogram: {
                    bucketSize: 10,
                    maxNumBuckets: 100
                }
            };
            var chart = new google.visualization.Histogram(document.getElementById('chart_div1'));
            chart.draw(data, options);
        }
    });
};
function drawTable() {
    $.ajax({
        url: "/movies",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Title');
            data.addColumn('number', 'Date');
            data.addColumn('number', 'Rating');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].date,
                    jsonData[i].rating,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 2);
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawColumnChart();
    drawColumnChart();
    drawTable();
});
