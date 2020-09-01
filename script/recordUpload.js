var player_record = [
    {subject: 'Langugage' , do: "將課文內容吸收後，用自己的語言寫下筆記，並複習完成後的作業，對課文有更深刻的理解與記憶。"},
    {subject: 'Math' , do: "解題課本例題與習題題目，達成學校最低程度的理解。"},
    {subject: 'Social' , do: "閱讀課外考古文學、詳細戰爭歷史、世界地圖、經濟學書，可以應用與解釋到現實生活與課文內容。"},
]


const recordUpload = {
    key: 'recordUpload',
    preload: function(){
        this.load.image('bg1', 'image/Background/jungle-clipart-background-6.jpg');
	    
	    
	// 8 個課業學科
        this.load.image('Langugage', 'image/18College/13.png');
        this.load.image('Science', 'image/18College/11.png');
        this.load.image('Integrative', 'image/18College/7.png');
        this.load.image('Math', 'image/18College/3.png');
        this.load.image('Technology', 'image/18College/8.png');
        this.load.image('Health', 'image/18College/4.png');
        this.load.image('Social', 'image/18College/12.png');
        this.load.image('Art', 'image/18College/9.png');
        
    },
    create: function(){
	    
        bg1 = this.add.sprite(cw/2, ch/2, 'bg1');
        bg1.setScale(4);
	    
	
	recordGroup = this.physics.add.group();
	recordGroupChild = recordGroup.getChildren();
	    
	    
	// 生成 課業學科遮罩
	maskSubject = this.add.graphics()
        maskSubject.fillStyle(0x000000, 0.5).fillRect(5, 0, cw/2-10, ch);
	// 生成 課業學科紀錄豆
	for(var i = 0 ; i < player_record.length ; i++)
	{
	    recordGroup.create(cw/4, ch/4, player_record[i].subject);
	}
	
	
	// 生成 課外活動遮罩
	maskActivity = this.add.graphics()
        maskActivity.fillStyle(0x000000, 0.5).fillRect(cw/2+5, 0, cw/2-10, ch);
	// 生成 課外活動紀錄豆 


    },
    update: function(){
	    

    }
}
