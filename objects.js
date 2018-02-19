class Rectangle{
	constructor(x1,y1,x2,y2,color = colorEnum.Black){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
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
	draw(){
		drawRect(this.x1,this.y1,this.x2,this.y2,this.R,this.G,this.B);
	}
	crash(cirkle){
		if(this.color == cirkle.color){
			return false;
		}
		if(cirkle.x > this.x1-cirkle.r && cirkle.x < this.x2+cirkle.r && cirkle.y > this.y1-cirkle.r && cirkle.y < this.y2+cirkle.r){
			return true;
		}
		return false;
	}
}

class Line{
	constructor(x1,y1,x2,y2,color = colorEnum.Black){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
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

class EndPoint{
	constructor(xVal,yVal,r){
		this.x = xVal;
		this.y = yVal;
		this.r = r;
	}
	move(x,y){
		this.x = x;
		this.y = y;
	}
	draw(){
		drawCirkle(this.x,this.y,this.r,255,255,0);
	}
  crash(cirkle){
    if(dist(this.x,this.y,cirkle.x,cirkle.y) < this.r+cirkle.r){
      return true;
    }
    return false;
  }
};

class startingPoint{
	constructor(xVal,yVal,r){
		this.x = xVal;
		this.y = yVal;
		this.r = r;
	}
	inside(x,y){
		return dist(this.x,this.y,x,y) <= this.r;
	}
	draw(){
		drawStart(this.x,this.y,this.r);
	}
}
