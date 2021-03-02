var bow , arrow, greenB, redB ,pinkB ,blueB, bkgnd;
var bowImage, arrowImage, greenBImage, redBImage, pinkBImage ,blueBImage, backgroundImage;
var score, arrowGroup, redBGroup, blueBGroup, greenBGroup, pinkBGroup;
var arrowCount, reward;


function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  redBImage = loadImage("red_balloon0.png");
  greenBImage = loadImage("green_balloon0.png");
  pinkBImage = loadImage("pink_balloon0.png");
  blueBImage = loadImage("blue_balloon0.png");
 
  
}

function setup() {
  createCanvas(500, 500);
  
  
  //creating background
  bkgnd = createSprite(0,0,500,500);
  bkgnd.addImage(backgroundImage);
  bkgnd.scale = 2.5;
  
  
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  // Creating balloon and arrow groups
  arrowGroup = createGroup();
  redBGroup = createGroup();
  blueBGroup = createGroup();
  greenBGroup = createGroup();
  pinkBGroup = createGroup();
  
  //Creating Arrow
  arrow = createSprite(457,250,10,10);
  arrow.addImage(arrowImage);
  arrow.scale = 0.2;
  
  score =0;
  arrowCount = 30;
  reward = 0;
  
}

function draw() {
  
     // moving ground
  if(arrowCount > 0) {
      bkgnd.velocityX = -3 
    
  
    if (bkgnd.x < 0){
      bkgnd.x = bkgnd.width/2;
    }
    
  }
  
  //moving bow according to Mouse Y position
  if(arrowCount > 0) {
     bow.position.y = mouseY;
  }
    
   // release arrow when space key is pressed
  arrow.y = bow.y;
  if ((keyWentDown("space") || touches.length> 0) && arrowCount > 0) {
     arrow.velocityX = -100;
     arrowCount = arrowCount-1;
     console.log(arrowCount);
    touches=[];

  }
  if (arrow.x < 0 && arrowCount > 0) {
      arrow.x = bow.x-20;
      arrow.velocityX = 0;
  }
   arrow.lifetime = 120;
  
  
  //generate random balloons
  var selectBalloon = Math.round(random(1,4));
 // console.log(selectBalloon);
  if(frameCount%40===0){
    switch(selectBalloon) {
      case 1: redBalloon();
              break;
      case 2: greenBalloon();
              break;
      case 3: blueBalloon();
              break;
      case 4: pinkBalloon();
              break;
      default: break;
    }
    
  }
    
  if(arrow.isTouching(redBGroup) && arrowCount > 0){
      redBGroup.collide(arrow, destroyFunc);
      score = score+4;
     // createArrow();
     
    }
  
  if(arrow.isTouching(pinkBGroup) && arrowCount > 0){
      pinkBGroup.collide(arrow, destroyFunc);
      score = score + 3;
      //createArrow();
      
    }
  
  if(arrow.isTouching(greenBGroup) && arrowCount > 0){
      greenBGroup.collide(arrow, destroyFunc);
      score = score + 2;
      //createArrow();
  }
   
 if(arrow.isTouching(blueBGroup) && arrowCount > 0){
     blueBGroup.collide(arrow, destroyFunc);
     //createArrow();
     score = score + 1;
  }
      
    // Reward of giving more arrows
    if((score >= 50 && score < 56) && reward < 1) {
      arrowCount = arrowCount + 10;
      reward = reward + 1;
    }
    if((score >= 90 && score < 96) && reward <2) {
      arrowCount = arrowCount + 15;
      reward = reward + 1;
    }
  
  drawSprites();   
 //score = scoring ();
  textSize(20);
  text("Score: "+ score,365,30);
  textSize(15);
  text(" Arrows: "+ arrowCount,365,55);
  if(arrowCount === 0) {
    freezeFunc();
    textSize(30);
    text("Game Over", 190,200);
    textSize(20);
    text("The permissible number of arrows are over!!" , 60,240);
    if(score >= 110) {
      textSize(25);
      text("You have played Very Well!!", 95,290);
      
    }
  }
 
  
}

// Functions for Balloons
function redBalloon(){
  redB = createSprite(-15,random(35,470),50,50)
  redB.addImage(redBImage)
  redB.velocityX=5;
  redB.scale=0.07;
  redBGroup.add(redB);
  redB.setCollider("circle",0,0,15); 
  redB.lifetime = 85;
  
}

function greenBalloon(){
  greenB= createSprite(-10,random(35,470),50,50)
  greenB.addImage(greenBImage)
  greenB.velocityX=5;
  greenB.scale=0.07;
  greenB.lifetime = 85;
  greenBGroup.add(greenB);
  greenB.setCollider("circle",0,0,15);
  //return green_balloon;
}

function blueBalloon(){
  blueB = createSprite(-20,random(35,470),50,50)
  blueB.addImage(blueBImage)
  blueB.velocityX=5;
  blueB.scale=0.08;
  blueB.lifetime = 85;
  blueBGroup.add(blueB);
  blueB.setCollider("circle",0,0,15);
  //return blue_balloon;
}

function pinkBalloon(){
  pinkB = createSprite(-30,random(35,470),50,50)
  pinkB.addImage(pinkBImage)
  pinkB.velocityX=5; 
  pinkB.scale=0.9;
  pinkB.lifetime = 85;
  pinkBGroup.add(pinkB);
  pinkB.setCollider("circle",0,0,15);
 // return pink_balloon;
}

function createArrow(){
  arrow = createSprite(457,250,10,10);
  arrow.addImage(arrowImage);
  arrow.scale = 0.2;
  arrowGroup.add(arrow);
  arrow.x = bow.x-20;
  arrow.y - bow.y;
  arrow.velocityX = 0;
  
}
function destroyFunc(balloon, arrow) {
  balloon.destroy();
  arrow.x = bow.x-10;
  arrow.velocityX = 0;
  //arrow.destroy();
}
function freezeFunc(){
  redBGroup.destroyEach()
  greenBGroup.destroyEach()
  blueBGroup.destroyEach()
  pinkBGroup.destroyEach()
  arrowGroup.velocityX =0;
  bkgnd.velocityX = 0;
  bow.velocityY = 0;
  bow.y = 250;
}


