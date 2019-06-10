var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth/2;

var c = canvas.getContext('2d');

var tryBtn = document.getElementById('tryAgainBtn');
tryBtn.style.display = 'block';


function looptryHack(){

	c.clearRect(0,0,canvas.width,canvas.height);
    bg.draw();
    cannonImage.x = canvas.width/2 - 70;
    cannonImage.y = canvas.height - 195;
    cannonImage.velocity = 0;
    cannonImage.draw();
    tryBtn.style.display = 'block';

    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.fillText('GAME OVER',340,150);

    
    if(score>highScoreI)
    {
        c.font = 'bold 30px Open Sans';
        c.fillText('Your High Score: ' + score,350,200); 
    }
    else
    {
       c.font = 'bold 30px Open Sans';
       c.fillText('High Score: ' + highScoreI,350,200);
       c.fillText('Your Score: ' + score,350,250);
    }
  	
  	requestAnimationFrame(looptryHack);
  	} 

looptryHack();