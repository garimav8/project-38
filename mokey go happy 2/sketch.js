var PLAY = 1;
var END = 0;
var gameState = 1;

var jungle, jungleImage;
var ground;
var monkey, monkey_running ;
var banana , bananaImage, bananaGroup;
var obs ,obsImage, stoneGroup;
var life= 5;
var monkey_stop;
var SCORE = 0;


function preload(){
  createCanvas(400,400);
  
  jungleImage = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obsImage = loadImage("stone.png");
  monkey_stop = loadAnimation("Monkey_01.png");
  
}

function setup(){
  
  jungle = createSprite(200,200,10,10);
  jungle.addImage("jungle" ,jungleImage);
  jungle.scale = 0.6;
  jungle.velocityX = -2;
  
  ground = createSprite(70,355,400,10);
  
  monkey = createSprite(60,320,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.1;
  
  
  ground.visible = false;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
}

function draw(){
  background("white");
    
  
  if (gameState === PLAY){
 

  if (jungle.x < 100){
    jungle.x = 300;
  }
    
  if (keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -8;
  }
    
  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(ground);
    
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      SCORE = SCORE +2;
    }
    
   switch(SCORE){
     case 10: monkey.scale = 0.2;
       break;
     case 20: monkey.scale = 0.3;
       break;
     case 30: monkey.scale = 0.4;
       break;
     case 40: monkey.scale =0.5;
       break;
       default : break;
   }

    
    fruits();
    stone();
    
      if (stoneGroup.isTouching(monkey)){
        life -=1;
        monkey.scale = 0.1;
        stoneGroup.destroyEach();
    }
    
    if ( life === 0){
     
      gameState = END;
    }
    
  }
  
  if (gameState === END){
      monkey.velocityY = 0;
      monkey.velocityX = 0;
      stoneGroup.setVelocityEach(0);
      bananaGroup.setVelocityEach(0);
      jungle.velocityX = 0;
      monkey.changeAnimation("stop",monkey_stop);
     
    
     
  }
  
  drawSprites();
    stroke("purple");
    textSize(25);
    fill("white");
    text("SCORE: "+ SCORE,20,20);
      text("LIFE: "+ life,280,20)
  
}
  
function fruits(){
  if (frameCount % 200 === 0){
  banana = createSprite(400,80,5,5);
  banana.addImage("banana",bananaImage);
  banana.y = Math.round(random(80,250));
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 200;
 
  bananaGroup.add(banana);
  
 }
  
}

function stone(){
  if (frameCount % 250 === 0){
  obs = createSprite(380,330,10,10);
  obs.addImage("obstacle",obsImage);
  obs.x = Math.round(random(400,380));
  obs.scale = 0.1;
  obs.velocityX = -3;
  obs.lifetime = 200;
  
  stoneGroup.add(obs);
    
  } 
  
}