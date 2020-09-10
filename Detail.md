# CEEC-MiniPro


### Global

#### function 函式
* getRandom(range, start)：用以取得亂數的函式
    * range 代表取得亂數的範圍最大值
    * start 代表取得亂數的範圍最小值


#### const 變數
* lazyMAX：惰性的上限最大值，數值為 100
* pressureMAX：壓力的上限最大值，數值為 100
* strengthMAX：體力的上限最大值，數值為 100
* socialMAX：人際支持的上限最大值，數值為 100


#### var 變數
* lazyNum：惰性數值
    * 初始值來源於 playerSelect 的惰性拉霸數值
* pressureNum：壓力數值
    * 初始值來源於 playerSelect 的壓力拉霸數值
* strengthNum：體力數值
    * 初始值來源於 playerSelect 的體力拉霸數值
* socialNum：人際支持數值
    * 初始值來源於 playerSelect 的人際支持拉霸數值


### script / RadarChart.js

#### function 函式
* **==playerConfirm()==**：繪製出玩家參數雷達圖
* **==dragInputRange()==**：用來預防用滑鼠 drag 拉霸。
    * 當 drag range bar 的時候，就會觸發此函式，陣列裡的值就會強制給予 bar 的 value。
    * dragInputRange_Pressure
    * dragInputRange_Strength
    * dragInputRange_Lazy
    * dragInputRange_Social

#### const 變數
* **==rangebar_name==**：用來存放玩家參數整塊(抬頭+拉霸)在 HTML 上的 ID
    * pressureBar、strengthBar、lazyBar、socialBar
* **==rangerange_name==**：用來存放玩家參數拉霸在 HTML 上的 ID
    * pressureRange、strengthRange、lazyRange、socialRange

#### var 變數
* **==playerValue==**：用來存放使用者四個參數的數值
    * 壓力 0 / 體力 1 / 惰性 2 / 人際支持 3
* **==rangebar_now==**：用來記錄現在修改的參數 bar 是哪一條
    * 壓力 0 / 壓力 1 / 惰性 2 / 人際支持 3

#### Boolen 變數
* **==playervalueMove==**：用來辨識玩家參數拉霸現在是否可以更改數值
    * 於 index.js / playerSelect 中做改變

