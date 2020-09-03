
// 存放使用者所選擇過的紀錄 (class：類別-> 課業學科 or 課外活動 / get：獲得一份... / do：類別下的子類別 / option：針對子類別做的選擇)
var player_record = [
    {id:0, class:'subject', get:'', do: 'Langugage' , option: "將課文內容吸收後，用自己的語言寫下筆記，並複習完成後的作業，對課文有更深刻的理解與記憶。"},
    {id:1, class:'subject', get:'', do: 'Math' , option: "解題課本例題與習題題目，達成學校最低程度的理解。"},
    {id:2, class:'subject', get:'', do: 'Social' , option: "閱讀課外考古文學、詳細戰爭歷史、世界地圖、經濟學書，可以應用與解釋到現實生活與課文內容。"},
    {id:3, class:'activity', get:'', do: 'Club' , option: "在社團時間，認真投入且遇到困難或錯誤時會自我修正和積極改善。"},
    {id:4, class:'activity', get:'', do: 'SchoolTeam' , option: "對此項目充分理解(如:觀看職業比賽影片、學長姐經驗)、抱有高度熱忱與決心，與隊友們彼此討論、合作，並在固定訓練時間外，在基礎訓練上進行改良或創新。"},
    {id:5, class:'activity', get:'', do: 'ScienceFair' , option: "跟隨科展的要求，遵循指導老師和同組員的指示執行實作工作。"},
]


const class_name = ['課業學科', '課外活動'];
const class_nameen = ['subject', 'activity'];

// 用來針對 player 和 record 產生 hover 時所使用 ( recordGroup_do：用於存放產生紀錄的 do name / recordGroup_optionOB：用於存放紀錄的文字物件 )
// var recordGroup_do = new Array(40);
var recordGroup_classOB = new Array(40);
var recordGroup_getOB = new Array(40);
var recordGroup_doOB = new Array(40);
var recordGroup_optionOB = new Array(40);
var recordNum = 0;

// recordIndex：用來搜尋 array 使用的 index 數，-1 代表清空 hover 事件 / recordHover：用於判斷是否有觸發 hover 事件
var recordIndex = -1;
var recordHover = false;

// 用於選取上傳科目 ( recordChosen：便是此紀錄使否被選取 / choose：是否執行存取動作 / cancel：是否執行取消動作)
var recordChosen = new Array(40);
var choose = false;
var cancel = false;
var recordselectNum = 0;
var recordselectId = [];

var uploadEnter;

function strNEWLINE()
{
    for(var i = 0 ; i < player_record.length ; i++)
    {
        
    }
}

