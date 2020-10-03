var bird,scene,cloud,restart,pillar1,pillar2,pillar3,pillar4,pillar;
var upPillar1,upPillar2,upPillar3,upPillar;
var gameOver;
var birdImage,cloudImage,gameoverImage,restartImage,sceneImage;

function preload(){
   birdImage=loadImage("bird.png");
   sceneImage=loadImage("background.png");
   cloudImage=loadImage("cloud.png");
   restartImage=loadImage("Restart.png");
   gameoverImage=loadImage("gameOver.png");
   pillar1=loadImage("pillar1.png");
   pillar2=loadImage("pillar2.png");
   pillar3=loadImage("pillar3.png");
   pillar4=loadImage("pillar4.png");
   upPillar1=loadImage("upPillar1.png");
   upPillar2=loadImage("upPillar2.png");
   upPillar3=loadImage("upPillar3.png");
}


function setUp(){
  createCanvas(1200,800);
     //initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating a background
 scene=createSprite(0,0,1200,800);
scene.addImage(sceneImage);
scene.scale=2;

scene.x = scene.width /2;

//create a bird sprite
bird = createSprite(200,380,20,50);
bird.addImage("bird");

//set collision radius for the bird
bird.setCollider("circle",0,0,30);

//scale and position the bird
bird.scale = 0.3;
bird.x = 50;

//place gameOver and restart icon on the screen
restart = createSprite(200,340);
restart.addImage(restartImage);
restart.scale = 0.5;

 gameOver=createSprite(208,100,50,50);
gameOver.addImage(gameoverImage);
gameOver.scale=0.3;

//create Obstacle and Cloud Groups
var ObstaclesGroup = new Group();
var CloudsGroup = new Group();

restart.visible = false;

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
var count = 0;

}

function draw() {
  //set background to white
  background("white");
  
    //display score
  
  
  if(gameState === PLAY){
    //move the ground
       //scoring
    count = count + Math.round(getFrameRate()/60);
    
    if (count>0 && count%100 === 0){
     
    }
    
   
         //jump when the space key is pressed
    if(keyDown("space") && bird){
      bird.velocityY = -12 ;
      //playSound("jump.mp3");
    }
    
    
    gameOver.visible=false;
    
    scene.x = scene.width /2;
  
    //add gravity
    bird.velocityY = bird.velocityY + 0.8;
    
    bird.visile=true;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    // upObstacles.
    upObstacles();
    
    fill("black");
   stroke("white");
   strokeWeight(4);
   text("SCORE: "+ count, 250, 100);
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(bird)){
      gameState = END;
     //playSound("die.mp3");

    }
  }
  
  else if(gameState === END) {
        restart.visible = true;
        gameOver.visible = true;
    
    //set velcity of each game object to 0
       bird.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
       //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    bird.visible=false;
    
    restart.depth = ObstaclesGroup.depth;
    restart.depth=restart.depth+1;
    
    ObstaclesGroup.destroyEach();
    
    gameOver.depth = ObstaclesGroup.depth;
    gameOver.depth=gameOver.depth+100;
    
    fill("yellow");
    stroke("red");
    strokeWeight(10);
    rect(30,170,350,100);
    
    
    
    fill("black");
    stroke("white");
    textSize(30);
    text("Your Score Is : " + count,70,230);
      }
  
  if(mousePressedOver(restart)) {
    reset();
    bird.visible=true;
  }
  
  
  drawSprites();
  
   console.log(gameState);
}

function reset(){
  gameState = PLAY;
  
    restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
 bird.changeImage("bird");
  
  count = 0;
  
}

function spawnObstacles() {
  if(frameCount % 30 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (5 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(2,4));
    switch(rand){
      case 1:obstacle.addImage(pillar1);
      break;
      case 2:obstacle.addImage(pillar2);
      break;
      case 3:obstacle.addImage(pillar3);
      break;
      case 4:obstacle.addImage(pillar4);
      break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function upObstacles(){
    if (frameCount % 30 === 0) {
      var pillar = createSprite(400,10,40,10);
      pillar.y= Math.round(random(10,20));
       var rand1 = Math.round(random(2,3));
       switch(rand1){
        case 1:pillar.addImage(upPillar1);
        break;
        case 2:pillar.addImage(upPillar2);
        break;
        case 3:pillar.addImage(upPillar3);
        break;
    
      }

      pillar.scale=0.5;
      pillar.velocityX= - (5+3*count/100);
      
      //giving cloud a lifetime
      pillar.lifetime = 9100;
      
      ObstaclesGroup.add(pillar);
    }
}
  