### script / index.js / playerSelect
![](https://i.imgur.com/hvIH0rz.png)

> 操作：
> * 按下左右鍵挑選轉動人物，使中心人物不同 
> * 按下空白鍵確定選擇人物


![](https://i.imgur.com/GYcW3RW.png)
> * 按下上下鍵選擇要調整的參數
> * 按下左右鍵調整選定的參數數值
> * 按下空白鍵確定參數值

#### Timer 計時器
* **==人物縮放計時器 (中心人物 → 邊緣人物 / 邊緣人物 → 中心人物)==**
```javascript=
// 右移
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


// 左移
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
```

* **==人物選定後，要左移出空間繪製雷達圖與拉霸==**
```javascript=
timer = this.time.addEvent({
    delay: 70,           
    callback: () => {
        graphics.clear();
        // 人物左移 player_move_value
        playerArr[player_select].x = playerArr[player_select].x - player_move_value;
        // 玩家姓名左移 player_move_value
        playerName.x = playerName.x - player_move_value;
        // 螢光藍外框左移 player_move_value
        tmpx = tmpx - player_move_value;
        // 左移數值每次扣 2，達到視覺砍起來它移動量慢慢速度放慢感
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
```


#### const 變數
* **==mainpScale==**：中心人物的大小
* **==otherpScle==**：邊緣人物的大小
* **==playerArr==**：存放六個可選人物的物件
```javascript=
// 新增人物至陣列中 Code Example
player1 = this.physics.add.sprite(cw/2, ch/2, 'player1');
player1.setScale(mainpScale);
player1.alpha = 1;
playerArr[0] = player1;
```
* **==player_name==**：存放人物代號的陣列
    * player1、player2、player3、player4、player5、player6
* **==player_namezw==**：存放人物姓名的陣列
    * 四神湯、卍煞氣卍、乂都都乂、跑跑當家、葡萄醣吳、乂龘燚龘燚乂
#### var 變數

* **==shrinkScale==**：用於 **縮小** 的大小設置
    * 初始為 mainScale，依次遞減後給予人物設置此大小
* **==enlargeScale==**：用於 **放大** 的大小設置
    * 初始為 otherpScle，依次遞增後給予人物設置此大小
* **==now_select==**：用於紀錄 **還未確定角色** 前當前中心人物代號
    * 初始為 0，因為預設角色是 player1
* **==player_select==**：用於紀錄 **玩家選定的角色代號**
    * 初始為 -1，若數值為非 -1 即有選擇的角色，-1 即還未選取角色


#### Boolen 變數
* **==player_confirm==**：用於辨識玩家是否已經選取角色
    * true 為選取，false 為還未選取
* **==keydwon==**：用於辨識玩家是否按下按鍵(左右)，阻擋 keypress 一次移動過多的問題
    * true 為按鍵已經按下，false 為按鍵未按下；此處的 false 為當人物移動到正確位置後才會變成 false
* **==playerMove==**：用於辨識 player 物件是否正在移動
    * true 為正在移動，false 為目前未移動
* **==playervalueMove==**：用於辨識現在是否可以控制角色能力值的設定。
    * true 為已選定角色可開始設置能力值，false 為還未選定角色無法進入控制能力值



#### 動畫邏輯
* 人物挑選的移動
    * 挑選人物按下 **左右鍵** 控制
        * Line 193 - 272
    * 左右轉動的動畫利用 **遞增、遞減 Scale 設置給角色** 的概念運作
    * 動畫依據 shrinkScale.toFixed(1) == otherpScle 條件成立，就結束移動。即縮小的 scale size 和邊緣人物 const 大小相同時。
        * Line 273 - 321
    * 利用計時器去控制遞增以及遞減的速度及量


### script / index.js / gameSelect
![](https://i.imgur.com/mjKaKwJ.jpg)


> 操作：
> * 按下左右鍵挑選 課業學科 or 課外活動 
> * 按下空白鍵選取 class
> > 若 doClass == 1，就跳轉到 gameSubject
> > 若 doClass == 2，就跳轉到 gameActivity

#### const 變數

#### var 變數
* gsCounter：用於計算玩家選擇 Subject 的次數
    * 初始值為 0
* gaCounter：用於計算玩家選擇 Activity 的次數
    * 初始值為 0
* doClass：用於存放玩家選取要做的 類別 class 
    * **(課業學科 subject → 1/ 課外活動 activity → 2)**，初始值為 1




### script / index.js / gameSubject
![](https://i.imgur.com/DjN1sui.jpg)

#### const 變數
* **==threshold_value==**：課業學科下的每一個小類別的門檻值
* **==threshold_namezw==**：門檻參數的中文名稱
    * 惰性、壓力、體力、人際支持、時間
* **==subjectN==**：科目的總數 8
* **==subject_name==**：科目的中文名稱
    * 語文、自然科學、綜合活動、數學、科技、健康與體育、社會、藝術
* **==subject_nameen==**：科目的英文名稱
    * Langugage、Science、Integrative、Math、Technology、Health、Social、Art


#### var 變數
* **==subject_select==**：用於存放玩家挑選的科目代號
    * 初始值為 -1，若該值為非 -1，就代表玩家有選擇科目。若數值為 -1，即玩家沒有選擇科目
* **==subject_xy==**：用於存放科目豆要以亂數生成的 x 和 y 位置
    * 初始值為 亂數產生
* **==spaceCounter==**：用來記錄玩家按了幾次空白鍵，按了第一次時表示吃掉，在按下表示確定吃掉。
    * 初始值 0，每按一次空白鍵該值加 1，而因為可能玩家按下的時候科目豆與其沒有重疊，因此確定吃掉的時候 spaceCounter 已經超過 1，故判斷條件為 spaceCounter >= 1

#### Boolen 變數
* **==eat==**：用於辨別使用者是否按下空白鍵執行吃的動作
    * true 代表執行吃，false 代表不執行吃(不執行不代表吐掉)
* **==dontMove==**：防呆機制，如果 modal 視窗打開，則角色不能再移動
    * true 代表角色不能移動，false 代表角色可以移動
* **==donteat==**：用於辨別使用者是否按下 shift 鍵執行吐掉的動作
    * true 代表執行吐掉，false 代表不執行吐掉(不執行不代表吃)


#### 吃科目豆邏輯
```javascript=
this.physics.add.overlap(player, beansGroupChild, collectStar, null, this);

// 若 player 和某一顆 benas 重疊會呼叫此函式
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
```


### script / doSubject.js
![](https://i.imgur.com/cSRbxVM.png)
> 選擇選項操作：
> * 先按上下鍵來挑選選項
> * 按下空白鍵來確定要選的選項
> 

![](https://i.imgur.com/gloHQOc.png)
> 接掉落物遊戲操作：
> * 按左右建來控制人物吃到掉落物
> * 閃電加分→海水上漲，炸彈扣分→海水退下

#### const 參數
* **==subject_option==**：用來存放每個科目的四個選項
* **==challenge_name==**：用來存放生成掉落物的 sprite 英文名稱
    * lighting、bomb
* **==downSpeed==**：用來存放掉落物的 gravity 量大小的陣列
    * 0→A 最難 / 1→B 第二難 / 2→C 第三難 / 3→D 第四難
    * 2000, 1000, 400, 50
* **==optionID==**：用來存放呈現出來的選項在 HTML 中的 ID
    * optionAGroup、optionBGroup、optionCGroup、optionDGroup

#### var 參數
* **==challengeTime==**：挑戰接掉落物的總時間
    * 初始值為 30
* **==challenge_xy==**：掉落物生成的座標 x 和 y
    * 初始值使用 亂數生成
* **==waterHigh==**：海水高度
    * 初始值為 90，要特別注意的是此值對應到 #water css 中的 top 百分比
* **==playerOptionHight==**：用來存放 badge 高度
    * 初始值為 document.getElementById('playerOption').offsetTop;
* **==option_select==**：用來記錄使用者選擇的選項為何
    * 初始值為 0
* **==optionStr==**：用來存放玩家選擇選項的該選項文字內容
    * 初始值為 空字串

#### Boolen 參數
* **==optionView==**：用來辨識選項的是否已經選擇
    * true：已經看過四個選項並且做出選擇，false：還未對選項做出選擇
* **==challengeStart==**：用來辨識接掉落物挑戰是否開始
    * true：挑戰開始，false：挑戰未開始
* **==timerStart==**：用來辨識挑戰接跳落物的計時器是否開始
    * true：計時器開始倒數，false：計時器停止倒數
* **==gameExit==**：用來辨識是否達成離開挑戰
    * true：當海水高度超過 badge 放置高度，就可以離開挑戰，false：時間內沒有超過指定高度
* **==restart==**：用來辨識是否要重新遊戲
    * true：時間內沒有超過指定高度，要重新遊戲，false：不用重新遊戲
* **==optionInput==**：用來辨識現在是否有在上下移動挑選選項。目的為防止放開按鍵才能再按下一次按鍵
    * true：現在按下按鍵挑選選項，false：現在沒有按下按鍵挑選選項。


#### 存成紀錄邏輯
**==當完成接掉落物挑戰，此選擇就會放入 player_record 的陣列中==**
```javascript=
player_record.push({
    id: 5,
    class: 'subject',
    get: '',
    do: subject_nameen[subject_select],
    option: optionStr,
});
```


### script / index.js / gameBonus
![](https://i.imgur.com/Ji5sJBo.png)
> 玩家透過 **上下左右鍵** 來控制 player 去吃加分豆。接著就會 show 出指令來給予完成，若完成指令方可加分

![](https://i.imgur.com/ZPuiIv9.png)
![](https://i.imgur.com/ZJ1TT5k.png)

> 玩家要依據顯示的指令，按上下左右鍵，如果匹配圖片顏色會變。若於遊戲時間內全部指令完成，就可以加到相對應的分數
> * 黑色 Focus
> * 淺黑色 Default
> * 綠色 Correct

#### Timer 計時器

* **==先顯示出提示文字，倒數 3 秒後開始 bonus 遊戲==**
```javascript=
// 每 1000 毫秒 (1秒) 執行一次
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
```
* **==bonus 遊戲的倒數計時器==**

```javascript=
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
```
#### const 變數
* **==percentN==**：使用於呈現 progress bar 的百分比陣列
    * 0%、10%、20%、30%、40%、50%、60%、70%、80%、90%、100%
* **==bonus_name==**：bonus豆 的代號
    * lazyB、pressureB、socialB、strengthB
* **==command_name==**：指令 sprite 的代號
    * up、down、left、right

#### var 變數
* **==bonusGroup==**：用來存放生成的加分豆 sprite
    * 對應子集合：bonusGroupChild
* **==commandGroup==**：用來存放生成的指令 sprite
    * 對應子集合：commandGroupChild
* **==addKey==**：用來存放在玩家達成指令後依據吃到的 bonus.texture.key 加分對應的項目 ID
    * 初始值為空，惰性 0 / 壓力 1 / 人際 2 / 體力 3
* **==bonus_xy==**：存放 bonus 豆的詳細資訊，包括生成位置 x 和 y，用於移動的重力 gravity 與位移量 velocity
    * 初始值亂數生成
* **==commandNum==**：該回合的指令跳戰的指令總數
    * 初始值亂數生成
* **==command_command==**：用來存放依據 commandNum 個數以亂數生成的指令其代號
    * 指令代號 0 up / 1 down / 2 left / 3 right
* **==command_index==**：用來存放現在要匹配的指令 index
    * 特別注意生成是由右邊到左，但完成指令是由左到右，因此初始值為 commandNum - 1，遞減到 0
* **==nametmp==**：用來暫存圖樣的名稱
    * 單個指令分為 Default 預設 / Correct 正確 / Focus 現在要輸入的
* **==input_id==**：用來暫存 **玩家輸入的指令代號**
    * 初始值為 -1，up 0 / down 1 / left 2 / right 3
* **==input_correct==**：用來計算玩家答對的指令數量。
    * 若 input_correct == commandNum 則代表指令挑戰成功
* **==maskCounter==**：用來計算遮罩生成的數量

#### Boolen 參數
* **==rebounce==**：使用於 bonus 是否反彈過的陣列
    * true 代表已經反彈，false 代表還未反彈
```javascript=
// 若該加分豆的 x 小於或大於某個臨界值，位移方向就乘上 -1，來達到回彈的效果

if(bonusGroupChild[i].x <= 70 || bonusGroupChild[i].x >= cw - 70)
{
    if(rebounce[i] == 'false')
    {   
        bonus_xy[i].velocity = bonus_xy[i].velocity * -1;                   bonusGroupChild[i].setVelocityX(bonus_xy[i].velocity);
        rebounce[i] = 'true';
    }
}
else
{
    bonusGroupChild[i].setVelocityX(bonus_xy[i].velocity);
    rebounce[i] = 'false';
}
```
* **==bonusStart==**：用於辨別 bonus 是否開始
    * true 代表 bonus 遊戲開始，false 代表 bonus 遊戲還未開始
* **==bonusStop==**：用於辨別 bonus 是否暫停
    * true 代表 bonus 遊戲暫停，false 代表 bonus 遊戲還未暫停
* **==bonusOver==**：用於辨別 bonus 是否結束
    * true 代表 bonus 遊戲結束，false 代表 bonus 遊戲還未結束
* **==commandInput==**：用於辨別是否可以開始 **指令輸入挑戰**
    * true 代表 command 可以開始輸入，false 代表 command 還未可以開始輸入
* **==input_now==**：用於辨別 **玩家現在是否正在輸入指令**，來防範相同指令相鄰時會一次按到
    * true 代表玩家正在輸入指令，false 代表玩家結束輸入指令(離開 keypress 狀態)



### script / gameActivity.js

#### const 變數
* activity_name：課外活動的中文名稱
    * 社團、校隊、科展
* activity_nameen：課外活動的代號及英文名稱
    * Club、SchoolTeam、ScienceFair

#### var 變數

#### Boolen 變數


### script / recordUpload.js
![](https://i.imgur.com/WhQhSYC.png)
> 紀錄使用固定位置的方式呈現出來，透過人物 hover 紀錄豆可以看到該紀錄的詳細資訊

![](https://i.imgur.com/bHbcuLy.png)
> 在 hover 的狀態下，若按空白鍵則表示選取該項目進入待上傳的清單，若按下 shift 表示取消該項目

#### const 變數
* class_name：用來存放 class 的中文名稱
    * 課業學科、課外活動
* class_nameen：用來存放 class 的英文名稱
    * subject、activity

#### var 變數
* **==player_record==**：用來存放使用者的詳細記錄
    * key 包含：
        * id(辨識唯一的紀錄)
        * class(課業學科 or 課外活動)
        * get(成就)
        * do(子類別 e.g. 語文、數學...)
        * option(選擇 4選1)
* **==recordGroup_classOB==**：用來存放每個紀錄的類別 (課業學科、課外活動) 文字的 phaser object
* **==recordGroup_getOB==**：用來存放每個紀錄的成就文字的 phaser object
* **==recordGroup_doOB==**：用來存放每個紀錄的小類別文字的 phaser object
* **==recordGroup_optionOB==**：用來存放每個紀錄的選項文字的 phaser object
* **==recordNum==**：紀錄該使用者有幾筆紀錄
* **==recordIndex==**：用於存放 hover 到的記錄豆 id 為何，同時其值也是對應到所有 OB 陣列中的 index
    * 初始值為 -1
* **==recordselectNum==**：選擇上傳的紀錄總數
    * 初始值為零，該變數能夠便於新增刪除時增加 card 中的 list
* **==recordselectId==**：儲存決定上傳的紀錄 ID(按照選擇順序放入陣列，不按照紀錄 ID 排序)
    * 初始值為 空陣列
* **==uploadEnter==**：用來監聽 enter 鍵是否被按下，確定上傳
    * 因為 enter 按鍵屬於特別的，因此監聽事件要另外設置
```javascript=
uploadEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

if(uploadEnter.isDown)
            console.log('上傳完畢');
```
#### Boolen 變數
* **==recordHover==**：用來辨識是否有紀錄豆和 player hover 事件
    * true：有某顆紀錄豆和 player 產生 hover 事件，false：沒有任何紀錄豆和 player 有 hover，因此所有文字的 alpha 皆設為 0
* **==choose==**：用來辨別是否執行儲存該紀錄的動作
    * true：執行儲存紀錄的動作，false：不執行儲存紀錄的動作
* **==cancel==**：用來辨別是否執行取消儲存該紀錄的動作
    * true：執行取消儲存紀錄的動作，false：不執行取消儲存紀錄的動作
* **==recordChosen==**：用於存放使用者是否要上傳相對應 index 的紀錄陣列
    * true：該 index 對應的紀錄被選擇上傳，false：該 index 對應的紀錄不選擇上傳
