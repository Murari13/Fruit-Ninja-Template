var play=1;
var end=0;
var gamestates=1;
var score=0;
var fruit1,fruit2,fruit3,fruit4,sword,alien1,alien2,gameover;

function preload(){
  
  Swordimage=loadImage("sword.png");
  
  Fruit1_image=loadImage("fruit1.png");
  
  Fruit2_image=loadImage("fruit2.png");
  
  Fruit3_image=loadImage("fruit3.png");
  
  Fruit4_image=loadImage("fruit4.png");
  
  Aliensimage=loadAnimation("alien1.png","alien2.png");
  
  gameOverimage=loadImage("gameover.png");
  
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  
  gameOverSound=loadSound("gameover.mp3");
}

function setup(){
createCanvas(600,600);
  
  Sword=createSprite(40,200,20,20);
  Sword.addImage(Swordimage);
  Sword.scale=0.5;

  fruitGroup=createGroup();
  monsterGroup=createGroup();
}

function draw(){
  background("white");
  textSize(30);
  text("score:"+score,480,30);
  
  if(gamestates===play){
    
    
    Sword.x=mouseX;
    Sword.y=mouseY;  
    
    createfruits();
    createmonsters();
    
    if(fruitGroup.isTouching(Sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
    }
     if(monsterGroup.isTouching(Sword)){
       gamestates=end;
       gameOverSound.play();
       Sword.addImage(gameOverimage);
       Sword.x=200;
       Sword.y=200;
    }
  }
 drawSprites();
}

function createfruits(){
  if(frameCount%80===0){
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
  r=Math.round(random(1,4));
  if(r==1){
    fruit.addImage(Fruit1_image);
  }
  else if(r==2){
    fruit.addImage(Fruit2_image);
  }  
  else if(r==3){
    fruit.addImage(Fruit3_image);
  }  
  else if(r==4) {
    fruit.addImage(Fruit4_image);
  }
  fruit.x=Math.round(random(50,340));
  fruit.velocityY=-6;
  fruit.lifetime=100;
    
  position=Math.round(random(1,2));
  if(position==1){
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
  }
  if(position==2){
    fruit.x=0;
    fruit.velocityX=(7+(score/4));
  }
   fruitGroup.add(fruit);
 }
  
}

function createmonsters(){
  if(frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("alien",Aliensimage);
    monster.y=Math.round(random(100,300));
    monster.velocityY=-(8+score/10);
    monster.lifetime=100;
    monsterGroup.add(monster);
  }  
}
