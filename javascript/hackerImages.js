var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth/2;

var c = canvas.getContext('2d');

var rockList = [rock1,rock3,rock7,rock14,rock15,rock22,rock28,rock30,rock44,rock46];
var score = 0;
set = 1; 

var highScoreI = localStorage.getItem('highScoreI');
if(!highScoreI)
{
     highScoreI = 0;
     localStorage.setItem('highScoreI',0);
}


var playBtn = document.getElementById('playBtn');
playBtn.style.display = 'none';

sound.play();

function randomIntFromRange(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function randomIndex(rockList){
	return (Math.floor(Math.random()*rockList.length));
}


//rectangle- rectangle collision
function collided(im1x,im1y,im1width,im1height,im2x,im2y,im2width,im2height)
{
  if (im1x < im2x + im2width &&
   im1x + im1width > im2x &&
   im1y < im2y + im2height &&
   im1y + im1height > im2y) {
    return 1;
  }
  else
  {
  return 0;
  }

}



document.addEventListener('keydown', myKeyDown);


class BulletSet{
	constructor(x,y,width,height)
	{   
    this.x = x + 36;
		this.y = y;
    this.width = width;
    this.height = height;
		this.velocity = 5;
	}

	draw()
	{
      c.drawImage(bullet,this.x,this.y,this.width,this.height); 
	}

	update()
	{
		this.y = this.y - this.velocity;

		this.draw();
	}
}

function bulletRelease(bulletRepeat)
{
  timerBullet = setInterval(function(){

  bulletSets.push(new BulletSet(cannonImage.x, cannonImage.y - 12, 10,10));
  bulletSets.push(new BulletSet(cannonImage.x+10, cannonImage.y - 12, 10,10));
  bulletSets.push(new BulletSet(cannonImage.x+20, cannonImage.y - 12, 10,10));

  },bulletRepeat);
}

class Rock
{
    constructor(x,y,dx,dy,num,count,dec)
    {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.gravity = 1;
      this.count = count;
      this.num = num;
      this.width = 40 + ((this.num)*8);
      this.height = 40 + ((this.num)*8);
      this.hit = 0;
      this.dec = dec;

    }

    draw()
    {
      c.drawImage(rockList[this.num],this.x,this.y,this.width,this.height);
    }

    update()
    {
      if(this.y +this.height+ groundHeight > canvas.height)
    {
      this.dy = -this.dy
      this.count = 1;
    }

    else{

          this.dy +=this.gravity;
         }

        if(this.count)
        {
            if(this.y <= 0)
              this.dy = -this.dy;
        }

         if(this.count)
         {
          if(this.x <= 0)
          {
            this.dx = -this.dx;
          }
         }

    if(this.x + this.width +this.dx > canvas.width)
         {
          this.dx = -this.dx;
          this.count = 1;
         }

    this.x += this.dx;
    this.y += this.dy;


    //COLLISION DETECTION
    rocks.forEach((roCk,index1) => {

      bulletSets.forEach((bulletset,index)=>{
      
      if(collided(roCk.x,roCk.y,roCk.width,roCk.height,bulletset.x,bulletset.y,bulletset.width,bulletset.height))
      {

        bulletSets.splice(index,1);
        score = score + 1;
        roCk.hit = roCk.hit + 1;

        if(roCk.hit>=4)
        {
          var newIndex = roCk.num - 1;
          var newDec = roCk.dec + 1;

        if(newIndex>=0)
        {
          
          if(roCk.dx>0)
          {
            var dx = 2;
          }
          else
          {
            var dx = -2;
          }
          
          rocks.push(new Rock(roCk.x,roCk.y,dx,roCk.dy,newIndex,1,newDec));
        }

        else if(newIndex<0)
        {

          var splitIndex = roCk.dec-1;
          
          if(splitIndex>1)
          {
            rocks.push(new Rock(roCk.x,roCk.y,-2,roCk.dy,splitIndex,1,0));
            rocks.push(new Rock(roCk.x,roCk.y,2,roCk.dy,splitIndex,1,0));
          }
          
        }

        rocks.splice(index1,1);

        }

        //speed increase

        if(score % 10 == 0)
          { 
            nextbulletTime = nextbulletTime - 2;
            if(nextbulletTime<=50)
            {
              nextbulletTime = 50;
            }
            clearInterval(timerBullet);
            bulletRelease(nextbulletTime);
          }

          if(score>highScoreI) //High Score
          {
            localStorage.setItem('highScoreI',score);
          }


        
      }
        
      });
     
     //rock and cannon collision

     //projected part
      if(collided(roCk.x,roCk.y,roCk.width,roCk.height,cannonImage.x+35.71,cannonImage.y,28.6,63.26))
      {
        gameOver();
      }
      //bottom rectangular part
      else if(collided(roCk.x,roCk.y,roCk.width,roCk.height,cannonImage.x,cannonImage.y+63.26,100,67.39))
      {
        gameOver();
      }
      
    });
    this.draw();
    }

}

function rockRelease()
{
  timerRock = setInterval(function(){
    
  var dy = randomIntFromRange(-1,1);
  var y = randomIntFromRange(10,canvas.height/4);
  randIndex = randomIndex(rockList);
  rocks.push(new Rock(0,y,2,dy,randIndex,0,0));

  },8000)
}


function myKeyDown()
{
	//A-65 ; D-68 ; <-37 ; >-39 ; enter-13 ; spaceBar-32

	if(event.keyCode == 65  || event.keyCode == 37)
	{
		if(cannonImage.x < 0)
		{
			//don't move
		}
		else{
			cannonImage.moveLeft();
		}

	}
	else if(event.keyCode == 68 || event.keyCode == 39)
	{
		if(cannonImage.x + cannonImage.width > canvas.width)
		{
			//don't move
		}
		else{
			cannonImage.moveRight();
		}
		
	}
}


let bulletSets = [];
let nextbulletTime = 150;
let rocks = [];


function initialize()
{
	cannonImage.x = canvas.width/2 - 40;
  cannonImage.y = canvas.height - 195;
  cannonImage.velocity = 15;
	cannonImage.draw();
  

  var dy = randomIntFromRange(-1,1);
  var y = randomIntFromRange(10,canvas.height/4);
  randIndex = randomIndex(rockList);
  rocks.push(new Rock(1,y,2,dy,randIndex,1,0));
  
  bulletRelease(nextbulletTime);
  rockRelease();
	bg.draw();
}

function gameOver()
{
  clearInterval(timerRock);
  clearInterval(timerBullet);
  bulletSets.splice(0,bulletSets.length);
  rocks.splice(0,rocks.length);
  sound.pause();
  setJS('tryHackImage.js');
}

function gameLoop()
{

	c.clearRect(0,0,canvas.width,canvas.height); 
	bg.draw();
	cannonImage.draw();

    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
    c.textAlign = 'center';

    bulletSets.forEach(bulletset => {
       
        bulletset.update();

    });
     
    rocks.forEach(roCk => {
       
        roCk.update();
        

    });
    
    
    if(score>highScoreI)
    {
        c.fillText('High Score: ' + score,500,120);	
    }
    else
    {
    	c.fillText('Score: ' + score,500,120);
    }
    
	requestAnimationFrame(gameLoop);
}

initialize();
gameLoop();