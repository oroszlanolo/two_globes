class Angular{
	constructor(x1,y1,x2,y2,color = colorEnum.Black){
		this.x1 = roundTo5(x1);
		this.y1 = roundTo5(y1);
		this.x2 = roundTo5(x2);
		this.y2 = roundTo5(y2);

		this.colorize(color);
	}
	colorize(color){
		this.color = color;
		if(this.color == colorEnum.Red){
			this.R = 255;
			this.B = 0;
		}else if(this.color == colorEnum.Blue){
			this.R = 0;
			this.B = 255;
		}else{
			this.R = 0;
			this.B = 0;
		}
		this.G = 0;
	}
	moveP1(x,y){
		this.x1 = roundTo5(x);
		this.y1 = roundTo5(y);
	}
	moveP2(x,y){
		this.x2 = roundTo5(x);
		this.y2 = roundTo5(y);
	}
}

class Rectangle extends Angular{
	constructor(x1,y1,x2,y2,color = colorEnum.Black){
		super(x1,y1,x2,y2,color);
		this.type = "rectangle";
	}

	draw(){
		drawRect(this.x1,this.y1,this.x2,this.y2,this.R,this.G,this.B);
	}
	crash(cirkle){
		if(this.color == cirkle.color){
			return false;
		}
		var x1,x2,y1,y2;
		if(this.x1 < this.x2){
			x1 = this.x1;
			x2 = this.x2;
		}else{
			x1 = this.x2;
			x2 = this.x1
		}
		if(this.y1 < this.y2){
			y1 = this.y1;
			y2 = this.y2;
		}else{
			y1 = this.y2;
			y2 = this.y1
		}
		return (cirkle.x > x1-cirkle.r && cirkle.x < x2+cirkle.r && cirkle.y > y1-cirkle.r && cirkle.y < y2+cirkle.r);
	}
}

class Line extends Angular{
	constructor(x1,y1,x2,y2,color = colorEnum.Black){
		super(x1,y1,x2,y2,color);
		this.type = "line";
	}
	draw(){
		drawLine(this.x1,this.y1,this.x2,this.y2,this.R,this.G,this.B);
	}
	crash(cirkle){
		if(cirkle.color == this.color){
			return false;
		}
		var A = this.y2 - this.y1;
		var B = this.x1 - this.x2;
		var C = (this.x2-this.x1)*this.y1 - (this.y2-this.y1)*this.x1;
		var d = abs(A*cirkle.x + B*cirkle.y + C) / sqrt(pow(A,2)+pow(B,2));
		if(d > cirkle.r){
			return false;
		}
		var a = dist(this.x1,this.y1,cirkle.x,cirkle.y);
		var b = dist(this.x2,this.y2,cirkle.x,cirkle.y);
		var c = dist(this.x1,this.y1,this.x2,this.y2);
		if(a > cirkle.r && a*a+c*c<b*b){
			return false;
		}
		if(b > cirkle.r && b*b+c*c<a*a){
			return false;
		}
		return true;
	}
}


class Cirkle{
	constructor(xVal,yVal,r,color = colorEnum.Black){
		this.type = "cirkle";
		this.x = roundTo5(xVal);
		this.y = roundTo5(yVal);
		this.setR(r);
		this.colorize(color);
	}
	colorize(color){
		this.color = color;
		if(this.color == colorEnum.Red){
			this.R = 255;
			this.B = 0;
		}else if(this.color == colorEnum.Blue){
			this.R = 0;
			this.B = 255;
		}else{
			this.R = 0;
			this.B = 0;
		}
		this.G = 0;
	}
	move(x,y){
		this.x = roundTo5(x);
		this.y = roundTo5(y);
	}
	setR(d){
		this.r = roundTo5(d);
		if(this.r < 5){
			this.r = 5;
		}
	}
	crash(cirkle){
	  return (this.color != cirkle.color && dist(this.x,this.y,cirkle.x,cirkle.y) < this.r+cirkle.r);
	}
	draw(){
		if(this.type == "cirkle"){
			drawCirkle(this.x,this.y,this.r,this.R,this.G,this.B, 100, "");
		}else{
			drawCirkle(this.x,this.y,this.r,this.R,this.G,this.B, 100, this.type.toUpperCase());
		}
	}
}

class EndPoint extends Cirkle{
	constructor(xVal,yVal,r){
		super(xVal,yVal,r);
		this.type = "end";
		this.R = 255;
		this.G = 255;
		this.B = 0;
	}
};

class startingPoint extends Cirkle{
	constructor(xVal,yVal,r){
		super(xVal,yVal,r);
		this.type = "start";
		this.R = 255;
		this.G = 255;
		this.B = 255;
	}
	crash(cirkle){
		return dist(this.x,this.y,cirkle.x,cirkle.y) <= this.r;
	}
}

function roundTo5(x){
	var rem = (x % 5);
	if(rem < 2.5){
		return x - (x % 5);
	}else{
		return x - (x % 5) + 5;
	}
}

//Drawing functions

function drawRect(x1,y1,x2,y2,R,G,B, A = 100){
	stroke(R,G,B);
	fill(R,G,B,A);
	rect(x1,y1,x2-x1,y2-y1);
}

function drawLine(x1,y1,x2,y2,R,G,B,A=255){
	stroke(R,G,B,A);
	line(x1,y1,x2,y2);
}

function drawNextLevel(){
	fill(230,230,230,100);
	stroke(0,200,0,100);
	rect(0,0,WIDTH,HEIGHT);
	fill(0,150,0,100);
	stroke(0,150,0,180);
	textSize(72);
	textAlign(CENTER);
	text("NEXT LEVEL",WIDTH/2,HEIGHT/2);
}
function drawCirkle(x,y,r,R,G,B,A, tt){
	stroke(R,G,B);
	fill(R,G,B,A);

	ellipse(x,y,2*r);
	if(tt){
		stroke(0,0,0);
		fill(0,0,0);
		textAlign(CENTER,CENTER);
		textSize(r/2);
		text(tt,x,y);
		if(tt == "START"){
			fill(100,100,100,200);
			stroke(100,100,100,200);
			rect(0,0,WIDTH,HEIGHT);
		}
	}
}