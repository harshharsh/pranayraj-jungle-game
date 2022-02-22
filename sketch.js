var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletImg;
// var house, houseImg;

//variable for life
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var hearts;

var food, foodImg;

var foodGroup;

var dieSound, hitSound, shootSound;

var deaths;

var score = 0;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  bgImg = loadImage("jungle.jpg")

  houseImg = loadImage("assets/house.png");

  foodImg = loadImage("food1.png");

  bulletImg = loadImage("assets/bullet.png");

  dieSound = loadSound("assets/die.mp3");

  hitSound = loadSound("assets/hit.mp3");

  shootSound = loadSound("assets/hit.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-1,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.5
  
  //creating sprites to depict lives remaining
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
heart2.visible = false
heart2.addImage(heart2Img);
heart2.scale = 0.4

heart3 = createSprite(displayWidth-150,40,50,50);
heart3.visible = true
heart3.addImage(heart3Img);
heart3.scale = 0.4

// house = createSprite(displayWidth-1300, displayHeight-300, 50, 50);
// house.addImage(houseImg);
// house.scale = 0.7;

//creating the player sprite
player = createSprite(displayWidth-1200, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


   foodGroup = new Group();


  lives = 3;
  deaths = 0;


  bulletGroup = createGroup();
}

function draw() {
  background(0); 
  drawSprites();
  enemy();


  //scoring
 
  
  
//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-10
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+10
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 createBullet();
  player.addImage(shooter_shooting)
 shootSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (foodGroup.isTouching(player)){
  for(var i=0;i<foodGroup.length;i++){     
      
    if(foodGroup[i].isTouching(player)){
         foodGroup[i].destroy()
        lives = lives - 1;
        deaths = deaths + 1;

        dieSound.play();
        
        
        } 
   }
}

if (lives === 0){
  food.destroy();
  food.velocityX = 0;
  player.destroy();
  stroke("white");
  textSize(40);
  fill("white");
  text("GAME OVER",displayWidth-600, displayHeight-600);
}

if (deaths === 1){
  heart3.visible = false;
  heart2.visible = true;
}

if (deaths === 2){
  heart2.visible = false;
  heart1.visible = true;
}

if (deaths === 3){
  heart1.visible = false;
  text("GAME OVER",displayWidth-600, displayHeight-600);
}

if (score === 10){
  stroke("white");
  textSize(40);
  fill("white");
  text("You win",displayWidth-600, displayHeight-600);
 
  stroke("white");
  textSize(40);
  fill("white");
  text("Good job, you survived!",displayWidth-700, displayHeight-700);
  foodGroup.destroyEach();
}

if(bulletGroup.isTouching(foodGroup)){
  foodGroup.destroyEach();
  bulletGroup.destroyEach();
  score = score + 1;
  hitSound.play();
}


console.log(score);






stroke("white");
  textSize(40);
  fill("white");
text("score:" + score, 270,30);


}
function enemy(){
if (frameCount % 150 === 0) {  
  food = createSprite(random(1400,1500),random(400,800),50,50);
  food.addImage(foodImg);
  food.scale = 0.5
  food.velocityX = -5;
  
  food.debug = true
  food.setCollider("rectangle",0,0,400,400)
  
  food.lifetime = 290;

  foodGroup.add(food);
  }
}

function createBullet() {
  var bullet = createSprite(100,100,60,10);
  bullet.addImage(bulletImg);
  bullet.x = 360;
  bullet.y = player.y; 
  bullet.velocityX = 50;
  bullet.lifetime = 150;
  bullet.scale = 0.1;
  bulletGroup.add (bullet);

}