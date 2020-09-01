var player_record = [
]


const recordUpload = {
    key: 'recordUpload',
    preload: function(){
        this.load.image('bg1', 'image/Background/jungle-clipart-background-6.jpg'); 
        
    },
    create: function(){
	    
        bg1 = this.add.sprite(cw/2, ch/2, 'bg1');
        bg1.setScale(4);
	    
	maskSubject = this.add.graphics()
        maskSubject.fillStyle(0x000000, 0.5).fillRect(5, 0, cw/2-10, ch);
	
	maskActivity = this.add.graphics()
        maskActivity.fillStyle(0x000000, 0.5).fillRect(cw/2+5, 0, cw/2-10, ch);


    },
    update: function(){
	    

    }
}
