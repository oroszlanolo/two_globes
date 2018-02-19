let colorEnum={
	Red: 0,
	Blue: 1,
	Black: 2
}

const WIDTH = 800;
const HEIGHT = 600;

let myGlobe;
let level = [];
let currentLevel;
let myEnd;
let myStart;
let running;
let hasWon;
function setup() {
	createCanvas(WIDTH,HEIGHT);
	currentLevel = 1;
	levelP = createP('LEVEL ' + currentLevel);
	levelP.style("padding-left","10px");
	background(200);
	fill(255,0,0);
	stroke(255,0,0);
	myGlobe = new Globes(0,0,50);
	running = false;
	hasWon = false;
	addLevel(currentLevel);
}

function draw() {
	if(running){
		if(mouseIsPressed){
			myGlobe.mini();
		}else{
			myGlobe.maxi();
		}
		myGlobe.move(mouseX,mouseY);

		if(isCrashed()){
			background(200,0,0);
			running = false;
		}else{
			background(200);
		}
		if(won()){
			background(20,255,20);
			running = false;
			hasWon = true;
		}
	}
	drawObjects();
	myEnd.draw();
	myGlobe.draw();
	if(!running){
		if(hasWon){
			drawNextLevel();
		}else{
			myStart.draw();
		}
	}
}

function won(){
	return myEnd.crash(myGlobe.red) || myEnd.crash(myGlobe.blue)
}

function isCrashed(){
	for(let obj of level){
		if(obj.crash(myGlobe.red) || obj.crash(myGlobe.blue)){
			return true;
		}
	}
	return false;
}

function drawObjects(){
	for(let obj of level){
		obj.draw();
	}
}

function mouseClicked(){
	if(!running && !hasWon && myStart.inside(mouseX,mouseY)){
		running = true;
	}
	if(hasWon){
		startNewLevel();
	}
}

function startNewLevel(){
	running = false;
	hasWon = false;
	currentLevel++;
	levelP.html('LEVEL ' + currentLevel);
	addLevel(currentLevel);
}


//Drawing functions

function drawCirkle(x,y,r,R,G,B){
	stroke(R,G,B);
	fill(R,G,B);
	ellipse(x,y,2*r);
}
function drawRect(x1,y1,x2,y2,R,G,B){
	stroke(R,G,B);
	fill(R,G,B,100);
	rect(x1,y1,x2-x1,y2-y1);
}

function drawLine(x1,y1,x2,y2,R,G,B){
	stroke(R,G,B);
	line(x1,y1,x2,y2);
}
function drawStart(x,y,r){
	fill(100,100,100,100);
	stroke(100,100,100,100);
	rect(0,0,WIDTH,HEIGHT);
	fill(255,255,255);
	ellipse(x,y,2*r);
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
