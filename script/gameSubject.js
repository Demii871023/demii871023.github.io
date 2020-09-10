// 偵測是否執行動作：吃 eat / 不吃 donteat
var eat = false;    
var donteat = false;
ㄋ
// 防呆機制：如果 modal 視窗打開，則角色不能再移動
var dontMove = false;

var spaceCounter = 0;
var beansTmp;

// 使用者選擇科目
var subject_select = -1;

// 科目亂數座標
var subject_xy = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];


const gameSubject = {
    key: 'gameSubject',
    preload: function(){

        gsCounter = gsCounter + 1;
        
        if(gsCounter == 3)
            console.log('觸發隨機事件');

        // 每次進入都要初始所選科目
        subject_select = -1;
        
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
            this.scene.start('gameBonus');
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
