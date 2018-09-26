document.querySelector("#wordcloud_selector").addEventListener("click", function () {
    let file_name = document.getElementById('from').innerText;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/api/qqrv/v1/word_cloud?file=" + file_name, true);
    xhr.send();
    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText)["option"]["series"][0]["data"];
        generate(data)
    }
});

function generate(data) {
    let chart = echarts.init(document.getElementById("chart"));
    let option = {
        tooltip: {},
        series: [ {
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'circle',
            width: 600,
            height: 400,
            drawOutOfBound: true,
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: data
        } ]
    };
    chart.setOption(option);
}
