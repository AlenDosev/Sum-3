var lungeChartViewWindow = 0;
var lungeChartRow = 2;

var vaegtChartViewWindow = 0;
var vaegtChartRow = 2;

var hojdeChartViewWindow = 0;
var hojdeChartRow = 2;

var MAX = 9;
var columns = [0, 1, 2,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                }];

var temp = true;

function initCharts() {
    google.charts.load('current', { 'packages': ['corechart', 'timeline'] });
    google.charts.setOnLoadCallback();   
}

function drawChart(prevButton, nextButton, chart, view, options) {
    // Disabling the button while the chart is drawing.
    prevButton.disabled = true;
    nextButton.disabled = true;
    google.visualization.events.addListener(chart, 'ready',
        function () {
            if (options.hAxis.viewWindow.min <= 0) {
                //prevButton.setAttribute('disabled', 'true');
                prevButton.disabled = true;
                prevButton.style.color = 'white'
                prevButton.style.backgroundColor = '#E3DEDA';
            }
            else {
                //prevButton.setAttribute('disabled', 'false');
                prevButton.disabled = false;
                prevButton.style.color = '#E1E5E6'
                prevButton.style.backgroundColor = '#4C7A96';
            }

            if (options.hAxis.viewWindow.max >= MAX) {
                //nextButton.setAttribute('disabled', 'true');
                nextButton.disabled = true;
                nextButton.style.color = 'white'
                nextButton.style.backgroundColor = '#E3DEDA';
            }
            else {
                //nextButton.setAttribute('disabled', 'false');
                nextButton.disabled = false;
                nextButton.style.color = '#E1E5E6'
                nextButton.style.backgroundColor = '#4C7A96';
            }
        });
    chart.draw(view, options);
}

function drawCharts() {
    $("#mainModal").css('display', 'block');
    $("#vaegtRow").css('width', $("#vaegtRow").width() + 'px');
    $("#lungeRow").css('width', $("#vaegtRow").width() + 'px');
    $("#hojdeRow").css('width', $("#vaegtRow").width() + 'px');
    drawLungeChart();
    drawVaegtChart();
    drawHojdeChart();
}

function drawLungeChart() {
    //lungeChartViewWindow = 0;

    var data = google.visualization.arrayToDataTable([
      ['Date', 'Målt af egen læge', { 'type': 'string', 'role': 'style' }],
      [dateArray[0].getDate() + '. ' + month[dateArray[0].getMonth()] + ' ' + dateArray[0].getFullYear(), 45, 'point { fill-color: #4C7A96; }'],
      [dateArray[1].getDate() + '. ' + month[dateArray[1].getMonth()] + ' ' + dateArray[1].getFullYear(), 45, 'point { fill-color: #4C7A96; }'],
      [dateArray[2].getDate() + '. ' + month[dateArray[2].getMonth()] + ' ' + dateArray[2].getFullYear(), 48, 'point { fill-color: #4C7A96; }'],
      [dateArray[3].getDate() + '. ' + month[dateArray[3].getMonth()] + ' ' + dateArray[3].getFullYear(), 46, 'point { fill-color: #4C7A96; }'],
      [dateArray[4].getDate() + '. ' + month[dateArray[4].getMonth()] + ' ' + dateArray[4].getFullYear(), 50, 'point { fill-color: #4C7A96; }'],
      [dateArray[5].getDate() + '. ' + month[dateArray[5].getMonth()] + ' ' + dateArray[5].getFullYear(), 49, 'point { fill-color: #4C7A96; }'],
      [dateArray[6].getDate() + '. ' + month[dateArray[6].getMonth()] + ' ' + dateArray[6].getFullYear(), 42, 'point { fill-color: #4C7A96; }'],
      [dateArray[7].getDate() + '. ' + month[dateArray[7].getMonth()] + ' ' + dateArray[7].getFullYear(), 43, 'point { fill-color: #4C7A96; }'],
      [dateArray[8].getDate() + '. ' + month[dateArray[8].getMonth()] + ' ' + dateArray[8].getFullYear(), 41, 'point { fill-color: #4C7A96; }']
    ]);

    if (lungeChartRow != -1) {
        data.Lf[lungeChartRow].c[2].v = 'point { fill-color: #9A2C2F; }';
    }

    var view = new google.visualization.DataView(data);

    view.setColumns(columns);
    var options = {
        hAxis: { viewWindow: { min: 0, max: 5 } },
        vAxis: { minValue: 0 },
        colors: ['#91918E'],
        backgroundColor: {
            fill: '#F6F1ED'
        },
        chartArea: { left: 10, top: 0, right: 10, width: '50%', height: '80%' },
        pointSize: 8
    };
    options.hAxis.viewWindow.min = lungeChartViewWindow;
    options.hAxis.viewWindow.max = lungeChartViewWindow + 5;

    var chart = new google.visualization.AreaChart(document.getElementById('lungeChart'));
    var prevButton = document.getElementById('lungeLeft');
    var nextButton = document.getElementById('lungeRight');
    
    prevButton.onclick = function () {
        if (prevButton.disabled == false)
        {
            lungeChartViewWindow -= 1;
            options.hAxis.viewWindow.min -= 1;
            options.hAxis.viewWindow.max -= 1;
            drawChart(prevButton, nextButton, chart, view, options);

            if (lungeChartRow != -1) {
                chart.setSelection([{ 'row': lungeChartRow }]);
            }
        }

    };
    nextButton.onclick = function () {
        if (nextButton.disabled == false) {
            lungeChartViewWindow += 1;
            options.hAxis.viewWindow.min += 1;
            options.hAxis.viewWindow.max += 1;
            drawChart(prevButton, nextButton, chart, view, options);
            if (lungeChartRow != -1) {
                chart.setSelection([{ 'row': lungeChartRow }]);
            }
        }
    };

    drawChart(prevButton, nextButton, chart, view, options);

    if (lungeChartRow != -1) {
        chart.setSelection([{ 'row': lungeChartRow }]);
    }

    google.visualization.events.addListener(chart, 'select', selectHandler);

    function selectHandler() {
        var t = chart.getSelection();
        if (t != undefined) {
            if (t[0].row != undefined) {
                lungeChartRow = t[0].row;
                drawLungeChart();
            }
        }
    }
}

