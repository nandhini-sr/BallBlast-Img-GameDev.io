var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth/2;

var c = canvas.getContext('2d');
var set = 0;

var groundHeight = 75;
var grassWidth = 0;

class Cannon
{
     constructor(x,y,width,height)
     {
     	this.x = x;
     	this.y = y;
     	this.width = width;
		this.height = height;
     	this.velocity = 5;
     }

     draw()
     {
        c.drawImage(cannon,this.x,this.y,this.width,this.height);
     }

    moveRight()
    {
    	this.x = this.x + this.velocity;
    }

    moveLeft()
    {
    	this.x = this.x - this.velocity;
    }

    update()
    {
    	if(set == 0)
    	{
    		if(this.x < 0 || this.x + this.width > canvas.width)
    	     {
    		this.velocity = -this.velocity;
    	      }
    	this.x = this.x + this.velocity;
    	this.draw();
    	}
    	
    }
}

class BackGround
{
	draw()
	{

		//basement
		c.beginPath();
		c.fillStyle = "#A2C523";
		c.fillRect(0,canvas.height - groundHeight,canvas.width,groundHeight);
		c.fillStyle = "#4caf50";
		c.fillRect(0,canvas.height - groundHeight+30,canvas.width,groundHeight-30);
		c.fillStyle = '#83f400';
		c.fillRect(0,canvas.height - groundHeight+50,canvas.width,groundHeight-50);
		c.closePath();

		//grass 
		grassWidth = canvas.width/20;
		for(let i =0; i<20; i++)
		{
		  c.beginPath();
		  c.fillStyle = '#4caf50';
		  c.moveTo(i*grassWidth,canvas.height - groundHeight+30);
		  c.lineTo(i*grassWidth + grassWidth,canvas.height - groundHeight+30);
		  c.lineTo(i*grassWidth + grassWidth/2,canvas.height - groundHeight+10);
		  c.lineTo(i*grassWidth,canvas.height - groundHeight+30);
		  c.fill();
		  c.closePath();
		}

		for(let i =0; i<20; i++)
		{
		  c.beginPath();
		  c.fillStyle = '#83f400';
		  c.moveTo(i*grassWidth,canvas.height - groundHeight+50);
		  c.lineTo(i*grassWidth + grassWidth,canvas.height - groundHeight+50);
		  c.lineTo(i*grassWidth + grassWidth/2,canvas.height - groundHeight+30);
		  c.lineTo(i*grassWidth,canvas.height - groundHeight+50);
		  c.fill();
		  c.closePath();
		}

	}
}

let cannonImage
let bg

function initializeSet()
{
	cannonImage = new Cannon((canvas.width/2 - 40),(canvas.height - 195),100,120);
	cannonImage.draw();
	bg = new BackGround;
	bg.draw();
}

function setloop(){

	c.clearRect(0,0,canvas.width,canvas.height);
    bg.draw();
    cannonImage.update();
    
    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.fillText('BALL BLAST',340,100);
  	
  	requestAnimationFrame(setloop);
  	} 

initializeSet();
setloop();