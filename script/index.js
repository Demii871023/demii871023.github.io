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


var eat = false;    // 偵測是否執行動作：吃
var spaceCounter = 0;

var donteat = false;

// 防呆機制：如果 modal 視窗打開，則角色不能再移動
var dontMove = false;

var beansTmp;

// 使用者選擇科目
var subject_select = -1;
// 科目亂數座標
var subject_xy = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];

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



// playerSelect.js 選取角色

const mainpScale = 0.5;
const otherpScle = 0.3;

// 縮小放大
var shrinkScale = otherpScle, enlargeScale = mainpScale;

// 使用者選擇角色 (now_select：還沒確定時左右移動的 index 數 / player_select：使用者選定角色 id / player_confirm：布林值，用於辨別是否確認角色)
var now_select = 0;
var player_select = -1;
var player_confirm = false;

// 用於存放角色的陣列
const playerArr = new Array(6);

// 判斷按鍵是否按下，並判斷角色是否目前處於移動狀態
var keydwon = false;
var playerMove = false;
var playervalueMove = false;

const playerSelect = {
    key: 'playerSelect',
    preload: function(){
        
        // 讀入角色
        this.load.image('player1', 'image/Character/player1.png');
        this.load.image('player2', 'image/Character/player2.png');
        this.load.image('player3', 'image/Character/player3.png');
        this.load.image('player4', 'image/Character/player4.png');
        this.load.image('player5', 'image/Character/player5.png');
        this.load.image('player6', 'image/Character/player6.png');
        
        document.getElementById('gmChatCardText').innerHTML = "在正式進入之前，選一個喜歡的角色來開始吧！<br>每個角色之間會有不同擅長的事情，依照你自己的喜好來選擇吧！";

    },
    create: function(){
        
        player1 = this.physics.add.sprite(cw/2, ch/2, 'player1');
        player1.setScale(mainpScale);
        player1.alpha = 1;
        playerArr[0] = player1;

        player2 = this.physics.add.sprite(cw/2 + cw/4, ch/2, 'player2');
        player2.setScale(otherpScle);
        player2.alpha = 0.5;
        playerArr[1] = player2;

        player3 = this.physics.add.sprite(cw/2 + 2 * cw/4, ch/2, 'player3');
        player3.setScale(otherpScle);
        player3.alpha = 0.5;
        playerArr[2] = player3;

        player4 = this.physics.add.sprite(cw/2 + 3 * cw/4, ch/2, 'player4');
        player4.setScale(otherpScle);
        player4.alpha = 0.5;
        playerArr[3] = player4;

        player5 = this.physics.add.sprite(cw/2 + 4 * cw/4, ch/2, 'player5');
        player5.setScale(otherpScle);
        player5.alpha = 0.5;
        playerArr[4] = player5;

        player6 = this.physics.add.sprite(cw/2 + 5 * cw/4, ch/2, 'player6');
        player6.setScale(otherpScle);
        player6.alpha = 0.5;
        playerArr[5] = player6;

        graphics = this.add.graphics()
        graphics.lineStyle(5, 0x00ffff, 0.5).strokeRectShape(new Phaser.Geom.Rectangle(cw/2-cw/11, ch/2 - 140,  player1.width * mainpScale, player1.height * mainpScale));


        playerName = this.add.text(cw/2-cw/11, ch/2 + 150, "ID：" + player_namezw[0], {color: "#FFFFFF", fontSize:"30px"});
        tipsText = this.add.text(cw - 200, ch - 50, '請按下空白鍵確定角色', {color: "#FFFFFF", fontSize:'14px'});
    },
    update: function(){
        let keyboard = this.input.keyboard.createCursorKeys();
    
        if(!player_confirm)
        {
            if(keyboard.left.isDown)
            {
                if(!keydwon)
                {
                    if(now_select == 0)
                        console.log("無法再往左邊");
                    else
                    {
                        shrinkScale = mainpScale, enlargeScale = otherpScle;
                        keydwon = true;
                        now_select = now_select - 1;
                        for(var i = 0 ; i < 6 ; i++)
                        {
                            if(i == now_select)
                                playerArr[i].alpha = 1;
                            else
                                playerArr[i].alpha = 0.5;
                        }
                        playerName.setText("ID：" + player_namezw[now_select]);
                        timer = this.time.addEvent({
                            delay: 100,           
                            callback: () => {
                                shrinkScale = shrinkScale - 0.04;
                                enlargeScale = enlargeScale + 0.04;
                                for(var i = 0 ; i < 6 ; i++)
                                {
                                    playerArr[i].x = playerArr[i].x + 70;
                                }
                                playerArr[now_select].setScale(enlargeScale);
                                playerArr[now_select + 1].setScale(shrinkScale);
                            },
                            loop: false,
                            repeat: 4
                        });
                    }
                }
            }

            if(keyboard.right.isDown)
            {
                if(!keydwon)
                {
                    if(now_select == 5)
                        console.log("無法再往右邊");
                    else
                    {
                        shrinkScale = mainpScale, enlargeScale = otherpScle;
                        keydwon = true;
                        now_select = now_select + 1;
                        for(var i = 0 ; i < 6 ; i++)
                        {
                            if(i == now_select)
                                playerArr[i].alpha = 1;
                            else
                                playerArr[i].alpha = 0.5;
                        }
                        playerName.setText("ID：" + player_namezw[now_select]);
                        timer = this.time.addEvent({
                            delay: 100,           
                            callback: () => {
                                shrinkScale = shrinkScale - 0.04;
                                enlargeScale = enlargeScale + 0.04;
                                for(var i = 0 ; i < 6 ; i++)
                                {
                                    playerArr[i].x = playerArr[i].x - 70;
                                }
                                playerArr[now_select].setScale(enlargeScale);
                                playerArr[now_select - 1].setScale(shrinkScale);
                            },
                            loop: false,
                            repeat: 4
                        });
                    }
                }
            }

  
        }
        if(shrinkScale.toFixed(1) == otherpScle)
        {
            keydwon = false;
            playerMove = false
            for(var i = 0 ; i < 6 ; i++)
            {
                playerArr[i].setVelocityX(0);
            }

            if(keyboard.space.isDown)
            {
                // 按下空白鍵的時候，若此時沒有選取角色，即確定角色
                if(player_select == -1)
                {
                    // 選擇的角色為現在左右移動時所坐落的 index 數
                    player_select = now_select;
                    player_confirm = true;

                    // 選定人物後移動它
                    for(var i = 0 ; i < 6 ; i++)
                        if(i != player_select)
                            playerArr[i].alpha = 0;

                    // 繪製出雷達圖
                    tmpx = cw/2-cw/11;
                    player_move_value = 36;
                    timer = this.time.addEvent({
                        delay: 70,           
                        callback: () => {
                            graphics.clear();
                            playerArr[player_select].x = playerArr[player_select].x - player_move_value;
                            playerName.x = playerName.x - player_move_value;
                            tmpx = tmpx - player_move_value;
                            player_move_value = player_move_value - 2;
                            graphics.lineStyle(5, 0x00ff00, 0.5).strokeRectShape(new Phaser.Geom.Rectangle(tmpx, ch/2 - 140,  player1.width * mainpScale, player1.height * mainpScale));
                            if(player_move_value == 0)
                            {
                                playerConfirm();
                                document.getElementById('playerRangeBar').style.visibility = "visible";
                                playervalueMove = true;
                                tipsText.setText('請按下空白鍵確定角色能力值');
                            }
                        },
                        loop: false,
                        repeat: 18
                    });
                }
            }
        }
        // 階段：選擇角色能力值
        if(playervalueMove)
        {
            if(keyboard.space.isDown)
            {
                lazyNum = parseInt(document.getElementById('lazyRange').value);
                pressureNum = parseInt(document.getElementById('pressureRange').value);
                strengthNum = parseInt(document.getElementById('strengthRange').value);
                socialNum = parseInt(document.getElementById('socialRange').value);
                
                document.getElementById('playerRadarChart').style.visibility = 'hidden';
                document.getElementById('playerRangeBar').style.visibility = 'hidden';
                this.scene.start('gameSelect');
            }
        }
    },
}

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

