// const.js
const cw = $(window).width();
const ch = $(window).height();
const bg1Scale = 4;
const gamebgScale = 0.7;
const playerScale = 0.3;
const beansScale = 0.2;
const classScale = 0.5;
const scale = 0.6;
const monsterScale = 0.7;

// 用來階段計時器 -> 每選擇一件事情，就扣除掉特定時間
var stageTime = 10;


// 其他參數的最大值
const lazyMAX = 100;      // 惰性
const pressureMAX = 100;  // 壓力
const strengthMAX = 100;  // 體力
const socialMAX = 100;    // 人際

// 玩家擁有數值
var lazyNum;      // 惰性
var pressureNum;  // 壓力
var strengthNum;  // 體力
var socialNum;    // 人際
var time;         // 時間

// 課目類別名稱及個數
const subjectN = 8;
const subject_name = ['語文', '自然科學', '綜合活動', '數學', '科技', '健康與體育', '社會', '藝術'];
const subject_nameen = ['Langugage', 'Science', 'Integrative', 'Math', 'Technology', 'Health', 'Social', 'Art'];
const player_name = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6'];
const player_namezw = ['四神湯', '卍煞氣卍', '乂都都乂', '跑跑當家', '葡萄醣吳', '乂龘燚龘燚乂'];


const activity_name = ['社團', '校隊', '科展'];
const activity_nameen = ['Club', 'SchoolTeam', 'ScienceFair'];



// 取得亂數函式
const getRandom = (range, start) =>{
    return Math.floor(Math.random() * range) + start;
};

// 取絕對值
const abs = (num1, num2) =>{
    if(num1 - num2 > 0)
        return num1 - num2;
    else
        return (num1 - num2) * -1;
};

function modalOpen(index)
{
    console.log("eat");
    $("#btn_modal").click();
    $("#subject_name").text(subject_name[index]);
    dontMove = true;
}

function cancelModalClose()
{
    console.log("Don't eat");
    $("#cancel").click();
    
    $("#btn_modal").click();
    $("#cancel").click();
    dontMove = false;
}

function sureModalClose()
{
    console.log("確定選擇" + subject_name[subject_select]);
    // 等待 Debug
    $("#cancel").click();

    $("#btn_modal").click();
    $("#cancel").click();
    dontMove = false;
}


// window.addEventListener('keypress', function(e) {
//     var keyID = e.code;
    
//     // 按 Q 即丟棄已選擇科目
//     if (keyID == 'KeyQ')
//     {
//         console.log("Q");
// //         $("#btn_modal").click();
//         $('#modal_subjectSelect').modal('show');
//         $("#subject_name").text(subject_name[1]);
        
//   }
// }, false);



// // playerSelect.js 選取角色

// const mainpScale = 0.5;
// const otherpScle = 0.3;

// // 縮小放大
// var shrinkScale = otherpScle, enlargeScale = mainpScale;

// // 使用者選擇角色 (now_select：還沒確定時左右移動的 index 數 / player_select：使用者選定角色 id / player_confirm：布林值，用於辨別是否確認角色)
// var now_select = 0;
// var player_select = -1;
// var player_confirm = false;

// // 用於存放角色的陣列
// const playerArr = new Array(6);

// // 判斷按鍵是否按下，並判斷角色是否目前處於移動狀態
// var keydwon = false;
// var playerMove = false;
// var playervalueMove = false;

// const playerSelect = {
//     key: 'playerSelect',
//     preload: function(){
        
//         // 讀入角色
//         this.load.image('player1', 'image/Character/player1.png');
//         this.load.image('player2', 'image/Character/player2.png');
//         this.load.image('player3', 'image/Character/player3.png');
//         this.load.image('player4', 'image/Character/player4.png');
//         this.load.image('player5', 'image/Character/player5.png');
//         this.load.image('player6', 'image/Character/player6.png');
        
//         document.getElementById('gmChatCardText').innerHTML = "在正式進入之前，選一個喜歡的角色來開始吧！<br>每個角色之間會有不同擅長的事情，依照你自己的喜好來選擇吧！";

//     },
//     create: function(){
        
//         player1 = this.physics.add.sprite(cw/2, ch/2, 'player1');
//         player1.setScale(mainpScale);
//         player1.alpha = 1;
//         playerArr[0] = player1;

//         player2 = this.physics.add.sprite(cw/2 + cw/4, ch/2, 'player2');
//         player2.setScale(otherpScle);
//         player2.alpha = 0.5;
//         playerArr[1] = player2;

//         player3 = this.physics.add.sprite(cw/2 + 2 * cw/4, ch/2, 'player3');
//         player3.setScale(otherpScle);
//         player3.alpha = 0.5;
//         playerArr[2] = player3;

//         player4 = this.physics.add.sprite(cw/2 + 3 * cw/4, ch/2, 'player4');
//         player4.setScale(otherpScle);
//         player4.alpha = 0.5;
//         playerArr[3] = player4;

//         player5 = this.physics.add.sprite(cw/2 + 4 * cw/4, ch/2, 'player5');
//         player5.setScale(otherpScle);
//         player5.alpha = 0.5;
//         playerArr[4] = player5;

