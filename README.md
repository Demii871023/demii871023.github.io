# CEEC MiniPro

> [Problem](https://hackmd.io/Rd6RPM6EQoW84P-gFWrl1w?both#Phaser)


## 進度
### 2020 / 8 / 13（四）
* 利用 Phaser 建構出背景及角色，並利用 group 嘗試生成 8 個科目豆
  - 需要再利用變數 e.g. player_id 來紀錄要創建的角色為何（搭配 playerSelect 場景）。
  - 科目豆 (beans) 用亂數生成的座標位置需要再修正產生 x 及 y，且要避免生成位置過於靠近 (可能還要再想方法 e.g. 每次產生亂數時去檢查之前生成的，若距離小於 ? 就不要，但有可能仍然有 bug），因此可能事先設定好 8 個科目豆生成位置，用亂數產生哪個座標所使用的科目豆 index = 0，但可能要注意到暫存 subject_select 的數值。


* 人物可以依照鍵盤上下左右按鍵移動
* 按下 space 鍵為 eat，且會彈出確認視窗 (Bootstrap modal)，按下 shift 鍵為 don't eat，會關閉視窗 (Bootstrap modal)
  - 還需要再撰寫若再次按下 space 鍵為確認，會關閉視窗 (Bootstrap modal)，並讓該科目豆消失。
  - 目前儲存玩家所決定的科目豆為變數 subject_select，計畫使用 index 來記錄，但因為生成時搭配 group 使用，因此方法可能要再研究，若不行就要把 group 拔掉，改用較髒寫法。


### 2020 / 8 / 19（三）
* Bonus 使用吃豆豆的形式進行四種分數的加分，但是在吃到之後要先完成指令（e.g. 唯舞獨尊 上下左右按鍵）才真的加到分！
* Bonus 限制時間為 10 秒，想採用 bootstrap progress 呈現
* 玩家的狀態能力值目前先寫死，等待自定義參數部分完成，在讀取數值
```diff
// index.js gameBonus.js
// 玩家擁有數值 ->
 - var lazyNum = 100;      // 惰性
 - var pressureNum = 100;  // 壓力
 - var strengthNum = 100;  // 體力
 - var socialNum = 100;    // 人際
```

### 2020 / 08 / 25 (二)
* 實作 **完成課業學業遊戲 doSubject.js**
* 討論出的遊戲內容為，讓 player 去吃掉落物 ( 閃電：lighting → 加分/ 炸彈：bomb → 扣分)。
  * (1) 增加遊戲性：先給使用者看完選項後開始遊戲，有四個 badge 在畫面中呈現出來，依據難易度放置在不同的高度。
  * (2) 分數的顯示方式：利用水的漲退來呈現出分數的變化，若吃到閃電加分即漲水，若吃到炸彈扣分即退水。若水的高度高於選項的 badge 即達成該選項，每達成一個選項的高度掉落物速度加快，來呈現出四個選項的難易度不同。
  
```diff
-(OK) 原本是利用時間去控制遊戲是否結束，但考量到若玩家可能只想要達到某個選項高度，要再討論是否新增退出該遊戲的方式。
```

### 2020 / 08 / 27 (四)
* 多人會議所提優化：
  * Bonus 時加完分，會有提示文字，現實生活中可以透過其他事情達到加分效果，並不是平白無故像遊戲中刷一刷就可以得到。
  * 如果照舊 **完成課內學業遊戲 doSubject.js**，保留遊戲性達到某個選項等級之後掉落物下降速度會加快，會失去原本選擇的意義。
    * 因此經過討論之後，決定先讓玩家選擇他想要的選項(option)，後再依據他選擇的選項困難度給予掉落物不同的下降速度。
    
* 實作 **紀錄上傳功能 recordUpload.js**，每一個 record 豆利用 player 移動至吃掉達到 hover，而顯示其紀錄的詳細資訊。
  * 當玩家要選擇此項目上傳，就 hover 該項目，並按下空白鍵選取，若不要該項目可以在按 shift 鍵來放掉。

```diff
-(OK) recordUpload.js 的部分：再討論要不要於挑選上傳時，選擇某項之後，在右邊放置一個 card 來顯示他選擇上傳的項目。
```


### 2020 / 09 / 01 (二)
* 實作 **紀錄上傳功能 recordUpload.js** 的右側 card **(HTML ID：uploadDetailCard)** ，並另用 list-group 來放置每一個新增的項目。而 class 和 do 的文字內容皆是利用先在 nameen 陣列裡面找出對應 index 後，再利用找到的 index 去 name 裡面找中文。
  * record_class：課外學科 或 課外活動
  * record_do：class 的子類別。( e.g. 課業學科裡的語文、數學、自然科學... / 課外活動裡的社團、校隊、科展... )
  * record_option：於 doSubject.js 中選取的選項，利用 optionStr 先暫存起來後放入陣列裡面再顯示出來

### 2020 / 09 / 09 (三)
* doSubject.js 更改為，先選擇選項，再依據該選項難易度給予掉落物不同的下降速度。
  * 於時間內完成：水的高度超過選項擺放的位置，即代表完成，並立刻離開 doSubject.js 頁面。
  * 於時間內未完成：繼續選擇選項，再遊戲，持續到完成遊戲為止。

```diff
-(OK)下次此專案可能於 10 月才會再接手，因此先整理 code，暫緩實作。
```

## 目標
### gameInit
> 遊戲開始介面

### playerSelect
> 角色選擇與能力值設定

### gameSelect
> 選擇課業學科或課外活動

* 架設選擇要 課業學科(目前 gamePlay 場景) 或 課外活動 (計畫名為 gameActivity)
* 開啟兩張選擇的圖片，並開啟互動事件後點選並跳轉頁面
```diff
- (後期) 改變滑鼠指標樣式、hovor 時增加特效
- (20200819 Meeting) 更改選擇方式為鍵盤(左右)，按下空白鍵進入 (選擇到的就亮色，其他就刷淡)
```


### gameSubject
> 課業學科

* 基本吃科目豆
* Bonus 門設置
* 觸發突發事件
  - 先設立一個全域變數紀錄選擇 課業學科、課外活動分別的次數，目前因為還不完整，該變數先寫死，做為測試。
  - 呈現方式可能是 Bootstrap modal(?)
  
* 能力值
  - 試做 [codePen](https://codepen.io/demi871023/pen/bGpwepj?editors=1100)
  
### gameActivity
> 課外活動


### gameBouns (2020 / 8 / 25 M)
> 獎勵

* 有彈力的豆豆，吃到之後完成指令才算入分數，有限時(10s)
  * 於畫面最上面，利用 Progress 實作倒數計時器
* 限制進入次數，以年級為限


### doSubject
<img src="https://i.imgur.com/i4UHP7b.png">
> 進行課業學科的遊戲挑戰

#### HTML

- challengeText 用於放置四個選項的 card，label 為選項代號，Text 為選項內容
  - optionAGroup
    - optionALabel
    - optionAText
  - optionBGroup
    - optionBLabel
    - optionBText
  - optionCGroup
    - optionCLabel
    - optionCText
  - optionDGroup
    - optionDLabel
    - optionDText 
#### JS
* subject_option：存放讓玩家選擇的四個選項內容



## Resource

### Phaser
* [Button hovor](https://www.html5gamedevs.com/topic/41697-handle-button-hover-in-phaser-3/)
* [Button hover](https://snowbillr.github.io/blog//2018-07-03-buttons-in-phaser-3/)

* [Transparent Background](https://www.html5gamedevs.com/topic/38540-transparent-background/)
* [Sprite Alpha](https://phaser.io/examples/v3/view/game-objects/sprites/sprite-alpha)

* [Note for Phaser 3 - Group](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/)
* [Note for Phaser 3 - Timer](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/)
* [Custom Bounds](https://phaser.io/examples/v3/view/physics/arcade/custom-bounds)
* [Note for Phaser 3 - Chart](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-chart/)
* [Mask](https://phaser.io/examples/v2/sprites/mask)
* [Note for Phaser 3 - Graphics](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/graphics/)
* [Note for Phaser 3 - Chart](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-chart/)
* [NOte for Phaser 3 - DOM element](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/domelement/)

* [Custom Bounds](https://phaser.io/examples/v3/view/physics/arcade/custom-bounds)

#### 設置不同的重力值
* [Gravity Example](https://phaser.io/examples/v2/arcade-physics/gravity)

#### 在 Phaser Canvas 前顯示 HTML5 物件
* [z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

#### Radar Chart
* [rexUI: Chart - radar](https://codepen.io/rexrainbow/pen/qwVBNy?editors=0010)

#### Water Effect
* [phaser water effect](https://codepen.io/demi871023/pen/PoNpqrZ?editors=0010)


### Bootstrap
* [對齊 Float](https://getbootstrap.com/docs/4.0/utilities/float/)
* [響應式的佈局系統 col](https://medium.com/@realdennis/40%E8%A1%8C%E5%AF%A6%E4%BD%9C%E9%9F%BF%E6%87%89%E5%BC%8F%E7%9A%84%E4%BD%88%E5%B1%80%E7%B3%BB%E7%B5%B1-%E5%91%8A%E8%A8%B4%E4%BD%A0col-sm-12-col-md-6-%E6%98%AF%E5%A6%82%E4%BD%95%E5%AF%A6%E7%8F%BE-4490a65b1a0)

#### visibility v.s. display
* [CSS visibility Property](https://www.w3schools.com/cssref/pr_class_visibility.asp)
* [display:none和visibility:hidden的差別](https://dotblogs.com.tw/kirkchen/2009/12/22/12603)


#### 在時間軸上設置節點
* 想法：使用 tooltip
  * [jsfiddle Example](https://jsfiddle.net/w9qf9wo8/1/)

* 想法：使用 popovers
  * [jsfiddle Example](http://jsfiddle.net/elogicmedia/pGr2M/)
  * [](https://stackoverflow.com/questions/54122143/how-can-i-put-bootstrap-badge-on-the-bootstrap-tooltip)


#### tooltip
* [Example](https://jsfiddle.net/rm0uade9/34/)

### Chartjs
#### basic radar chart
* [Demo](https://www.chartjs.org/samples/latest/charts/radar.html)
* [Radar Chart](https://www.chartjs.org/docs/latest/charts/radar.html)
* [Chart.js在線性圖上拖動點](http://hk.uwenku.com/question/p-qdtgiysa-ds.html)



### Temp Codepen
* [ScrollSpy in Bootstrap 4](https://codepen.io/demi871023/pen/abNWpOK)



