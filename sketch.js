//TODO: map loading from separate JSON files

let colorEnum={
	Red: 0,
	Blue: 1,
	Black: 2
}

const WIDTH = 840;
const HEIGHT = 600;

let levelData;

let myGlobe;
let level = [];
let currentLevel;
let myEnd;
let myStart;
let running;
let hasWon;
let deaths;

let levelP;
let deathsP;

function preload(){
	levelData = loadJSON("levels.json");
}

function setup() {
	createCanvas(WIDTH,HEIGHT);
	currentLevel = 1;
	levelP = createP('LEVEL ' + currentLevel);
	levelP.style("padding-left","10px");
	deathsP = createP('Deaths: ' + 0);
	deathsP.style("padding-left","10px");
	background(200);
	fill(255,0,0);
	stroke(255,0,0);
	myGlobe = new Globes(0,0,40);
	running = false;
	hasWon = false;
	deaths = 0;
	loadLevel(currentLevel);
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
			deaths++;
			deathsP.html("Deaths: " + deaths);
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
	if(myEnd){
		myEnd.draw();
	}
	if(myGlobe){
		myGlobe.draw();
	}
	if(!running){
		if(hasWon){
			drawNextLevel();
		}else{
			if(myStart){
				myStart.draw();
			}
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
	if(!running && !hasWon && myStart.crash(new Cirkle(mouseX,mouseY,0))){
		myGlobe.reset(mouseX,mouseY);
		running = true;
	}
	if(hasWon){
		startNewLevel();
	}
}

function startNewLevel(){
	running = false;
	hasWon = false;
	currentLevel ++;
	if(currentLevel > levelData.levels.length){
		currentLevel = 1;
	}
	levelP.html('LEVEL ' + currentLevel);
	loadLevel(currentLevel);
}



