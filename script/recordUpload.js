
// 存放使用者所選擇過的紀錄
var player_record = [
    {subject: 'Langugage' , do: "將課文內容吸收後，用自己的語\n言寫下筆記，\n並複習完成後的作業，對課文有更深刻\n的理解與記憶。"},
    {subject: 'Math' , do: "解題課本例題與習題題目，達成學校最低程度的理解。"},
    {subject: 'Social' , do: "閱讀課外考古文學、詳細戰爭歷史、世界地圖、經濟學書，可以應用與解釋到現實生活與課文內容。"},
]

// 用來針對 player 和 record 產生 hover 時所使用 ( recordGroup_subject：用於存放產生紀錄的 subject name / recordGroup_doOB：用於存放紀錄的文字物件 )
var recordGroup_subject = new Array(40);
var recordGroup_doOB = new Array(40);

// recordIndex：用來搜尋 array 使用的 index 數，-1 代表清空 hover 事件 / recordHover：用於判斷是否有觸發 hover 事件
var recordIndex = -1;
var recordHover = false;

const recordUpload = {
    key: 'recordUpload',
    preload: function(){
        this.load.image('bg1', 'image/Background/jungle-clipart-background-6.jpg');
	    
	// 載入玩家圖片
        this.load.image('player1', 'image/Character/player1');
        this.load.image('player2', 'image/Character/player2');
        this.load.image('player3', 'image/Character/player3');
        this.load.image('player4', 'image/Character/player4');
        this.load.image('player5', 'image/Character/player5');
        this.load.image('player6', 'image/Character/player6');
	    
	// 8 個課業學科
        this.load.image('Langugage', 'image/18College/13.png');
        this.load.image('Science', 'image/18College/11.png');
        this.load.image('Integrative', 'image/18College/7.png');
        this.load.image('Math', 'image/18College/3.png');
        this.load.image('Technology', 'image/18College/8.png');
        this.load.image('Health', 'image/18College/4.png');
        this.load.image('Social', 'image/18College/12.png');
        this.load.image('Art', 'image/18College/9.png');
        
    },
    create: function(){
	    
        bg1 = this.add.sprite(cw/2, ch/2, 'bg1');
        bg1.setScale(4);
	    
	player = this.physics.add.sprite(cw/2, ch/4, player_name[player_select]);
	player.setScale(playerScale);
	
	recordGroup = this.physics.add.group();
	recordGroupChild = recordGroup.getChildren();
	// 用來存放紀錄說明文字物件的陣列
	
	    
	    
	// 生成 課業學科遮罩
	maskSubject = this.add.graphics()
        maskSubject.fillStyle(0x000000, 0.5).fillRect(5, 0, cw/2-10, ch);
	// 生成 課業學科紀錄豆
	for(var i = 0 ; i < player_record.length ; i++)
	{
	    recordGroup.create(cw/4, ch/4 + 200*i, player_record[i].subject);
            recordGroupChild[i].setScale(0.5);
	    // 加入記錄說明文字物件，並將其存放進入陣列裡面且文字 alpha 參數設為零，成為透明文字
	    tempText = this.add.text(recordGroupChild[i].x, recordGroupChild[i].y, player_record[i].do, {color: "#FFFFFF", fontSize:'20px'});
	    recordGroup_doOB[i] = tempText;
	    recordGroup_doOB[i].alpha = 0;
		
	    // 將所有 record 中的 subject 加入進入陣列，以便搜尋 index 使用
	    recordGroup_subject[i] = player_record[i].subject;
		
	}
	
	
	// 生成 課外活動遮罩
	maskActivity = this.add.graphics()
        maskActivity.fillStyle(0x000000, 0.5).fillRect(cw/2+5, 0, cw/2-10, ch);
	// 生成 課外活動紀錄豆 
	    
	doText = this.add.text(20, 20, 'TTTTTT', {color: "#FFFFFF", fontSize:'20px'});
	this.physics.add.overlap(player, recordGroupChild, showDoText, null, this);
	    
	function showDoText(player, record)
	{
            if(abs(player.x, record.x) < 10 && abs(player.y, record.y) < 10)
            {
		recordHover = true;
                console.log("hover");
		
		doText.setText('Test');
		doText.alpha = 1;
                recordIndex = recordGroup_subject.indexOf(record.texture.key);
		recordGroup_doOB[recordIndex].alpha = 1;
            }
	    else
            {
		 recordHover = false;
            }
	}


    },
    update: function(){
	// 沒有在 hover 的時候，該字透明
	if(!recordHover)
	{
	    doText.alpha = 0;
// 	    recordGroup_doOB[recordIndex].alpha = 0;
//             recordIndex = -1;
            
	}
	    
	let keyboard = this.input.keyboard.createCursorKeys();
	// 角色左右移動
        if(keyboard.right.isDown)
            player.setVelocityX(300);
        else if(keyboard.left.isDown)
            player.setVelocityX(-300);
        else
            player.setVelocityX(0);
	
	if(keyboard.up.isDown)
            player.setVelocityY(300);
        else if(keyboard.down.isDown)
            player.setVelocityY(-300);
        else
            player.setVelocityY(0);

    }
}
