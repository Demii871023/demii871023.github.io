const rangebar_name = ['pressureBar', 'strengthBar', 'lazyBar', 'socialBar'];
const rangerange_name = ['pressureRange', 'strengthRange', 'lazyRange', 'socialRange'];
var playerValue = [0,0,0,0];
var rangebar_now = 0;

// 防止用滑鼠控制角色能力拉霸
function dragInputRange_Pressure(event) {
    document.getElementById('pressureRange').value = (playerValue[0]).toString();
    event.preventDefault();
}

function dragInputRange_Strength(event) {
    document.getElementById('strengthRange').value = (playerValue[1]).toString();
    event.preventDefault();
}

function dragInputRange_Lazy(event) {
    document.getElementById('lazyRange').value = (playerValue[2]).toString();
    event.preventDefault();
}

function dragInputRange_Social(event) {
    document.getElementById('socialRange').value = (playerValue[3]).toString();
    event.preventDefault();
}


// 設置雷達圖基本參數
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

// 繪製雷達圖
function playerConfirm(){
    myRadar = new Chart(document.getElementById('RaderChartCanvas'), chartconfig);
}

// 角色能力值控制，設置鍵盤輸入事件
document.onkeydown = playerValueControl;

function playerValueControl(e) {
    e = e || window.event;
    if(playervalueMove)
    {
        // up arrow -> 上一個 range bar
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
        
        // left arrow -> rangebar_now 的那個 bar 增加數值
        else if (e.keyCode == '39'){
            
            // 已達數值最大限制
            if(playerValue[rangebar_now] == 100)
                return;
            
            // 遞增該 bar 的數值
            playerValue[rangebar_now] = playerValue[rangebar_now] + 1;
            document.getElementById(rangerange_name[rangebar_now]).value = (playerValue[rangebar_now]).toString();
            
            // 將數值每一個放回 datasets 中
            i = -1;
            chartconfig.data.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    i = i + 1;
                    return playerValue[i];
                });
            });
        
            // 更新雷達圖上的數值
            window.myRadar.update();
        }
        
        // right arrow -> -> rangebar_now 的那個 bar 減少數值
        else if (e.keyCode == '37'){
            
            // 已達數值最小限制
            if(playerValue[rangebar_now] == 0)
                return;
            
            // 遞減該 bar 的數值
            playerValue[rangebar_now] = playerValue[rangebar_now] - 1;
            document.getElementById(rangerange_name[rangebar_now]).value = (playerValue[rangebar_now]).toString();
            
            // 將數值每一個放回 datasets 中
            i = -1;
            chartconfig.data.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    i = i + 1;
                    return playerValue[i];
                });
            });
            
            // 更新雷達圖上的數值
            window.myRadar.update();
        }
    }
}
