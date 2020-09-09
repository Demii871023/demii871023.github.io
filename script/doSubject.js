const subject_option = [
    // 語文
    {
        A:"1. 在非課上時間看課外關於詩文、作家的讀物或國外雜誌、新聞報導，更了解一段課文之中的背景與文化脈絡。",
        B:"2. 吸收並能表達課文內容之外，複習已完成的作業並預習之後上課的課文內容，可以連貫超前進度與過去學習之間的內容。",
        C:"3. 將課文內容吸收後，用自己的語言寫下筆記，並複習完成後的作業，對課文有更深刻的理解與記憶。",
        D:"4. 背誦課文內容，完成最低限度的上課。"
    },
    // 自然科學
    {
        A:"1. 藉由學習到的原理，延伸閱讀到科普類型書籍、雜誌，或科學實驗範例，並能解讀其中的自然科學原理為何。",
        B:"2. 複習學過的內容，並自主預習，由連貫基本定理延伸到預習內容，理解兩者之間關係，對科學原理有更深入的理解。",
        C:"3. 了解自然科學基本定理、公式的原理，以及原理可能發生的情境原因為何，理解科學現象的發生與過程。",
        D:"4. 根據學校進度，背誦基本課文內容，完成學校課程最低限度的要求。"
    },
    // 綜合活動
    {
        A:"1. 使用生涯系統，配合相關領域的書籍，對自己的興趣進行進一步的深入探索與規劃。 ",
        B:"2. 自行上網搜尋並使用生涯系統，來提前規劃自己的生涯與探索有興趣的科系。",
        C:"3. 主動詢問輔導老師，了解自己適合什麼與可以選擇什麼。",
        D:"4. 跟隨班上輔導課程的要求，達成最低限度的要求。"
    },
    // 數學
    {
        A:"1. 整合學習過的內容，並嘗試使用兩種以上不同單元的公式、算法解答同一題，可以將各種不同章節的數學原理融會貫通。",
        B:"2. 自主學習超前學校上課進度，課外題庫進行預習與練習，嘗試以基本算法推算公式，並算出正確答案。",
        C:"3. 複習寫過的題目，嘗試理解每一題最佳解使用此公式或算法的原因。",
        D:"4. 解題課本例題與習題題目，達成學校最低程度的理解。"
    },
    // 科技
    {
        A:"1. 理解資訊作業或程式語言的應用與延伸範疇，並付諸實現使作業成為真正有實用價值的作品。",
        B:"2. 透過不同渠道(網路、書本和老師)進一步理解資訊知識，理解作業能應用與延伸的範疇，以及資訊科技背後的原理來源。",
        C:"3. 蒐集網路資料或閱讀資料增加或改善在自己的作業上，在現有的基礎上改編或增進。",
        D:"4. 跟著課上操作，完成最低限度的課業要求。"
    },
    // 健康與體育
    {
        A:"1. 參加校內競賽或班級競賽，與隊友進行團練，磨練與他人的團隊意識與自己的運動能力。",
        B:"2. 跟朋友揪團進行體育比賽，彼此競爭與合作，熟悉正式的比賽模式、提升運動能力。",
        C:"3. 主動練習體育課堂考試，想在體育課上拿到高分，以熟悉運動專項本身。",
        D:"4. 體育課上課，達成體育課期末考課程最低要求。"
    },
    // 社會
    {
        A:"1. 閱讀課外考古文學、詳細戰爭歷史、世界地圖、經濟學書，可以應用與解釋到現實生活與課文內容。",
        B:"2. 完成課上所需之外，預習未來與社會科目相關的讀物，將過去所學的理解並連貫預習的內容。",
        C:"3. 背讀課文內容，應對考試內容，理解基本架構與內容。",
        D:"4. 記住大致重大事件發生年代，知道最低限度的社會知識。"
    },
    // 藝術
    {
        A:"1. 利用額外時間，延伸課堂上的美術作品，購買創作新的藝術所需之材料，融入自己的理念、想法創作屬於自己的的作品。",
        B:"2. 精雕細琢並改善自己在課堂上完成的作品，以達成自己所能滿意的完成品。",
        C:"3. 看網路教學製作創意作品，不只以上課內容為主，還會自行增加細節或技巧。",
        D:"4. 完成課上要求的美術作品，達到最低限度的要求。"
    },
];