function drawVaegtChart() {
    //vaegtChartViewWindow = 0;
    var data = new google.visualization.arrayToDataTable([
        ['Month', 'Målt af egen læge - Vægt', { role: 'style' }],
        [dateArray[0].getDate() + '. ' + month[dateArray[0].getMonth()] + ' ' + dateArray[0].getFullYear(), 66, null],
        [dateArray[1].getDate() + '. ' + month[dateArray[1].getMonth()] + ' ' + dateArray[1].getFullYear(), 67, null],
        [dateArray[2].getDate() + '. ' + month[dateArray[2].getMonth()] + ' ' + dateArray[2].getFullYear(), 66, null],
        [dateArray[3].getDate() + '. ' + month[dateArray[3].getMonth()] + ' ' + dateArray[3].getFullYear(), 68, null],
        [dateArray[4].getDate() + '. ' + month[dateArray[4].getMonth()] + ' ' + dateArray[4].getFullYear(), 69, null],
        [dateArray[5].getDate() + '. ' + month[dateArray[5].getMonth()] + ' ' + dateArray[5].getFullYear(), 67, null],
        [dateArray[6].getDate() + '. ' + month[dateArray[6].getMonth()] + ' ' + dateArray[6].getFullYear(), 65, null],
        [dateArray[7].getDate() + '. ' + month[dateArray[7].getMonth()] + ' ' + dateArray[7].getFullYear(), 64, null],
        [dateArray[8].getDate() + '. ' + month[dateArray[8].getMonth()] + ' ' + dateArray[8].getFullYear(), 65, null]
    ]);

    if (vaegtChartRow != -1) {
        data.Lf[vaegtChartRow].c[2].v = '#9A2C2F';
    }

    var view = new google.visualization.DataView(data);
    view.setColumns(columns);

    var options = {
        tooltip: { isHtml: true },
        hAxis: { viewWindow: { min: 0, max: 7 } },
        vAxis: { minValue: 0 },
        colors: ['#91918E'],
        backgroundColor: {
            fill: '#F6F1ED'
        },
        chartArea: { left: 10, top: 0, right: 10, width: '50%', height: '80%' }
    };
    options.hAxis.viewWindow.min = vaegtChartViewWindow;
    if ($(window).width() < 460) {
        options.hAxis.viewWindow.max = vaegtChartViewWindow + 4;
    }
    else {
        options.hAxis.viewWindow.max = vaegtChartViewWindow + 7;
    }
    
    var chart = new google.visualization.ColumnChart(document.getElementById('vaegtChart'));
    var prevButton = document.getElementById('vaegtLeft');
    var nextButton = document.getElementById('vaegtRight');

    prevButton.onclick = function () {
        if (prevButton.disabled == false) {
            vaegtChartViewWindow--;
            options.hAxis.viewWindow.min -= 1;
            options.hAxis.viewWindow.max -= 1;
            drawChart(prevButton, nextButton, chart, view, options);
        }      
    }
    nextButton.onclick = function () {
        if (nextButton.disabled == false) {
            vaegtChartViewWindow++;
            options.hAxis.viewWindow.min += 1;
            options.hAxis.viewWindow.max += 1;
            drawChart(prevButton, nextButton, chart, view, options);
        }
    }

    drawChart(prevButton, nextButton, chart, view, options);

    google.visualization.events.addListener(chart, 'select', selectHandler);

    function selectHandler() {
        var t = chart.getSelection();
        if (t != undefined) {
            if (t[0].row != undefined) {
                vaegtChartRow = t[0].row;
                drawVaegtChart();
            }
        }
    }
}

