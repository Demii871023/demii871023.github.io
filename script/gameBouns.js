/*
scene：gameBouns.js
decribe：當玩家進入 bouns 門時，進入獎勵頁面
*/

const percentN = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
const bonus_name = ['lazyB', 'pressureB', 'socialB', 'strengthB'];
var rebounce = ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false'];

// 加分遊戲進度控制 bonusStart：開始 / bonusStop：暫停 / bonuseOver：結束
var bonusStart = false;
var bonusStop = false;
var bonusOver = false;
var addKey = '';

var maskCounter = 0;

var bonus_xy = [
    // 惰性 lazyNum
    {x: 0, y: 0, gravity: 0, velocity: 0}, 
    {x: 0, y: 0, gravity: 0, velocity: 0},
    {x: 0, y: 0, gravity: 0, velocity: 0},
    // 壓力 pressureNum
    {x: 0, y: 0, gravity: 0, velocity: 0},
    {x: 0, y: 0, gravity: 0, velocity: 0}, 
    {x: 0, y: 0, gravity: 0, velocity: 0},
    // 體力 strengthNum
    {x: 0, y: 0, gravity: 0, velocity: 0}, 
    {x: 0, y: 0, gravity: 0, velocity: 0}, 
    {x: 0, y: 0, gravity: 0, velocity: 0},
    // 人際 socialNum
    {x: 0, y: 0, gravity: 0, velocity: 0},
    {x: 0, y: 0, gravity: 0, velocity: 0}, 
    {x: 0, y: 0, gravity: 0, velocity: 0}
];

// 為了加分指令 (command_name：用於生成上下左右鍵所需 / command_command：用亂數生成多個指令鍵值 / commandInput：用於辨識是否可以開始輸入指令 / command_index：用於辨識現在正確的鍵值)
const command_name = ['up', 'down', 'left', 'right'];
var command_command = [];
var commandInput = false;
var command_index = 0;

// 使用者輸入 (input_id：使用者輸入鍵值 / input_now：用於辨別是否正在輸入 / input_correct：用於計算正確鍵入數量)
var input_id = -1;
var input_now = false;
// var input_input = false;
var input_correct = 0;