var optionView = false;
var challengeStart = false;
var challengeTime = 30;
const challengeScale = 0.2;
var timerStart = false;
var challenge_xy = [
	// bomb
	{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
	{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
	{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
	// lighting
	{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
];

var challenge_name = ['lighting', 'bomb'];
const challengeNum = 10;
var canExit = false;
var gameExit = false;
var restart = false;

// 掉落速度，依據級距加快
// var downSpeed = 30;


// 繪製水動畫
var water;
var waterStroke;
var maskShape;
var mask;
var numRotatingRoundedRects = 35;
var rotatingRoundedRects = [];
var rotatingRoundedRectsContainer;

var rotatingRoundedRects2 = [];
var rotatingRoundedRectsContainer2;

var waterHigh1 = 0.4;
var waterHigh2 = 0.2;

// 海水高度 -> 對應到 #water css 中的 top 百分比
var waterHigh = 98;
// 選項高度 -> 用來與海水高度比較，若海水高度超過選項高度就完成
var optionAHigh, optionBHigh, optionCHigh, optionDHigh, playerOptionHight;
// 依據 option_select 控制物品掉落速度
var downSpeed = [2000, 1000, 400, 50];

// 玩家選擇的選項 ( option_select：使用者所選擇 / optionStr：使用者的選擇句子 / optionID：修改 HTML 所使用 / optionInput：用於辨識現在是否在挑選選項)
var option_select = 0;
var optionID = ['optionAGroup', 'optionBGroup', 'optionCGroup', 'optionDGroup'];
var optionStr = "";
var optionInput = false;


// var player_record = [
// ]



const doSubject = {
    key: 'doSubject',
    preload: function(){
        // gmChatCard Setup
        document.getElementById('gmChatCard').style.display = 'block';
        document.getElementById('gmChatCard').style.width = '35%';
        document.getElementById('gmChatCard').style.height = '110px';
        document.getElementById('gmChatCardText').innerHTML = "今天上完" + subject_name[subject_select] + "的課程，你會如何進行課後安排呢？";
	    
	    
	document.getElementById('experienceTimeline').style.visibility = 'hidden';
        
        // 載入背景圖片
        this.load.image('bg2', 'image/Background/jungle-background-clipart.jpg');
        
        // 載入角色圖片
        this.load.image('player1', 'image/Character/player1.png');
        this.load.image('player2', 'image/Character/player2.png');
        this.load.image('player3', 'image/Character/player3.png');
        this.load.image('player4', 'image/Character/player4.png');
        this.load.image('player5', 'image/Character/player5.png');
        this.load.image('player6', 'image/Character/player6.png');
	    
        // 載入挑戰墜落物
        this.load.image('bomb', 'image/Challenge/bomb.png');
        this.load.image('lighting', 'image/Challenge/lighting.png');
	    
	// 初始化判斷參數
	gameExit = false;
	
	    
    },
    create: function(){
        
        // 載入背景圖片
        this.bg2 = this.add.sprite(cw/2,ch/2, 'bg2');
        
        // 蓋上遮罩
        mask = this.add.graphics()
        mask.fillStyle(0x000000, 0.7).fillRect(0, 0, cw, ch);
        
        // 新增該學科選項
	document.getElementById('challengeText').style.visibility = "visible";
	document.getElementById('optionAText').innerHTML = subject_option[subject_select].A;
	document.getElementById('optionBText').innerHTML = subject_option[subject_select].B;
	document.getElementById('optionCText').innerHTML = subject_option[subject_select].C;
	document.getElementById('optionDText').innerHTML = subject_option[subject_select].D;
	    
	    
//         optionAText = this.add.text(cw/10, ch/2-60, subject_option[subject_select].A, {color: "#FFFFFF", fontSize:'20px'});
//         optionBText = this.add.text(cw/10, ch/2-20, subject_option[subject_select].B, {color: "#FFFFFF", fontSize:'20px'});
//         optionCText = this.add.text(cw/10, ch/2+20, subject_option[subject_select].C, {color: "#FFFFFF", fontSize:'20px'});
//         optionDText = this.add.text(cw/10, ch/2+60, subject_option[subject_select].D, {color: "#FFFFFF", fontSize:'20px'});
        
        // 新增玩家
        player = this.physics.add.sprite(cw/2, ch - 50, player_name[player_select]);
        player.setScale(playerScale);
        
	
        // 新增墜落物

	challengeGroup = this.physics.add.group();
        challengeGroupChild = challengeGroup.getChildren();
        
	this.physics.add.overlap(player, challengeGroupChild, waterUp, null, this);
	
	function waterUp(player, challenge)
        {
	    challenge.disableBody(true, true);
            if(challenge.texture.key == 'bomb')
                waterHigh = waterHigh + 5;
            if(challenge.texture.key == 'lighting')
                waterHigh = waterHigh - 5;
            document.getElementById('water').style.top = waterHigh.toString() + "%";
//             downSpeed = optionLevel * 100;
//             for(var i = 0 ; i < challengeGroupChild.length ; i++)
//                 challengeGroupChild[i].body.gravity.y = downSpeed;
        }
	    
        // 新增提示字樣
        tipsText = this.add.text(cw - 200, ch - 50, '請使用上下鍵選擇你想要的選項，\n並按下空白鍵進入遊戲。', {color: "#FFFFFF", fontSize:'14px'});
            
        document.getElementById('challengeTimer').style.visibility = "visible";
        document.getElementById('challengeBar').innerHTML = " " + challengeTime.toString() + " 秒";
        document.getElementById('challengeBar').style.width = '100%';


        challengeTimer = setInterval(() => {
            if(timerStart)
            {
                challengeTime = challengeTime - 1;
                document.getElementById('challengeBar').innerHTML = " " + challengeTime.toString() + " 秒";
                document.getElementById('challengeBar').style.width = (challengeTime / 30 * 100).toString() + "%";
		// 計時器到，重新遊戲
                if(challengeTime <= 0)
		    restart = true;
                    
// 		    challengeGroup.clear();
			
		    // 每次離開此場景就再次初始化數值，以便於下次再進入此場景
// 		    challengeTime = 30;		// 計時器時間
//         	    downSpeed = 50;		// 物品降落速度
// 		    optionView = false;		// 是否先看過選項
// 		    challengeStart = false;	// 跳戰是否開始
// 		    timerStart = false;		// 計時器是否開始
// 		    waterHigh = 98;		// 海水高度
// 		    optionLevel = 1;		// 選項等級
		
		    // 重置海水高度
// 		    document.getElementById('water').style.top = waterHigh.toString() + "%";
			
			
// 	            clearInterval(challengeTimer);
// 		    clearInterval(generateTimer);
// 		    stageTime = stageTime - 10;
// 		    this.scene.start('gameSelect');
		    
//                 }
		    
            }
        }, 1000);


        generateTimer = setInterval(() => {
            if(timerStart)
            {   
//                 console.log("產生一個");
                challengeOJ = challengeGroup.create(getRandom(cw - 100, 100), 0 - getRandom(200, 0), challenge_name[getRandom(2,0)]);
// 		console.log(challengeGroupChild.length);
		console.log(option_select);
		console.log(downSpeed[option_select]);
                challengeOJ.body.gravity.y = downSpeed[option_select];
                challengeOJ.setScale(challengeScale);

            }
            else
	    {
		    challengeGroup.clear();
		    challengeGroupChild = challengeGroup.getChildren();
	    }
        }, 500);
	    
    },
    update: function(){
        let g = this.game,
            r = g.renderer,
    	    w = r.width,
    	    h = r.height
        let keyboard = this.input.keyboard.createCursorKeys();
	if(!challengeStart)
	{
	    if(keyboard.up.isDown)
	    {
		if(!optionInput)
		{
		    optionInput = true;
		    if(option_select == 0)
			return;
		    document.getElementById(optionID[option_select]).classList.remove("border");
		    document.getElementById(optionID[option_select]).classList.remove("border-light");
		    document.getElementById(optionID[option_select]).style.backgroundColor = 'rgba(255, 255, 255, 0)';
		    option_select = option_select - 1;
		    document.getElementById(optionID[option_select]).classList.add("border");
		    document.getElementById(optionID[option_select]).classList.add("border-light");
		    document.getElementById(optionID[option_select]).style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
		    console.log("上");
		}
	    }
	    else if(keyboard.down.isDown)
	    {
		if(!optionInput)
		{
		    optionInput = true;
		    if(option_select == 3)
		        return;

		    document.getElementById(optionID[option_select]).classList.remove("border");
            	    document.getElementById(optionID[option_select]).classList.remove("border-light");
            	    document.getElementById(optionID[option_select]).style.backgroundColor = 'rgba(255, 255, 255, 0)';
		    option_select = option_select + 1;
		    document.getElementById(optionID[option_select]).classList.add("border");
            	    document.getElementById(optionID[option_select]).classList.add("border-light");
            	    document.getElementById(optionID[option_select]).style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
		
		    console.log("下");
		}
	    }
            else
	    {
		optionInput = false;
	    }
		

	    if(keyboard.space.isDown)
	    {
		    if(!optionView)
		    {
			mask.clear();
			mask.fillStyle(0xFFFFFF, 0.6).fillRect(0, 0, cw, ch);
			optionView = true;

			// GM 對話框關閉
			document.getElementById('gmChatCard').style.display = 'none';

			// 看完選項後，就可以移除選項的文字
			document.getElementById('challengeText').style.visibility = "hidden";
			tipsText.destroy();

			document.getElementById('water').style.visibility = "visible";
			document.getElementById('optionBadges').style.visibility = "visible";
			
			// A 選項
			if(option_select == 0)
				document.getElementById('playerOption').innerHTML = subject_option[subject_select].A;
			else if(option_select == 1)
				document.getElementById('playerOption').innerHTML = subject_option[subject_select].B;
			else if(option_select == 2)
				document.getElementById('playerOption').innerHTML = subject_option[subject_select].C;
			else if(option_select == 3)
				document.getElementById('playerOption').innerHTML = subject_option[subject_select].D;
			  
			    
			optionStr = document.getElementById('playerOption').innerHTML;
			challengeStart = true;
			console.log(challengeStart);
		    }
	    }
	}
	    
        // 角色左右移動
        if(keyboard.right.isDown)
            player.setVelocityX(300);
        else if(keyboard.left.isDown)
            player.setVelocityX(-300);
        else
            player.setVelocityX(0);
    
        if(challengeStart)
        {
	    console.log("遊戲開始");
            // 計時器開始倒數
            timerStart = true;

// 	    if(keyboard.space.isDown)
// 	    {
// 		    if(!gameExit)
// 		    {
// 			    gameExit = true;
// 			    challengeGroup.clear();
			
// 			    // 每次離開此場景就再次初始化數值，以便於下次再進入此場景
// 			    challengeTime = 30;		// 計時器時間
// 			    downSpeed = 50;		// 物品降落速度
// 			    optionView = false;		// 是否先看過選項
// 			    challengeStart = false;	// 跳戰是否開始
// 			    timerStart = false;		// 計時器是否開始
// 			    waterHigh = 98;		// 海水高度
// 			    optionLevel = 1;		// 選項等級

// 			    // 重置海水高度
// 			    document.getElementById('water').style.top = waterHigh.toString() + "%";


// 			    clearInterval(challengeTimer);
// 			    clearInterval(generateTimer);
// 			    this.scene.start('gameSelect');
// 		    }
// 	    }
// 	    else
// 	    {
// 		    gameExit = false;
// 	    }
		
		
	       playerOptionHight = document.getElementById('playerOption').offsetTop;
	       // 成功做到選擇
	       if(document.getElementById('wave').y < playerOptionHight)
	       {
	           document.getElementById('playerOption').classList.remove("badge-light");
	           document.getElementById('playerOption').classList.add("badge-success");
		       
		       
		   if(!gameExit)
                   {
				   
		       gameExit = true;
	               challengeGroup.clear();
			
		       // 每次離開此場景就再次初始化數值，以便於下次再進入此場景
		       challengeTime = 30;	// 計時器時間
		       downSpeed = 50;		// 物品降落速度
		       optionView = false;	// 是否先看過選項
		       challengeStart = false;	// 跳戰是否開始
		       timerStart = false;	// 計時器是否開始
		       waterHigh = 98;		// 海水高度
		       optionLevel = 1;		// 選項等級

		       // 重置海水高度
		       document.getElementById('water').style.top = waterHigh.toString() + "%";


		       clearInterval(challengeTimer);
		       clearInterval(generateTimer);
		       this.scene.start('gameSelect');
                    }
		       
// 		player_record.push({
//             		subject: subject_nameen[subject_select],
//             		do:optionStr,
//         	});
		    
// 		console.log(player_record[0].subject);
// 		console.log(player_record[0].do);
	       }
               else if(document.getElementById('wave').y > playerOptionHight)
	       {
	           document.getElementById('playerOption').classList.remove("badge-success");
	           document.getElementById('playerOption').classList.add("badge-light");
		   // 如果計時器倒數截止，但仍然沒有超過標準高度，就從來
		   if(restart)
                   {
                       console.log("重新遊戲");
		       console.log(option_select);
                       restart = false;
                       
			   
		       // 重新蓋上遮罩
		       mask.clear();
                       mask = this.add.graphics()
                       mask.fillStyle(0x000000, 0.7).fillRect(0, 0, cw, ch);
        
                       // 新增該學科選項
	               document.getElementById('challengeText').style.visibility = "visible";
	               document.getElementById('optionAText').innerHTML = subject_option[subject_select].A;
	               document.getElementById('optionBText').innerHTML = subject_option[subject_select].B;
	               document.getElementById('optionCText').innerHTML = subject_option[subject_select].C;
	               document.getElementById('optionDText').innerHTML = subject_option[subject_select].D;
			   
		       document.getElementById('water').style.visibility = "hidden";
		       document.getElementById('optionBadges').style.visibility = "hidden";
			   
                       // 變數再次初始，以便繼續挑戰直到成功為止
		       challengeTime = 30;	// 計時器時間
		       downSpeed = 50;		// 物品降落速度
		       optionView = false;	// 是否先看過選項
		       challengeStart = false;	// 跳戰是否開始
		       timerStart = false;	// 計時器是否開始
		       waterHigh = 98;		// 海水高度
		       optionLevel = 1;		// 選項等級
			   
                       document.getElementById('water').style.top = waterHigh.toString() + "%";
                   }
	       }
        }
    }
}