const recordUpload = {
    key: 'recordUpload',
    preload: function(){
	
	// 隱藏玩家能力數值卡
	document.getElementById('playerStatusCard').style.visibility = 'hidden';
	    
	// 顯示 gm 聊天卡
	document.getElementById('gmChatCard').style.display = 'block';
	document.getElementById('gmChatCard').style.top = '5%';
	document.getElementById('gmChatCard').style.left = '5%';
	document.getElementById('gmChatCard').style.width = '35%';
	document.getElementById('gmChatCard').style.height = '15%';
	document.getElementById('gmChatCardText').innerHTML = "可按下空白鍵來選擇多個項目上傳做為學習歷程檔案的作品。<br> 若選擇完畢請按下 Enter 鍵上傳。";
	
	// 顯示 使用者選擇的紀錄豆詳細記錄
	document.getElementById('uploadDetailCard').style.visibility = 'visible';
	    
	    
	// 載入背景圖片
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
	    
	// 3 個課外活動
	this.load.image('Club', 'image/Activity/Club.png');
	this.load.image('SchoolTeam', 'image/Activity/SchoolTem.png');
	this.load.image('ScienceFair', 'image/Activity/ScienceFair.png');
	    
	
	 
    },
    create: function(){
	    
	uploadEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	
	// 生成畫面背景
        bg1 = this.add.sprite(cw/2, ch/2, 'bg1');
        bg1.setScale(4);

	mask = this.add.graphics()
        mask.fillStyle(0x000000, 0.5).fillRect(0, 0, cw, ch);
	// 生成 課業學科遮罩
//         maskSubject = this.add.graphics()
//         maskSubject.fillStyle(0x000000, 0.5).fillRect(5, 0, cw/2-10, ch);
	    
	// 生成 課外活動遮罩
//         maskActivity = this.add.graphics()
//         maskActivity.fillStyle(0x000000, 0.5).fillRect(cw/2+5, 0, cw/2-10, ch);
	    
	    
	// 生成玩家
	player = this.physics.add.sprite(cw/2, ch/4, player_name[player_select]);
	player.setScale(playerScale);

	shadowGroup = this.physics.add.group();

	recordGroup = this.physics.add.group();
	recordGroupChild = recordGroup.getChildren();
	// 生成 課業學科紀錄豆
	for(var i = 0 ; i < player_record.length ; i++)
	{
	    // 生成紀錄豆子
	    recordGroup.create(cw/5 - 200 + 520*(Math.floor(i/3)), ch/4 + 20 + 180*(Math.floor(i%3)), player_record[i].do);
            
            if(player_record[i].class == 'subject')
	    {
		recordGroupChild[i].setScale(beansScale);
		tempDoText = this.add.text(recordGroupChild[i].x + 50, recordGroupChild[i].y - 25, subject_name[subject_nameen.indexOf(player_record[i].do)], {color: "#FFFF93", fontSize:'20px', lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true }});

	    }
            
	    if(player_record[i].class == 'activity')
	    {
		recordGroupChild[i].setScale(0.15);
		tempDoText = this.add.text(recordGroupChild[i].x + 50, recordGroupChild[i].y - 25, activity_name[activity_nameen.indexOf(player_record[i].do)], {color: "#FFFF93", fontSize:'20px', lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true }});

	    }

	    recordGroup_doOB[i] = tempDoText;
	    recordGroup_doOB[i].alpha = 0;
		
		
	    // 開啟 data 設置權限，並為每個 sprite 設置唯一的 id
	    recordGroupChild[i].setDataEnabled();
            recordGroupChild[i].setData('id', player_record[i].id);
	
	    // 加入記錄說明文字物件，並將其存放進入陣列裡面且文字 alpha 參數設為零，成為透明文字。linespacing 為行距
	    tempOptionText = this.add.text(recordGroupChild[i].x + 50, recordGroupChild[i].y + 5, player_record[i].option, {color: "#f7f7f7", fontSize:'20px', lineSpacing: 3, wordWrap: { width: 400, useAdvancedWrap: true }});
	    recordGroup_optionOB[i] = tempOptionText;
	    recordGroup_optionOB[i].alpha = 0;
		
	    tempClassText = this.add.text(recordGroupChild[i].x + 50, recordGroupChild[i].y - 45, class_name[class_nameen.indexOf(player_record[i].class)], {color: "#FFFF93", fontSize:'20px', lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true }});
	    recordGroup_classOB[i] = tempClassText;
	    recordGroup_classOB[i].alpha = 0;
		
	    // 將所有 record 中的 subject 加入進入陣列，以便搜尋 index 使用
// 	    recordGroup_do[i] = player_record[i].do;
	    recordNum = recordNum + 1;
		
	    // 將所有紀錄設置為還未被選取
            recordChosen[i] = false;
	}
	
	console.log(recordGroupChild);
	
	    
	
	shadowGroupChild = shadowGroup.getChildren();
	for(var i = 0 ; i < player_record.length ; i++)
	{
	    // 生成豆子的邊框

	    shadowGroup.create(cw/5 - 200 + 520*(Math.floor(i/3)), ch/4 + 20 + 180*(Math.floor(i%3)), player_record[i].do);
            shadowGroupChild[i].setScale(beansScale);
	    if(player_record[i].class == 'activity')
	    {
		  shadowGroupChild[i].setScale(0.15);
	    }
    	    shadowGroupChild[i].tint = "0x00ff00";
    	    shadowGroupChild[i].alpha = 0.5;
	    shadowGroupChild[i].setVisible(false);
	}

	    
	    
	// 類別標題
