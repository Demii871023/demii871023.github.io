# CEEC MiniPro



> [Problem](https://hackmd.io/Rd6RPM6EQoW84P-gFWrl1w?both#Phaser)


## 進度
### 2020 / 8 / 13（四）
* 利用 Phaser 建構出背景及角色，並利用
```diff
- 需要再利用變數 e.g. player_id 來紀錄要創建的角色為何。
- 科目豆 (beans) 用亂數生成的座標位置需要再修正產生 x 及 y，且要避免生成位置過於靠近 (可能還要再想方法 e.g. 每次產生亂數時去檢查之前生成的，若距離小於 ? 就不要，但有可能仍然有 bug），因此可能事先設定好 8 個科目豆生成位置，用亂數產生哪個座標所使用的科目豆 index = 0，但可能要注意到暫存 subject_select 的數值。

```
* 人物可以依照鍵盤上下左右按鍵移動


## 目標