const gameBonus = {
    key: 'gameBonus',
    preload: function(){
        bonusStart = false;
        bonusStop = false;
        bonusOver = false;

        document.getElementById('bonusTimer').style.display = 'block';

        // 載入背景圖片
        this.load.image('gamebg2', 'image/Background/gamebg.jpg');
        // 載入角色圖片
        this.load.image('player1', 'image/Character/player1');
        this.load.image('player2', 'image/Character/player2');
        this.load.image('player3', 'image/Character/player3');
        this.load.image('player4', 'image/Character/player4');
        this.load.image('player5', 'image/Character/player5');
        this.load.image('player6', 'image/Character/player6');
        // 載入加分豆圖片
        this.load.image('lazyB', 'image/Bonus/lazy.png');
        this.load.image('pressureB', 'image/Bonus/pressure.png');
        this.load.image('socialB', 'image/Bonus/social.png');
        this.load.image('strengthB', 'image/Bonus/strength.png');
        // GM 對話框消失 開啟倒數計時器
        document.getElementById('gmChatCard').style.display = 'none';
        document.getElementById('bonusTimer').style.display = 'block';
        
        // 載入指令上下左右鍵圖示 Default：還沒按 / Correct：正確 / Wrong：錯誤
        this.load.image('upDefault', 'image/Bonus/Command/Command/up-arrow default.png');
        this.load.image('downDefault', 'image/Bonus/Command/Command/down-arrow default.png');
        this.load.image('leftDefault', 'image/Bonus/Command/Command/left-arrow default.png');
        this.load.image('rightDefault', 'image/Bonus/Command/Command/right-arrow default.png');

        this.load.image('upCorrect', 'image/Bonus/Command/Command/up-arrow correct.png');
        this.load.image('downCorrect', 'image/Bonus/Command/Command/down-arrow correct.png');
        this.load.image('leftCorrect', 'image/Bonus/Command/Command/left-arrow correct.png');
        this.load.image('rightCorrect', 'image/Bonus/Command/Command/right-arrow correct.png');

        this.load.image('upFocus', 'image/Bonus/Command/Command/up-arrow focus.png');
        this.load.image('downFocus', 'image/Bonus/Command/Command/down-arrow focus.png');
        this.load.image('leftFocus', 'image/Bonus/Command/Command/left-arrow focus.png');
        this.load.image('rightFocus', 'image/Bonus/Command/Command/right-arrow focus.png');


        // 遊戲開始的倒數計時
        startInt = 3;

        // bonus 時間共 10s，因為還有遊戲倒數 3 秒，因此為 13 秒，只是前 3 秒改變不顯示出來
        timeInt = 13;
    },
    create: function(){

        gamebg = this.physics.add.sprite(cw/2, ch/2, 'gamebg2');
        
        player = this.physics.add.sprite(cw/2, ch/2, player_name[player_select]);
        player.setScale(playerScale);

        bonusGroup = this.physics.add.group();
        bonusGroup.enableBody = true;

        for(var i = 0 ; i < 3 ; i++)
        {
            for(var j = 0 ; j < 4 ; j++)
            {
                tempX = getRandom(cw/2, 1);
                tempY = getRandom(ch/2, 1);
                tempGravity = getRandom(1, 500);
                tempVelocityX = getRandom(400, -200);

                bonus_xy[i * 4 + j].x = tempX;
                bonus_xy[i * 4 + j].y = tempY;
                bonus_xy[i * 4 + j].gravity = tempGravity;
                bonus_xy[i * 4 + j].velocity = tempVelocityX;

                bonusGroup.create(bonus_xy[i * 4 + j].x, bonus_xy[i * 4 + j].y, bonus_name[j]);
            }
        }
        bonusGroupChild = bonusGroup.getChildren();
        for(var i = 0 ; i < bonusGroupChild.length ; i++)
            bonusGroupChild[i].setScale(beansScale);
        
        for(var i = 0 ; i < 12 ; i++)
            rebounce[i] = 'false';

        this.physics.add.overlap(player, bonusGroup, addStatusValue, null, this);
        
        function addStatusValue(player, bonus)
        {
            if(abs(player.x, bonus.x) < 20 && abs(player.y, bonus.y) < 20)
            {

                if(bonus.texture.key == 'lazyB')        // 惰性
                    addKey = 0;
                if(bonus.texture.key == 'pressureB')    // 壓力
                    addKey = 1;
                if(bonus.texture.key == 'socialB')      // 人際
                    addKey = 2;
                if(bonus.texture.key == 'strengthB')    // 體力
                    addKey = 3;

                bonus.disableBody(true, true);
                bonusStart = false;
                bonusStop = true;
            }
        }

        // 遊戲說明及倒數遮罩
        mask = this.add.graphics()
        mask.fillStyle(0x000000, 0.5).fillRect(0, 0, cw, ch);
        startdecrText = this.add.text(cw/2-525, ch/2 - 50, '有 10 秒鐘的時間，請按左右鍵控制人物吃到加分豆，於完成指令後方可得分。', {color: "#FFFFFF", fontSize:'30px'});
        
        // 倒數 3 秒
        startTimerText = this.add.text(cw/2, ch/2, '3', {color: "#FFFFFF", fontSize:'45px'})
        var StartTImer = setInterval(() => {
            startInt = startInt - 1;
            startTimerText.setText(startInt.toString());

            // 倒數計時完畢，遊戲開始
            if(startInt <= 0)
            {
                bonusStart = true;
                startdecrText.destroy();
                startTimerText.destroy();
                clearInterval(StartTImer);
            }
        }, 1000);

        //  bonus 倒數 10 秒
        var gbonusTimer = setInterval(() => {
            timeInt = timeInt - 1;
            if(timeInt <= 10)
            {
                document.getElementById('bonusBar').innerHTML = timeInt.toString() + " 秒";
                document.getElementById('bonusBar').style.width = percentN[timeInt];
            }
            // 倒數計時結束
            if(timeInt <= 0)
            {
                bonusOver = true;
                bonusStop = true;
                bonusStart = false;
                clearInterval(gbonusTimer);
            }
        }, 1000);
 
    },
    update: function(){

        if(bonusStart && !bonusOver)
        {
            // 清除遮罩
            mask.clear();
            
            player.body.gravity.y = 200;
            player.setCollideWorldBounds(true);        
            player.setBounce(1); //設定彈跳值

            for(var i = 0 ; i < bonusGroupChild.length ; i++)
            {
                bonusGroupChild[i].body.gravity.y = bonus_xy[i].gravity;
                if(bonusGroupChild[i].x <= 70 || bonusGroupChild[i].x >= cw - 70)
                {
                    if(rebounce[i] == 'false')
                    {   
                        bonus_xy[i].velocity = bonus_xy[i].velocity * -1;
                        bonusGroupChild[i].setVelocityX(bonus_xy[i].velocity);
                        rebounce[i] = 'true';
                    }
                }
                else
                {
                    bonusGroupChild[i].setVelocityX(bonus_xy[i].velocity);
                    rebounce[i] = 'false';
                }
                bonusGroupChild[i].setCollideWorldBounds(true);
                bonusGroupChild[i].setBounce(1);
            }
       
            let keyboard = this.input.keyboard.createCursorKeys();
        
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

        // 計時到，畫面靜止 || 玩家吃到加分豆，先完成任務才加分
        if(bonusStop && !bonusOver)
        {
            // 所有加分豆與玩家靜止
            player.body.gravity.y = 0;
            player.setVelocityX(0);
            player.setVelocityY(0);
            
            for(var i = 0 ; i < bonusGroupChild.length ; i++)
            {
                bonusGroupChild[i].body.gravity.y = 0;
                bonusGroupChild[i].setVelocityX(0);
                bonusGroupChild[i].setVelocityY(0);
            }
            
            // 蓋上遮罩
            if(maskCounter == 0)
            {
                mask.fillStyle(0xFFFFFF, 0.5).fillRect(0, 0, cw, ch);
                maskCounter = maskCounter + 1;
                
                commandGroup = this.physics.add.group();
                commandGroup.enableBody = true;
                
                // 產生指令數量
                commandNum = getRandom(5, 3);
                command_index = commandNum - 1;
                
                // 依據指令數量隨機產生指令 id 1:up 2:down 3:left 4:right
                for(var i = 0 ; i < commandNum ; i++)
                {
                    commandid = getRandom(3,0);
                    command_command.push(commandid);
                    nametmp = command_name[commandid] + 'Default';
                    commandGroup.create(cw/2 + (commandNum*50) - i*110, ch/2, nametmp);
                }
                
                commandGroupChild = commandGroup.getChildren();
                for(var i = 0 ; i < commandGroupChild.length ; i++)
                    commandGroupChild[i].setScale(0.2);
                
                commandInput = true;
            }
            
            if(commandInput)
            {
                let keyboard = this.input.keyboard.createCursorKeys();
                
                // command 0：up 1：down 2：left 3：right
                if(keyboard.right.isDown)
                {
                    if(!input_now)
                    {
                        input_id = 3;
                        input_now = true;
                    }   
                }
                else if(keyboard.left.isDown)
                {
                    if(!input_now)
                    {
                        input_id = 2;
                        input_now = true;
                    }
                }
                else if(keyboard.up.isDown)
                {
                    if(!input_now)
                    {
                        input_id = 0;
                        input_now = true;
                    }
                }
                else if(keyboard.down.isDown)
                {
                    if(!input_now)
                    {
                        input_id = 1;
                        input_now = true;
                    }
                }
                else
                    input_now = false;

                if(input_id == command_command[command_index])
                {
                    input_correct = input_correct + 1;
                    tmpname = command_name[command_command[command_index]] + 'Correct';
                    commandGroupChild[command_index].setTexture(tmpname);
                    command_index = command_index - 1;
                    input_id = -1;
                }
                else if(input_id != command_command[command_index] && command_index != -1)
                {
                    tmpname = command_name[command_command[command_index]] + 'Focus';
                    commandGroupChild[command_index].setTexture(tmpname);
                    input_id = -1;
                }
            }
            
            // 指令全數回答正確
            if(input_correct == commandNum && commandInput)
            {
                commandInput = false;

                if(addKey == 0) // 惰性：黃色鳥
                {
                    lazyNum = lazyNum - 20;
                    // console.log(lazyNum);
                    // 數值可能被扣到變負的導致 progress 沒有變化，需要注意！
                    if(lazyNum < 0)
                        lazyNum = 0;
                    document.getElementById('lazyProgress').style.width = ((lazyNum / lazyMAX) * 100).toString() + "%";
                    document.getElementById('lazyProgress').innerHTML = lazyNum.toString();
                }
                if(addKey == 1) // 壓力：彩色透明鳥
                {
                    pressureNum = pressureNum - 20;
                    // 數值可能被扣到變負的導致 progress 沒有變化，需要注意！
                    if(pressureNum < 0)
                        pressureNum = 0;
                    // console.log(pressureNum);
                    document.getElementById('pressureProgress').style.width = ((pressureNum / pressureMAX) * 100).toString() + "%";
                    document.getElementById('pressureProgress').innerHTML = pressureNum.toString();
                }
                if(addKey == 2) // 人際：黑色鳥
                {
                    socialNum = socialNum + 20;
                    // console.log(socialNum);
                    document.getElementById('socialProgress').style.width = ((socialNum / strengthMAX) * 100).toString() + "%";
                    document.getElementById('socialProgress').innerHTML = socialNum.toString();
                }
                if(addKey == 3) // 體力：透明黑鳥
                {
                    strengthNum = strengthNum + 20;
                    // console.log(strengthNum);
                    document.getElementById('strengthProgress').style.width = ((strengthNum / socialMAX) * 100).toString() + "%";
                    document.getElementById('strengthProgress').innerHTML = strengthNum.toString();
                }

                // 遮罩計數器歸零並將遮罩清空
                maskCounter = 0;
                mask.clear();

                // 指令 sprite 存放 group、指令 id 存放 array、指令正確數清空
                commandGroup.clear(true, true);
                command_command.length = 0;
                input_correct = 0;

                bonusStop = false;
                bonusStart = true;

            }
        }

        // bonus 遊戲結束
        if(bonusOver)
        {
            // 倒數計時器重新計時
            startInt = 3;
            timeInt = 13;
            document.getElementById('bonusBar').innerHTML = " 10 秒";
            document.getElementById('bonusBar').style.width = percentN[10];

            // 遮罩計數器歸零並將遮罩清空
            maskCounter = 0;
            mask.clear();

            // 指令 sprite 存放 group、指令 id 存放 array、指令正確數清空
            commandGroup.clear(true, true);
            command_command.length = 0;
            input_correct = 0;

            bonusStop = false;
            bonusStart = true;

            this.scene.start('gameSubject');
        }
    }
}
