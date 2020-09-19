var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground, invisibleGround, groundImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;

function preload(){
  
  
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 500)
  
  var message = "This is a message";
  console.log(message);
  
  monkey = createSprite(50,460,20,50);
  monkey.addAnimation("moving", monkey_running);
  
  monkey.scale = 0.1;
  
  ground = createSprite(400,490,1200,20);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.debug=true;
}


function draw() {

 background("red");
  
  if(gameState === PLAY){
    //scoring
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
     monkey.velocityY = monkey.velocityY + 0.8;
     if (FoodGroup.isTouching(monkey)){
         FoodGroup.destroyEach();  
         survivalTime=survivalTime+1;
         }
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
        ground.velocityX=0;
        monkey.velocityY=0;
        obstacleGroup.velocityX=0;
    }
    spawnFood();
    spawnObstacle();
  }
  else if (gameState === END) {
    
     ground.velocityX = 0;
     monkey.velocityY = 0;
    
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     //if(mousePressedOver(restart)){
       //reset();
   //}
 }
drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival Time: "+survivalTime,20,50 );
  
  monkey.collide(ground);
  }
function reset(){
  survivalTime=0;
  gameState=PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);  
}

function spawnObstacle(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,465,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImage);
 
   //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var Food = createSprite(500,450,40,10);
    Food.y = Math.round(random(310,450));
    Food.addImage(bananaImage);
    Food.scale = 0.1;
    Food.velocityX = -3;
    
     //assign lifetime to the variable
    Food.lifetime = 200;
    
    //adjust the depth
    Food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(Food);
  }
}