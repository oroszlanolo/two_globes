//TODO: GUI reposition on resize
//TODO: time measuring
//TODO: Menu anumation
//TODO: button style upgrade
//TODO: WIN sceen

let colorEnum={
	Red: 0,
	Blue: 1,
	Black: 2
}
let gameStateEnum = {
	MainMenu : 0,
	LevelSelect : 1,
	Running : 2
}

const WIDTH = 840;
const HEIGHT = 600;

let myCanvas;

//Globes
let myGlobe;
//objects
let level = [];
let myEnd;
let myStart;

//Boolean
let running;
let isLevelLoading;
let hasWon;

//Integer
let deaths;
let levelCount;
let currentLevel;
let gameState;
let canvasX;
let canvasY;

function preload(){
	loadJSON("levels/levelInfo.json",loaded => {
		levelCount = loaded.levelCount;
	})
}


function setup() {
	myCanvas = createCanvas(WIDTH,HEIGHT);
	myCanvas.parent("canvasD");
	currentLevel = 1;
	deaths = 0;
	setupGUIElements();
	myGlobe = new Globes(0,0,40);
	running = false;
	hasWon = false;
	isLevelLoading = false;
	gameState = gameStateEnum.MainMenu;
	// loadLevel(currentLevel);
}

function draw() {
	switch(gameState){
		case gameStateEnum.MainMenu:
			drawMainMenu();
			break;
		case gameStateEnum.LevelSelect:
			drawLevelSelect();
			break;
		case gameStateEnum.Running:
			drawGame();
			break;
	}
}
function drawMainMenu(){
	background(255);
}
function drawLevelSelect(){

}

function drawGame(){
	if(isLevelLoading){
		return;
	}
	if(running){
		moveThings();
	}

	drawThings();

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

function moveThings(){
	if(mouseIsPressed){
		myGlobe.mini();
	}else{
		myGlobe.maxi();
	}
	myGlobe.move(mouseX,mouseY);

	if(isCrashed()){
		background(200,0,0);
		mainMenuButt.show();
		running = false;
		deaths++;
		deathsP.html("Deaths: " + deaths);
	}else{
		background(2255);
	}
	if(won()){
		background(20,255,20);
		running = false;
		hasWon = true;
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

function drawThings(){
	for(let obj of level){
		obj.draw();
	}

	if(myEnd){
		myEnd.draw();
	}
	if(myGlobe){
		myGlobe.draw();
	}
}

function mouseClicked(){
	//TODO: ??
	switch(gameState){
		case gameStateEnum.MainMenu:
			break;
		case gameStateEnum.LevelSelect:
			break;
		case gameStateEnum.Running:
			clickedGame();
			break;
	}
}

function clickedMenu(){

}
function clickedLevelSelect(){

}

function clickedGame(){
	if(!myStart){
		return;
	}
	if(!running && !hasWon && myStart.crash(new Cirkle(mouseX,mouseY,0))){
		myGlobe.reset(mouseX,mouseY);
		running = true;
		mainMenuButt.hide();
	}
	if(hasWon){
		startNewLevel();
		mainMenuButt.show();
	}
}