// 	subjectTitle = this.add.text(cw/2 - cw/4, 20, '課業學科', {color: "#FFEE48", fontSize:'35px'});
// 	activityTitle = this.add.text(cw/2 + cw/4, 20, '課外活動', {color: "#FFEE48", fontSize:'35px'});
	    
	    
	    
	this.physics.add.overlap(player, recordGroupChild, showOptionText, null, this);
	    
	function showOptionText(player, record)
	{
            if(abs(player.x, record.x) < 15 && abs(player.y, record.y) < 20)
            {
		recordHover = true;
		console.log(record.getData('id'));
		
//                 recordIndex = recordGroup_do.indexOf(record.texture.key);
		recordIndex = record.getData('id');
		recordGroup_optionOB[recordIndex].alpha = 1;
		recordGroup_classOB[recordIndex].alpha = 1;
		recordGroup_doOB[recordIndex].alpha = 1;
		    
		// 選擇上傳 recordIndex 的該項紀錄
		if(choose && !recordChosen[recordIndex])
		{
		    recordChosen[recordIndex] = true;
		    recordselectNum = recordselectNum + 1;
		    recordselectId.push(recordIndex);
		    shadowGroupChild[recordIndex].setVisible(true);
		    document.getElementById('uploadList' + recordselectNum.toString()).style.visibility = 'visible';
                    document.getElementById('record_class' + recordselectNum.toString()).innerHTML = class_name[class_nameen.indexOf(player_record[recordIndex].class)];
		    if(player_record[recordIndex].class == 'subject')
		        document.getElementById('record_do' + recordselectNum.toString()).innerHTML = subject_name[subject_nameen.indexOf(player_record[recordIndex].do)];
                    if(player_record[recordIndex].class == 'activity')
			document.getElementById('record_do' + recordselectNum.toString()).innerHTML = activity_name[activity_nameen.indexOf(player_record[recordIndex].do)];
		    document.getElementById('record_option' + recordselectNum.toString()).innerHTML = player_record[recordIndex].option;
		}
		// 取消一個後，後面的遞補上來
		if(cancel && recordChosen[recordIndex])
		{
	            recordChosen[recordIndex] = false;
		    
		    shadowGroupChild[recordIndex].setVisible(false);
		    // 找到現在要刪除的目前是第幾個
		    tmpIndex = recordselectId.indexOf(recordIndex);
			
		    for(var i = tmpIndex+1 ; i < recordselectNum-1 ; i++)
		    {
			console.log(document.getElementById('record_class' + (i+1).toString()).innerHTML);
		        document.getElementById('record_class' + i.toString()).innerHTML = document.getElementById('record_class' + (i+1).toString()).innerHTML;
		        document.getElementById('record_do' + i.toString()).innerHTML = document.getElementById('record_do' + (i+1).toString()).innerHTML;
           		document.getElementById('record_option' + i.toString()).innerHTML = document.getElementById('record_option' + (i+1).toString()).innerHTML;
		    }
                   
		    document.getElementById('record_class' + recordselectNum.toString()).innerHTML = "";
		    document.getElementById('record_do' + recordselectNum.toString()).innerHTML = "";
           	    document.getElementById('record_option' + recordselectNum.toString()).innerHTML = "";
		    document.getElementById('uploadList' + (recordselectNum+1).toString()).style.visibility = 'hidden';
		    recordselectNum = recordselectNum - 1;
		}
            }
	    else
		 recordHover = false;
	}


    },
    update: function(){
	// 沒有在 hover 的時候，所有文字設置為透明
	if(!recordHover && recordIndex != -1)
	{
            for(var i = 0 ; i < recordNum ; i++)
	    {
                recordGroup_optionOB[i].alpha = 0;
		recordGroup_classOB[i].alpha = 0;
		recordGroup_doOB[i].alpha = 0;
	    }
	}
	
	
	let keyboard = this.input.keyboard.createCursorKeys();
	// 角色左右移動
        if(keyboard.right.isDown)
            player.setVelocityX(300);
        else if(keyboard.left.isDown)
            player.setVelocityX(-300);
        else
            player.setVelocityX(0);
	// 角色上下移動
	if(keyboard.down.isDown)
            player.setVelocityY(300);
        else if(keyboard.up.isDown)
            player.setVelocityY(-300);
        else
            player.setVelocityY(0);
	    
	    
	// 選擇上傳
	if(keyboard.space.isDown)
	    choose = true;
	else
	    choose = false;
	    
	// 取消上傳
	if(keyboard.shift.isDown)
            cancel = true;
	else
            cancel = false;

	// 若按下 Enter 鍵，就代表上傳完畢
	if(uploadEnter.isDown) {
   		console.log('上傳完畢');
	}

    }
}