const gameSubject = {
    key: 'gameSubject',
    preload: function(){
        
        
        
        gsCounter = gsCounter + 1;
        console.log(gsCounter);
        
        if(gsCounter == 3)
            console.log('觸發隨機事件');

        // 每次進入都要初始所選科目
        subject_select = -1;
        console.log("進入選擇科目");
        
        // 依照選取的角色顯現出角色圖片於角色狀態
        document.getElementById('playerStatusCard').style.visibility = 'visible';
        var tmpID = 'player'+ (player_select + 1).toString() + 'IMG';
        document.getElementById(tmpID).style.display = 'block';
      
        // 角色狀態的四個其他參數玩家擁有數值呈現
        document.getElementById('lazyProgress').style.width = ((lazyNum / lazyMAX) * 100).toString() + "%";
        document.getElementById('lazyProgress').innerHTML = lazyNum.toString();
        document.getElementById('pressureProgress').style.width = ((pressureNum / pressureMAX) * 100).toString() + "%";
        document.getElementById('pressureProgress').innerHTML = pressureNum.toString();
        document.getElementById('strengthProgress').style.width = ((strengthNum / strengthMAX) * 100).toString() + "%";
        document.getElementById('strengthProgress').innerHTML = strengthNum.toString();
        document.getElementById('socialProgress').style.width = ((socialNum / socialMAX) * 100).toString() + "%";
        document.getElementById('socialProgress').innerHTML = socialNum.toString();

        // 倒數計時器隱藏
        document.getElementById('bonusTimer').style.display = 'none';
        
        
        // 顯示玩家紀錄時間軸
        document.getElementById('experienceTimeline').style.visibility = 'visible';
        var tmpID = 'timeline_player'+ (player_select + 1).toString() + 'IMG';
        document.getElementById(tmpID).style.display = 'block';
        
        // 預先載入需要資源
        this.load.image('gamebg', 'image/Background/gamebg.jpg');
        this.load.image('bg2', 'image/Background/jungle-background-clipart.jpg');
        this.load.image('bonusedoor', 'image/door.jpg');
        
        // 載入玩家圖片
        this.load.image('player1', 'image/Character/player1');
        this.load.image('player2', 'image/Character/player2');
        this.load.image('player3', 'image/Character/player3');
        this.load.image('player4', 'image/Character/player4');
        this.load.image('player5', 'image/Character/player5');
        this.load.image('player6', 'image/Character/player6');

        this.load.image('beans', 'image/ClassGroup/dna.png');
        
        // 8 個課業學科
        this.load.image('Langugage', 'image/18College/13.png');
        this.load.image('Science', 'image/18College/11.png');
        this.load.image('Integrative', 'image/18College/7.png');
        this.load.image('Math', 'image/18College/3.png');
        this.load.image('Technology', 'image/18College/8.png');
        this.load.image('Health', 'image/18College/4.png');
        this.load.image('Social', 'image/18College/12.png');
        this.load.image('Art', 'image/18College/9.png');
        
        
        document.getElementById('gmChatCard').style.width = '50%';
        document.getElementById('gmChatCard').style.height = '90px';
        document.getElementById('gmChatCardText').innerHTML = "高中三年，有好多的事情想嘗試，可能想要加強課業，也可能想參加許多活動。挑選一個有興趣的事件嘗試看看吧！";

    },
    create: function(){
        
        this.bg2 = this.add.sprite(cw/2,ch/2, 'bg2');
        gamebg = this.physics.add.sprite(cw/2, ch/2, 'gamebg');
        gamebg.setScale(0.7);
        gamebg.setCollideWorldBounds(true);
        
        bonusedoor = this.physics.add.sprite(cw/2 - gamebg.width * 0.8 / 2, ch/2, 'bonusedoor');
        bonusedoor.setScale(0.3);

        player = this.physics.add.sprite(150, 150, player_name[player_select]);
        
        // 開啟角色邊界限制，並自訂矩形邊界（以矩形左上角頂點為主）
        player.setCollideWorldBounds(true);
        player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(gamebg.x - (gamebg.width * 0.7 /2), gamebg.y - (gamebg.height * 0.7 / 2), gamebg.width * 0.7, gamebg.height * 0.7 ));
        
        //this.player.setBounce(1); //設定彈跳值

        player.setScale(playerScale);
      
        beansGroup = this.add.group();
        beansGroup.enableBody = true;
        
//         console.log(gamebg.width * gamebgScale, gamebg.height * gamebgScale, cw/2 - gamebg.width * gamebgScale / 2, 0 - ch/2 - gamebg.height * gamebgScale / 2);
        
//         console.log(gsCounter);
        
        beansGroup = this.physics.add.group();
        for(var i = 0 ; i < subjectN ; i++)
        {
            let tempX = getRandom(575, 365);
            let tempY = getRandom(300, 195);

            subject_xy[i].x = tempX;
            subject_xy[i].y = tempY;
            
            
            console.log(subject_name[i], subject_xy[i].x, subject_xy[i].y);
            
            beansGroup.create(subject_xy[i].x, subject_xy[i].y, subject_nameen[i]); 

            const config = {
                key: subject_nameen[i],
                setXY: {x: subject_xy[i].x, y: subject_xy.y},
            }
            beansGroup.create(config);
            
        }
        beansGroupChild = beansGroup.getChildren();
        for(var i = 0 ; i < beansGroupChild.length ; i++)
        {
            beansGroupChild[i].setScale(beansScale);           
        }
        
        this.physics.add.overlap(player, beansGroupChild, collectStar, null, this);
        this.physics.add.overlap(player, bonusedoor, inBonuse, null, this);
        
        function collectStar (player, beans)
        {
            // 如果 player 座標與 beans 座標相差小於 10，且使用者按下空白鍵執行吃的動作，且此時沒有選擇的科目
            if(abs(player.x, beans.x) < 10 && abs(player.y, beans.y) < 10 && eat && subject_select == -1)
            {
                console.log("吃掉");
                // 開啟 modal：你確定選擇_____(科目)?
                subject_select = subject_nameen.indexOf(beans.texture.key);
                modalOpen(subject_nameen.indexOf(beans.texture.key));
                // 該科目豆消失 -> 等待改進，要 modal 按了確定才能消失
                beansTmp = beans;
                beans.setVisible(false);
            }
            else if(abs(player.x, beans.x) < 10 && abs(player.y, beans.y) < 10 && donteat && subject_select != -1)
            {
                console.log("吐出來");
                subject_select = -1;
                beans.setVisible(true);
            }
        }
        
        function inBonuse(player, bonuse)
        {
            console.log("進入加分關卡");
            this.scene.start('gameBonus');
        }
    },
    update: function(){
        
        // 偵測按鍵事件
        let keyboard = this.input.keyboard.createCursorKeys();
        
        if(!dontMove)
        {
            // player 上下左右移動
            if(keyboard.right.isDown)
                player.setVelocityX(160);
            else if(keyboard.left.isDown)
                player.setVelocityX(-160);
            else
                player.setVelocityX(0);

            if(keyboard.up.isDown)
                player.setVelocityY(-160);
            else if(keyboard.down.isDown)
                player.setVelocityY(160);
            else
                player.setVelocityY(0);
        }
        
        // player 吃科目豆
        if(keyboard.space.isDown)
        {
            if(!eat)
            {
                // 已經按過一次了又再按一次，代表他確定要選擇
                if(spaceCounter >= 1 && subject_select != -1)
                {
                    sureModalClose();
                    spaceCounter = spaceCounter + 1;
                    this.scene.start('doSubject');
                }
                console.log("空白鍵");
                eat = true;
                spaceCounter = spaceCounter + 1;
            }

        }
        else
            eat = false;

        if(keyboard.shift.isDown)
        {
            // 決定不吃該科目豆，因此將 spaceCounter 歸零，等待下次再吃
            if(!donteat)
            {
                if(subject_select != -1)
                {
                    cancelModalClose();
                    console.log("shift");
                    spaceCounter = 0;
                }
                donteat = true;
            }
        }
        else
            donteat = false
    }
}

// index.js

// $( window ).resize(function() {
//   $( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
// });

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

