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
