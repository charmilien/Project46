var bg, bgi;
var boat, boatImage, boatSound, dashSound;
var brd1,brd2;
var obs,obsGroup;
var score=0;
var highScore=0;
var gameState="play";

function preload()
{
  bgi=loadImage("waterbg.png");
  boatImage=loadImage("boat.png")
  boatSound=loadSound("running boat.wav")
  dashSound=loadSound("dash.wav")
}

function setup()
{
  createCanvas(displayWidth,displayHeight)
  bg=createSprite(width/2,height/2,width,height)
  bg.addImage(bgi);
  bg.scale=3.5
  bg.velocityY=5;
  
  boat=createSprite(width/2,height*3/4)
  boat.addImage(boatImage)
  boat.scale=0.10
  brd1=createSprite(width/6*2,height/2,2,height)
  brd2=createSprite(width/6*4,height/2,2,height)
  brd1.visible=false
  brd2.visible=false
  
  obsGroup= new Group();
}

function draw()
{
  background(25)
  
    if(gameState==="play")
  {    
    boatSound.play();

    if(bg.y>height-70) { bg.x=width/2; bg.y=height/2}
    
    score=score + Math.round(getFrameRate()/60)
    if(highScore<score){ highScore=score;}
    bg.velocityY=5+ score/200

    if(keyDown("left") )   
    {  
      boat.velocityX=-4;  
      boat.velocityY=0; 
    }
    if(keyDown("right") )  
    {  
      boat.velocityX=4; 
      boat.velocityY=0; 
    } 
    if(keyWentDown("up") )  
    {  
      boat.velocityY=-1; 
    } 
    if(keyWentDown("down"))  
    {  
      boat.velocityY=1; 
    } 
    boat.bounceOff(brd1); boat.bounceOff(brd2);

       getObs(); 

      if(obsGroup.isTouching(boat))
         {  boatSound.stop();dashSound.play();  gameState="End"; }
  }

  drawSprites();

  if (gameState==="End")
    {
      bg.velocityY=0;
      boat.velocityX=0;
      boat.velocityY=0;
      obsGroup.setVelocityYEach(0)
      obsGroup.setLifetimeEach(-1)
      textSize(30)
        stroke("black")
        strokeWeight(5)
      fill("yellow");
      text('Press *** R *** to Restart',width/5*2,height/2)
    }
  
  if(keyDown("r") && gameState==="End")
    {
      obsGroup.destroyEach();
      score=0;
      gameState="play";
     // bg.velocityY=5;
    }
  
  strokeWeight(3)
  textSize(20)
  stroke("black")
  fill("green")
   text("Your Score : " + score,width/3,60)
   text("High Score:  " + highScore, width/3,30)
}



function getObs()
{
  if(frameCount%40===0)
    {
      obsSize=random(15,40)
  obs=createSprite(random(width/6*2,width/6*4),-20,obsSize,obsSize+10)
      num=Math.round(random(1,5))
      if(num===1){ obs.shapeColor="red"}
      if(num===2){ obs.shapeColor="blue"}
      if(num===3){ obs.shapeColor="green"}
      if(num===4){ obs.shapeColor="black"}
      if(num===5){ obs.shapeColor="orange"}
  
  obs.velocityY=5+ score/100;
  obs.lifetime=displayHeight/5;
      obs.depth=boat.depth
      boat.depth++
      //console.log(num)
      
      obsGroup.add(obs);
    }
}
