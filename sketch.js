var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword, swordImage, swordSound;
var fruit, fruit1, fruit2, fruit3, fruit4;
var microbe, microbeImg1, microbeImg2;
var gameOver, gameOverImg, gameOverSound;
var score = 0;

function preload() {
  //sword
  swordImage = loadImage("sword.png");
  //microbes
  microbeImg1 = loadImage("alien1.png");
  microbeImg2 = loadImage("alien2.png");
  //fruits
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  //gameOver
  gameOverImg = loadImage("gameover.png");
  //sounds
  gameOverSound = loadSound("gameover.mp3");
  swordSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //swordSprite
  sword = createSprite(300, 300, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  sword.lifeTime = 600;

  //groups
  fruitGroup = createGroup();
  microbeGroup = createGroup();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    fruit.y = Math.round(random(50, 540));
    fruit.velocityX = -7;

    fruit.setLifeTime = 100;

    fruitGroup.add(fruit);

  }
}

function microbesF() {
  if (World.frameCount % 200 === 0) {
    microbe = createSprite(400, 200, 20, 20);
    microbe.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r == 1) {
      microbe.addImage(microbeImg1);
    } else {
      microbe.addImage(microbeImg2);
    }

    microbe.y = Math.round(random(100, 500));
    //microbe.x = Math.round(random(100, 500));
    microbe.velocityX = -8;
    microbe.scale=0.7;
    microbe.setLifeTime = 50;
    microbeGroup.add(microbe);
    
  }

}

function draw() {
  background(rgb(101, 67, 22));
  
  if (gameState === PLAY) {
      text("Score :" + score, 300, 50);

      sword.x = World.mouseX;
      sword.y = World.mouseY;

      fruits();
      microbesF();
    
  if (sword.isTouching(fruitGroup)) {
    fruitGroup.destroyEach();
    swordSound.play();
    score = score + 2;
  }
  
  if (sword.isTouching(microbeGroup)) {
    microbeGroup.destroyEach();
    gameState = END;
  }

  if (gameState === END) {
    sword.addImage(gameOverImg);
    sword.x = 300;
    sword.y = 300;
    fruit.visible=false;
  }
  
}drawSprites();
}