//         player6 = this.physics.add.sprite(cw/2 + 5 * cw/4, ch/2, 'player6');
//         player6.setScale(otherpScle);
//         player6.alpha = 0.5;
//         playerArr[5] = player6;

//         graphics = this.add.graphics()
//         graphics.lineStyle(5, 0x00ffff, 0.5).strokeRectShape(new Phaser.Geom.Rectangle(cw/2-cw/11, ch/2 - 140,  player1.width * mainpScale, player1.height * mainpScale));


//         playerName = this.add.text(cw/2-cw/11, ch/2 + 150, "ID：" + player_namezw[0], {color: "#FFFFFF", fontSize:"30px"});
//         tipsText = this.add.text(cw - 200, ch - 50, '請按下空白鍵確定角色', {color: "#FFFFFF", fontSize:'14px'});
//     },
//     update: function(){
//         let keyboard = this.input.keyboard.createCursorKeys();
    
//         if(!player_confirm)
//         {
//             if(keyboard.left.isDown)
//             {
//                 if(!keydwon)
//                 {
//                     if(now_select == 0)
//                         console.log("無法再往左邊");
//                     else
//                     {
//                         shrinkScale = mainpScale, enlargeScale = otherpScle;
//                         keydwon = true;
//                         now_select = now_select - 1;
//                         for(var i = 0 ; i < 6 ; i++)
//                         {
//                             if(i == now_select)
//                                 playerArr[i].alpha = 1;
//                             else
//                                 playerArr[i].alpha = 0.5;
//                         }
//                         playerName.setText("ID：" + player_namezw[now_select]);
//                         timer = this.time.addEvent({
//                             delay: 100,           
//                             callback: () => {
//                                 shrinkScale = shrinkScale - 0.04;
//                                 enlargeScale = enlargeScale + 0.04;
//                                 for(var i = 0 ; i < 6 ; i++)
//                                 {
//                                     playerArr[i].x = playerArr[i].x + 70;
//                                 }
//                                 playerArr[now_select].setScale(enlargeScale);
//                                 playerArr[now_select + 1].setScale(shrinkScale);
//                             },
//                             loop: false,
//                             repeat: 4
//                         });
//                     }
//                 }
//             }

//             if(keyboard.right.isDown)
//             {
//                 if(!keydwon)
//                 {
//                     if(now_select == 5)
//                         console.log("無法再往右邊");
//                     else
//                     {
//                         shrinkScale = mainpScale, enlargeScale = otherpScle;
//                         keydwon = true;
//                         now_select = now_select + 1;
//                         for(var i = 0 ; i < 6 ; i++)
//                         {
//                             if(i == now_select)
//                                 playerArr[i].alpha = 1;
//                             else
//                                 playerArr[i].alpha = 0.5;
//                         }
//                         playerName.setText("ID：" + player_namezw[now_select]);
//                         timer = this.time.addEvent({
//                             delay: 100,           
//                             callback: () => {
//                                 shrinkScale = shrinkScale - 0.04;
//                                 enlargeScale = enlargeScale + 0.04;
//                                 for(var i = 0 ; i < 6 ; i++)
//                                 {
//                                     playerArr[i].x = playerArr[i].x - 70;
//                                 }
//                                 playerArr[now_select].setScale(enlargeScale);
//                                 playerArr[now_select - 1].setScale(shrinkScale);
//                             },
//                             loop: false,
//                             repeat: 4
//                         });
//                     }
//                 }
//             }

  
//         }
//         if(shrinkScale.toFixed(1) == otherpScle)
//         {
//             keydwon = false;
//             playerMove = false
//             for(var i = 0 ; i < 6 ; i++)
//             {
//                 playerArr[i].setVelocityX(0);
//             }

//             if(keyboard.space.isDown)
//             {
//                 // 按下空白鍵的時候，若此時沒有選取角色，即確定角色
//                 if(player_select == -1)
//                 {
//                     // 選擇的角色為現在左右移動時所坐落的 index 數
//                     player_select = now_select;
//                     player_confirm = true;

//                     // 選定人物後移動它
//                     for(var i = 0 ; i < 6 ; i++)
//                         if(i != player_select)
//                             playerArr[i].alpha = 0;

//                     // 繪製出雷達圖
//                     tmpx = cw/2-cw/11;
//                     player_move_value = 36;
//                     timer = this.time.addEvent({
//                         delay: 70,           
//                         callback: () => {
//                             graphics.clear();
//                             playerArr[player_select].x = playerArr[player_select].x - player_move_value;
//                             playerName.x = playerName.x - player_move_value;
//                             tmpx = tmpx - player_move_value;
//                             player_move_value = player_move_value - 2;
//                             graphics.lineStyle(5, 0x00ff00, 0.5).strokeRectShape(new Phaser.Geom.Rectangle(tmpx, ch/2 - 140,  player1.width * mainpScale, player1.height * mainpScale));
//                             if(player_move_value == 0)
//                             {
//                                 playerConfirm();
//                                 document.getElementById('playerRangeBar').style.visibility = "visible";
//                                 playervalueMove = true;
//                                 tipsText.setText('請按下空白鍵確定角色能力值');
//                             }
//                         },
//                         loop: false,
//                         repeat: 18
//                     });
//                 }
//             }
//         }
//         // 階段：選擇角色能力值
//         if(playervalueMove)
//         {
//             if(keyboard.space.isDown)
//             {
//                 lazyNum = parseInt(document.getElementById('lazyRange').value);
//                 pressureNum = parseInt(document.getElementById('pressureRange').value);
//                 strengthNum = parseInt(document.getElementById('strengthRange').value);
//                 socialNum = parseInt(document.getElementById('socialRange').value);
                
