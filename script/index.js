
// subjectSelect.js
var subject = ['語文', '自然科學', '綜合活動', '數學', '科技', '健康與體育', '社會', '藝術'];




// const.js
const cw = $(window).width();
const ch = $(window).height();
const playerScale = 0.3;
const scale = 0.6;



// gameStart.js
const gameStart = {
  key: 'gameStart',
  preload: function(){
    this.load.image('bg2', 'image/Background/jungle-background-clipart.jpg');
    this.load.image('player', 'image/Character/afro-hair.png');
  },
  
  create: function(){
    this.bg2 = this.add.sprite(cw/2, ch/2, 'bg2');
    this.player = this.add.sprite(150, 150, 'player');
    this.player.setScale(playerScale);
    
    this.add.text(cw/2, ch/2, Subject[2], {color:'#123456', fontSize:'60px'});
  },
  
  update: function(){
    let keyboard = this.input.keyboard.createCursorKeys();
    if(keyboard.right.isDown){
      console.log("右邊");
    }
    
    if(keyboard.left.isDown){
      console.log("左邊");
    }
    
  }
  
}


// index.js

const config = {
  type: Phaser.AUTO,
  width: cw,
  height: ch,
  parent: 'app',
  scene: [
    gameStart,
  ]
}

const game = new Phaser.Game(config);
