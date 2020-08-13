//select_subject.js

var Subject = ['語文', '自然科學', '綜合活動', '數學', '科技', '健康與體育', '社會', '藝術'];



window.addEventListener('keypress', function(e) {
  var keyID = e.code;

  if (keyID === 'KeyW') {
   

  }
  if (keyID === 'KeyD') {
    
  }
  if (keyID === 'KeyS') {
    
  }
  if (keyID === 'KeyA') {
    
  }
  
  
  if (keyID == 'Enter'){
      // console.log("Enter");
      // $("#tt").click();
      // //$('#myModal').modal('show');
      // console.log("Hello"); //$('#exampleModal').modal('show');
      // $("#subject_name").text(Subject[1]);
  }
    
  // 按 Q 即丟棄已選擇科目
  if (keyID == 'KeyQ')
  {
    console.log("Enter");
      $("#tt").click();
      //$('#myModal').modal('show');
      console.log("Hello"); //$('#exampleModal').modal('show');
      $("#subject_name").text(Subject[1]);
  }
}, false);





// const.js
//const cw = 800;
//const ch = 450;
const cw = $(window).width();
const ch = $(window).height();
const playerScale = 0.3;
const scale = 0.6;
const monsterScale = 0.7;

// gameStart.js
const gameStart = {
    key: 'gameStart',
    preload: function(){
        //this.load.image('bg4', '/img/bg4');

        this.load.image('bg2', 'image/Background/jungle-background-clipart.jpg');


        this.load.image('player', 'image/Character/afro-hair.png')
    },
    create: function(){
        //this.bg4 = this.add.tileSprite(400, 225, cw, ch, 'bg4');

        this.bg2 = this.add.sprite(cw/2,ch/2, 'bg2');


        this.player = this.add.sprite(150, 150, 'player');
        this.player.setScale(playerScale);
        

        this.add.text(cw/2,ch/2, Subject[2], {color: "#123455", fontSize:'60px'});
    },
    update: function(){
        let keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.right.isDown) {
        	console.log("右邊");
            //this.player.setVelocityX(200);
            this.player.setSize(144, 120, 0); //碰撞邊界
            //this.player.anims.play('speed', true);
            //this.player.flipX = false;
        }
    }
}


// index.js

// $( window ).resize(function() {
//   $( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
// });

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