//                 document.getElementById('playerRadarChart').style.visibility = 'hidden';
//                 document.getElementById('playerRangeBar').style.visibility = 'hidden';
//                 this.scene.start('gameSelect');
//             }
//         }
//     },
// }

// gameSelect.js 選擇課業學科或課外活動

// 用於計算 gameSubject 與 gameAcitvity 被選擇了幾次
var gsCounter = 0;
var gaCounter = 0;

var doClass = 1;

const gameSelect = {
    key: 'gameSelect',
    preload: function(){
        
        
        if(stageTime <= 0)
        {
            this.scene.start('recordUpload');
        }

        this.load.image('bg1', 'image/Background/jungle-clipart-background-6.jpg');
        this.load.image('subject', 'image/Background/zoo.png');
        this.load.image('activity', 'image/Background/sloth.png');
        
        document.getElementById('gmChatCard').style.display = 'none';
        document.getElementById('gmChatCard').style.width = '50%';
        document.getElementById('gmChatCard').style.height = '110px';
        document.getElementById('gmChatCardText').innerHTML = "接下來，就讓我們進入正題吧！總共分為課業學科及課外活動兩個部分，每一次的選擇一定會消耗時間，壓力、體力、惰性及人際支持則會隨著你選擇的選項而有所增減。";
        
        
        // 從 doSubject.js 完成後，跳至 gameSelect.js
        document.getElementById('water').style.visibility = 'hidden';
        document.getElementById('optionBadges').style.visibility = 'hidden';

    },
    create: function(){
        bg1 = this.add.sprite(cw/2, ch/2, 'bg1');
        bg1.setScale(bg1Scale);

        mask = this.add.graphics(0, 0);
        mask.fillStyle(0xffffff);

        // 課業學科按鈕
        subject = this.add.sprite(cw/2 - cw/4, ch/2, 'subject');
        subject.setScale(0.65);

        // 課外活動按鈕
        activity = this.add.sprite(cw/2 + cw/4, ch/2, 'activity');
        activity.setScale(classScale);
        activity.setTint(0x5d5d2d);

        // 嘗試點擊後隱藏 phaser canvas
        // activity.on('pointerdown', function(){
        //     var app = document.getElementById('app');
        //     app.style.display = 'none';
        // });
            
    },
    update: function(){
        let keyboard = this.input.keyboard.createCursorKeys();
        
        // 課業學科
        if(keyboard.left.isDown)
        {
            doClass = 1;
            subject.setScale(0.65);
            subject.clearTint();
            activity.setScale(classScale);
            activity.setTint(0x5d5d2d);
        }
        // 課外活動
        else if(keyboard.right.isDown)
        {
            doClass = 2;
            activity.setScale(0.65);
            activity.clearTint();
            subject.setScale(classScale);
            subject.setTint(0x5d5d2d);
        }
        
        // 確定選擇 課業學科(doClass = 1) 或 課外活動(doClass = 2)
        if(keyboard.space.isDown)
        {
            if(doClass == 1)
                this.scene.start('gameSubject');
            if(doClass == 2)
                this.scene.start('gameActivity');
        }     
    }
}


// gameSubject.js

// 門檻值
const threshold_value = [
    {lazy: 0, pressure: 70, strength: 2.5, social: 0, time:1.5}, // 語文
    {lazy: 0, pressure: 70, strength: 2.5, social: 0, time:1.5}, // 自然科學
    {lazy: 0, pressure: 80, strength: 2.5, social: 0, time:1.5}, // 綜合活動
    {lazy: 0, pressure: 70, strength: 2.5, social: 0, time:1.5}, // 數學
    {lazy: 0, pressure: 80, strength: 2.5, social: 0, time:1.5}, // 科技
    {lazy: 0, pressure: 80, strength: 2.5, social: 0, time:1.5}, // 健康與體育
    {lazy: 0, pressure: 70, strength: 2.5, social: 0, time:1.5}, // 社會
    {lazy: 0, pressure: 80, strength: 1.5, social: 0, time:1.5}, // 藝術
];
const threshold_namezw = ['惰性', '壓力', '體力', '人際支持', '時間'];

// index.js


const config = {
    type: Phaser.AUTO,
    width: cw,
    height: ch,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            // debug: true,
        },
    },
    scene: [ 
        playerSelect,
        gameSelect,
        gameSubject,
        gameBonus,
        doSubject,
        recordUpload,
    ]
}

const game = new Phaser.Game(config);

