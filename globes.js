class Globe{
	constructor(xVal,yVal,r,color){
		this.x = xVal;
		this.y = yVal;
		this.r = r;
		this.color = color;
		if(this.color == colorEnum.Red){
			this.R = 255;
			this.B = 0;
		}else{
			this.R = 0;
			this.B = 255;
		}
		this.G = 0;
		this.history = [];
	}
	move(x,y){
		this.history.push(createVector(this.x,this.y));
		if(this.history.length > 10){
			this.history.splice(0,1);
		}
		this.x = x;
		this.y = y;
	}
	draw(){
		drawCirkle(this.x,this.y,this.r,this.R,this.G,this.B);
		for(var i = 0; i < this.history.length; i+=2){
			var r = 2.5 * this.r / (this.history.length - i+2);
			var A = 255 * (i + 1) / this.history.length;
			drawCirkle(this.history[i].x,this.history[i].y,r,this.R,this.G,this.B,A);
		}
	}
};

class Globes{
	constructor(xVal,yVal,r,speed = 0.05){
		this.x = xVal;
		this.y = yVal;
		this.r = r;
		this.maxR = r;
		this.fi = 0;
		this.basicSpeed = speed;
		this.speed = speed
		this.blue = new Globe(this.x-this.r,this.y,10,colorEnum.Blue);
		this.red = new Globe(this.x+this.r,this.y,10,colorEnum.Red);
	}
	reset(x,y){
		this.fi = 0;
		this.r = this.maxR;
		this.speed = this.basicSpeed;
		this.move(x,y);
		this.blue.history = [];
		this.red.history = [];
	}
	mini(){
		if(this.r > this.maxR / 3){
			this.r--;
			this.speed += 0.005;
		}
	}
	maxi(){
		if(this.r < this.maxR){
			this.r++;
			this.speed -= 0.005;
		}
		if(this.r > this.maxR){
			this.r = this.maxR;
		}
	}
	move(x,y){
		this.x = x;
		this.y = y;
		this.rotate();
	}
	rotate(){
		this.fi += this.speed;
		if(this.fi >= 2*3.14){
			this.fi -= 2*3.14;
		}
		var a = sin(this.fi) * this.r;
		var b = cos(this.fi) * this.r;
	this.blue.move(this.x - a, this.y + b);
	this.red.move(this.x + a, this.y - b);
	}
	draw(){
		this.red.draw();
		this.blue.draw();
	}
}
