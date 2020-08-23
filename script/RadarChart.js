
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var color = Chart.helpers.color;
var chartconfig = {
    type: 'radar',
    data: {
        labels: ["壓力", "體力", "慣性", "人際支持"],
        datasets: [{
            label: '角色能力值',
            backgroundColor: color('#FFFFFF').alpha(0.5).rgbString(),
            borderColor: '#FFFFFF',
            pointBackgroundColor: '#FFFFFF',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
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
            
        }

    }
};

// window.onload = function() {
//     window.myRadar = new Chart(document.getElementById('RaderChartCanvas'), chartconfig);
// };

function playerConfirm(){
    myRadar = new Chart(document.getElementById('RaderChartCanvas'), chartconfig);
}

document.getElementById('playerConfirmBtn').addEventListener('click', function() {
    chartconfig.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return randomScalingFactor();
        });
    });

    window.myRadar.update();
});




// var ctx = document.getElementById('RaderChartCanvas');
// var RaderChart;



// function playerConfirm()
// {
//     console.log("繪製雷達圖");
//     RaderChart = new Chart(ctx, {
//         type: 'radar',
//         data: {
//             labels:["壓力", "體力", "慣性", "人際支持"],
//             datasets: [{
//                 label: '角色能力值',
//                 data:[100, 19, 34, 40],
//                 backgroundColor: 'rgba(255, 0, 0, .3)',
//                 borderColor: [
//                     'rgba(255, 99, 132, 1',
//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             scale: {
                
//                 // 數值區塊
//                 ticks: {
//                     display: true,
//                     beginAtZero: true,
//                     fontSize: 12,
//                     maxTicksLimit: 100,
//                     stepSize:20,
//                     backdropColor: 'rgba(255,255,255,0.5)',
//                 },
//                 // 發散線
//                 angleLines:{
//                     color: 'rgba(255,255,255,0.5)',
//                 },
//                 // 四角線
//                 gridLines: {
//                     color: 'rgba(255,255,255,0.5)',
//                 },
//                 // 頂點標籤
//                 pointLabels:{
//                     // fontColor: 'rgba(255,255,255,0.5)',
//                     fontColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
//                     fontSize: 20,
//                 },
//             }
//         }
//     });

//     // 關掉 datasets 的 label
//     RaderChart.options.legend.display = false;
//     // console.log(RaderChart.data.labels[0]);
//     // RaderChart.options.scale.pointLabels[0] = '#000000';
//     // updateData();
// }

// function updateData()
// {
//     console.log("繪製雷達圖");
    

// }


