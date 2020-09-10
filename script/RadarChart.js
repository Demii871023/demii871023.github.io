
var playerValue = [0,0,0,0];

const rangebar_name = ['pressureBar', 'strengthBar', 'lazyBar', 'socialBar'];
const rangerange_name = ['pressureRange', 'strengthRange', 'lazyRange', 'socialRange'];
var rangebar_now = 0;
var valueTmp = 0;


function dragInputRange(event) {
    document.getElementById('pressureRange').value = (playerValue[0]).toString();
    event.preventDefault();
}



var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var color = Chart.helpers.color;
var chartconfig = {
    type: 'radar',
    data: {
        labels: ["壓力", "體力", "惰性", "人際支持"],
        datasets: [{
            label: '角色能力值',
            backgroundColor: color('#FFFFFF').alpha(0.5).rgbString(),
            borderColor: '#FFFFFF',
            pointBackgroundColor: '#FFFFFF',
            data: [
                playerValue[0],
                playerValue[1],
                playerValue[2],
                playerValue[3],
            ]
        }]
    },
    options: {
        legend: {
            position: 'top',
            display:false,
        },
        scale: {
            ticks: {
                // 級距數值
                display: false,
                beginAtZero: true,
                max: 100,
                min: 0,
                
            },
            //發散線
            angleLines:{
                color: 'rgba(255,255,255,0.5)',
            },
            // 四角線
            gridLines: {
                color: 'rgba(255,255,255,0.5)',
            },
            // 頂點標籤
            pointLabels:{
                // fontColor: 'rgba(255,255,255,0.5)',
                fontColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                fontSize: 20,
            },
            
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        }

    }
};


function playerConfirm(){
    myRadar = new Chart(document.getElementById('RaderChartCanvas'), chartconfig);
}

// document.getElementById('playerConfirmBtn').addEventListener('click', function() {
//     chartconfig.data.datasets.forEach(function(dataset) {
//         dataset.data = dataset.data.map(function() {
//             return randomScalingFactor();
//         });
//     });

//     window.myRadar.update();
// });

// 角色能力值控制
document.onkeydown = playerValueControl;

function playerValueControl(e) {
    e = e || window.event;
    if(playervalueMove)
    {
        // up arrow
        if (e.keyCode == '38'){
            if(rangebar_now == 0)
                return;
            document.getElementById(rangebar_name[rangebar_now]).classList.remove("border");
            document.getElementById(rangebar_name[rangebar_now]).classList.remove("border-light");
            document.getElementById(rangebar_name[rangebar_now]).style.backgroundColor = 'rgba(255, 255, 255, 0)';
            rangebar_now = rangebar_now - 1;
            document.getElementById(rangebar_name[rangebar_now]).classList.add("border");
            document.getElementById(rangebar_name[rangebar_now]).classList.add("border-light");
            document.getElementById(rangebar_name[rangebar_now]).style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        }
        // down arrow -> 下一個 range bar
        else if (e.keyCode == '40'){
            if(rangebar_now == 3)
                return;
            document.getElementById(rangebar_name[rangebar_now]).classList.remove("border");
            document.getElementById(rangebar_name[rangebar_now]).classList.remove("border-light");
            document.getElementById(rangebar_name[rangebar_now]).style.backgroundColor = 'rgba(255, 255, 255, 0)';
            rangebar_now = rangebar_now + 1;
            document.getElementById(rangebar_name[rangebar_now]).classList.add("border");
            document.getElementById(rangebar_name[rangebar_now]).classList.add("border-light");
            document.getElementById(rangebar_name[rangebar_now]).style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        }
        // left arrow
        else if (e.keyCode == '39'){
            if(playerValue[rangebar_now] == 100)
                return;
            playerValue[rangebar_now] = playerValue[rangebar_now] + 1;
            document.getElementById(rangerange_name[rangebar_now]).value = (playerValue[rangebar_now]).toString();
            i = -1;
            chartconfig.data.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    i = i + 1;
                    return playerValue[i];
                });
            });
        
            window.myRadar.update();
        }
        // right arrow
        else if (e.keyCode == '37'){
            if(playerValue[rangebar_now] == 0)
                return;
            playerValue[rangebar_now] = playerValue[rangebar_now] - 1;
            document.getElementById(rangerange_name[rangebar_now]).value = (playerValue[rangebar_now]).toString();
            i = -1;
            chartconfig.data.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    i = i + 1;
                    return playerValue[i];
                });
            });

            window.myRadar.update();
        }
    }
}
