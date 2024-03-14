var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

// Estados do jogo
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight); // Ajuste os tamanhos das janelas para se adequar ao dispositivo

  // Movendo plano de fundo
  path = createSprite(width / 2, height / 2); // Ajuste as posições do caminho e do jogador na tela
  path.addImage(pathImg);
  path.velocityY = 4;

  // criar menino correndo
  boy = createSprite(width / 2, height - 20, 20, 20); // Ajuste as posições do caminho e do jogador na tela
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  if (gameState === PLAY) {
    background(0);

    // Código para redefinir plano de fundo
    if (path.y > height) { // Modifique a condição de fundo infinito
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += 50; // Ajuste a pontuação de acordo com o tamanho da tela atual
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 100; // Ajuste a pontuação de acordo com o tamanho da tela atual

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 150; // Ajuste a pontuação de acordo com o tamanho da tela atual

    } else {
      if (swordGroup.isTouching(boy)) {
        gameState = END;

        boy.addAnimation("SahilRunning", endImg);
        boy.x = width / 2;
        boy.y = height / 2;
        boy.scale = 0.6;

        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();

        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

      }
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Tesouro: " + treasureCollection, width / 2 - 50, 30); // Ajuste a posição da pontuação
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(random(width / 2 - 150, width / 2 + 150), 40, 10, 10); // Modifique as posições de cash (dinheiro) para fazê-los aparecer em todos os tamanhos de telas
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = height / 3; // Modifique a condição de fundo infinito com base na altura atual do dispositivo
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(random(width / 2 - 150, width / 2 + 150), 40, 10, 10); // Modifique as posições de diamonds (diamantes) para fazê-los aparecer em todos os tamanhos de telas
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = height / 3; // Modifique a condição de fundo infinito com base na altura atual do dispositivo
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(random(width / 2 - 150, width / 2 + 150), 40, 10, 10); // Modifique as posições de jewelry (jóia) para fazê-los aparecer em todos os tamanhos de telas
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = height / 3; // Modifique a condição de fundo infinito com base na altura atual do dispositivo
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(random(width / 2 - 150, width / 2 + 150), 40, 10, 10); // Modifique as posições de swords (espadas) para fazê-las aparecer em todos os tamanhos de telas disponíveis
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = height / 3; // Modifique a condição de fundo infinito com base na altura atual do dispositivo
    swordGroup.add(sword);
  }
}
