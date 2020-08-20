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


## Resource
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

### 設置不同的重力值
* [Gravity Example](https://phaser.io/examples/v2/arcade-physics/gravity)

### 在 Phaser Canvas 前顯示 HTML5 物件
* [z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

### Radar Chart
* [rexUI: Chart - radar](https://codepen.io/rexrainbow/pen/qwVBNy?editors=0010)