function drawHojdeChart() {
    //hojdeChartViewWindow = 0;
    var data = new google.visualization.arrayToDataTable([
        ['Date', 'Målt af egen læge - Højde', { role: 'style' }],
        [dateArray[0].getDate() + '. ' + month[dateArray[0].getMonth()] + ' ' + dateArray[0].getFullYear(), 163, null],
        [dateArray[1].getDate() + '. ' + month[dateArray[1].getMonth()] + ' ' + dateArray[1].getFullYear(), 166, null],
        [dateArray[2].getDate() + '. ' + month[dateArray[2].getMonth()] + ' ' + dateArray[2].getFullYear(), 166, null],
        [dateArray[3].getDate() + '. ' + month[dateArray[3].getMonth()] + ' ' + dateArray[3].getFullYear(), 165, null],
        [dateArray[4].getDate() + '. ' + month[dateArray[4].getMonth()] + ' ' + dateArray[4].getFullYear(), 167, null],
        [dateArray[5].getDate() + '. ' + month[dateArray[5].getMonth()] + ' ' + dateArray[5].getFullYear(), 164, null],
        [dateArray[6].getDate() + '. ' + month[dateArray[6].getMonth()] + ' ' + dateArray[6].getFullYear(), 162, null],
        [dateArray[7].getDate() + '. ' + month[dateArray[7].getMonth()] + ' ' + dateArray[7].getFullYear(), 166, null],
        [dateArray[8].getDate() + '. ' + month[dateArray[8].getMonth()] + ' ' + dateArray[8].getFullYear(), 165, null]
    ]);

    if (hojdeChartRow != -1) {
        data.Lf[hojdeChartRow].c[2].v = '#9A2C2F';
    }

    var view = new google.visualization.DataView(data);
    view.setColumns(columns);

    var options = {
        tooltip: { isHtml: true },
        hAxis: { viewWindow: { min: 0, max: 7 } },
        vAxis: { minValue: 0 },
        colors: ['#91918E'],
        backgroundColor: {
            fill: '#F6F1ED'
        },
        chartArea: { left: 10, top: 0, right: 10, width: '50%', height: '80%' }
    };
    options.hAxis.viewWindow.min = hojdeChartViewWindow;
    if ($(window).width() < 460) {
        options.hAxis.viewWindow.max = hojdeChartViewWindow + 4;
    }
    else {
        options.hAxis.viewWindow.max = hojdeChartViewWindow + 7;
    }
    
    var chart = new google.visualization.ColumnChart(document.getElementById('hojdeChart'));
    var prevButton = document.getElementById('hojdeLeft');
    var nextButton = document.getElementById('hojdeRight');

    prevButton.onclick = function () {
        if (prevButton.disabled == false) {
            hojdeChartViewWindow--;
            options.hAxis.viewWindow.min -= 1;
            options.hAxis.viewWindow.max -= 1;
            drawChart(prevButton, nextButton, chart, view, options);
        }
    }
    nextButton.onclick = function () {
        if (nextButton.disabled == false) {
            hojdeChartViewWindow++;
            options.hAxis.viewWindow.min += 1;
            options.hAxis.viewWindow.max += 1;
            drawChart(prevButton, nextButton, chart, view, options);
        }
    }
    
    drawChart(prevButton, nextButton, chart, view, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);    

    function selectHandler() {
        var t = chart.getSelection();
        if (t != undefined) {
            if (t[0].row != undefined) {
                hojdeChartRow = t[0].row;
                drawHojdeChart();
            }
        }
    }
}

var month = new Array();
month[0] = "Januar";
month[1] = "Februar";
month[2] = "Marts";
month[3] = "April";
month[4] = "Maj";
month[5] = "Juni";
month[6] = "Juli";
month[7] = "August";
month[8] = "September";
month[9] = "Oktober";
month[10] = "November";
month[11] = "December";

