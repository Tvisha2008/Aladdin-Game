var gameState = "level1";

var aladdin, aladdin_running, aladdin_collided;
var ground, invisibleGround, groundImage;
var jasmine, diamond, lamp;
var platform, Platform;
var bgImg, bgImg2;
var level1;
var fireImg;

var obstaclesGroup
var fireGroup
var diamondGroup

var score=0;

var gameOver, restart;
var gameOverImg, restartImg;

function preload(){
  aladdin_running = loadImage("images/aladdin.png");
  fireImg=loadImage("images/fire.png");
  
  groundImage = loadImage("images/desert.jpg");

  jasmine=loadImage("images/jasmine.png");

  diamond=loadImage("images/diamond.png");

  lamp=loadImage("images/lamp.png");
  
  level1 = loadImage("images/level1.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

  bgimg2=loadImage("images/bg.jpg");
}

function setup() {
  createCanvas(1000, 600);

  ground = createSprite(800,300,1600,600);
  ground.scale=1.5;
  ground.x = ground.width /3;
  ground.velocityX = -(6 + 3*score/100);
  
  aladdin = createSprite(50,500,20,50);
  aladdin.addImage("running", aladdin_running);
  aladdin.scale = 0.2;
  
   gameOver = createSprite(300,100);
   gameOver.addImage(gameOverImg);
  
   restart = createSprite(300,140);
   restart.addImage(restartImg);
  
   gameOver.scale = 0.5;
   restart.scale = 0.5;

   gameOver.visible = false;
   restart.visible = false;
  
  invisibleGround = createSprite(600,590,1200,17 );
  invisibleGround.visible = true;
  invisibleGround.shapeColor="green";
  
  platformGroup = new Group();
  obstaclesGroup = new Group();
  diamondGroup = new Group();
  

}

function draw() {
  background(0);
  ground.velocityX = -6;
  
  if(keyDown("space") && aladdin.y >= 159) {
     aladdin.velocityY = -12;
  }
  
   aladdin.velocityY = aladdin.velocityY + 0.8
  
   if (ground.x < 200){
      ground.x = ground.width/2;
     }
  
aladdin.collide(invisibleGround);
  
 if (gameState==="level1" && score<10){
  ground.addImage(groundImage);
  spawnPlatform();
  spawnObstacles();

  if(platformGroup.isTouching(aladdin)){
    aladdin.velocityY=0;
  }

  if(diamondGroup.isTouching(aladdin)){
    score=score+10;
    diamondGroup.destroyEach();
  }

  if(score>=10 && gameState==="level1"){
    gameState="level2";
  }

 } 
 
     
  
  if (gameState==="level2" && score>10){
    console.log(gameState);
    ground.addImage(bgimg2);
    spawnObstacles();
    spawnLamp();
  }

 else if (gameState === "end") {
  gameOver.visible = true;
   restart.visible = true;
    

    ground.velocityX = 0;
    aladdin.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
 platformGroup.setVelocityXEach(0);
    

     aladdin.changeAnimation("collided",aladdin_collided);
    
  
    obstaclesGroup.setLifetimeEach(-1);
  platformGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
       reset();
     }
   }

 
 
  
  drawSprites();
  fill ("black");
  textSize(30);
  text("Score: "+ score, 500,50);
}

function spawnPlatform() {
  //write code here to spawn the platforms
  if (frameCount % 170 === 0) {
    var platform = createSprite(1000,120,100,10);
    platform.y = Math.round(random(300,550));
    platform.addImage(level1);
    platform.scale = random(0.3,1.2);
    platform.velocityX = -6;

    //platform.debug=true;
    platform.setCollider("rectangle",0,0,100,100);

    var coins=createSprite(1000,120,10,10);
    coins.y=platform.y-100;
    coins.addImage(diamond);
    coins.scale=0.1;
    coins.velocityX=platform.velocityX;

   diamondGroup.add(coins);
    
     //assign lifetime to the variable
     platform.lifetime = 400;
    
    //adjust the depth
    platform.depth = aladdin.depth;
    aladdin.depth = aladdin.depth + 1;
    
    //add each platform to the group
    platformGroup.add(platform);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(0,random(300,500),10,40);
    obstacle.velocityX = random(9,12);
    obstacle.addImage(fireImg);                  
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  } 
} 

function reset(){
  gameState = "level1";
  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}