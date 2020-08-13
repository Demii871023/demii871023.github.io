# CEEC MiniPro



## Phaser
### 使用 keyboard 控制 player
#### 解法
```javasciprt=
使用 phaser api input.keyboard.createCursorKeys() 來偵測按下的按鍵
若等於設定的按鍵，就讓 player 做物理的運動。
因此特別注意為，player 需要先加入 physical 裡面


// create
player = this.physics.add.sprite(150, 150, 'player');

// update
let keyboard = this.input.keyboard.createCursorKeys();
        
if(keyboard.right.isDown)
{
    player.setVelocityX(160);
    console.log("右邊");
}
else if(keyboard.left.isDown)
{
    player.setVelocityX(-160);
    console.log("左邊");
}
else
{
    player.setVelocityX(0);
    console.log("暫停");
}

if(keyboard.up.isDown)
{
    player.setVelocityY(-160);
    console.log("上面");
}
else if(keyboard.down.isDown)
{
    player.setVelocityY(160);
    console.log("下面");
}
else
{
    player.setVelocityY(0);
    console.log("暫停");
}
```
