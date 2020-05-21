class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(200,100,20,20);
    player1.addImage("player1",player1_img);
    player1.scale = 0.2;
  
    player2 = createSprite(200,200,20,20);
    player2.addImage("player2",player2_img);
    player2.scale = 0.2;
  
    player3 = createSprite(200,300,20,20);
    player3.addImage("player3",player3_img);
    player3.scale = 0.2;
  
    player4 = createSprite(200,400,20,20);
    player4.addImage("player4",player4_img);
    player4.scale = 0.2;

    players = [player1, player2, player3, player4];

    hurdle1 = createSprite(800,250,10,10);
    hurdle1.addImage("hurdle1",hurdle_img);
    hurdle1.scale = 0.3;

    hurdle2 = createSprite(800,390,10,10);
    hurdle2.addImage("hurdle2",hurdle_img);
    hurdle2.scale = 0.3;

    hurdle3 = createSprite(800,530,10,10);
    hurdle3.addImage("hurdle3",hurdle_img);
    hurdle3.scale = 0.3;

    hurdle4 = createSprite(800,650,10,10);
    hurdle4.addImage("hurdle4",hurdle_img);
    hurdle4.scale = 0.3;
  
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("#f7f299");
        image(track,0,0,displayWidth*5,displayHeight)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the players
      var x;
      var y = 125;

      

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in x direction
        y = y + 125;
        //use data form the database to display the players in y direction
        x = displayWidth/4-200 - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = players[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance = player.distance - 10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }

    drawSprites();
  }

  end(){
    game.update(2);
    console.log("Game Ended");
  }

  
}
