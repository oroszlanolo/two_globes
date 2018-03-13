
//pharagraph
let levelP;
let deathsP;

//buttons
let menuButtons = [];
let newGameButt;
let continueButt;
let levelSelectButt;

let mainMenuButt;

let levelSelectButts = [];
let startSelectedLevelButt;
let levelSelector;
let selectP;

function setupGUIElements(){
    levelP = createP('LVL ' + currentLevel);
    // levelP.style("padding-left","10px");
	deathsP = createP('Deaths: ' + deaths);
    // deathsP.style("padding-left","10px");
    setupMainMenu();
    setupLevelSelect();
    
    mainMenuButt = createButton("MAIN MENU");
    mainMenuButt.mouseClicked(CBMainMenu);
    mainMenuButt.size(100,30);
    mainMenuButt.mouseOver(mouseOnButton);
    mainMenuButt.mouseOut(mouseOutButton);
    mainMenuButt.hide();

    setPositions();
}

function setupLevelSelect(){
    startSelectedLevelButt = createButton("START");
    levelSelectButts.push(startSelectedLevelButt);
    startSelectedLevelButt.mouseClicked(CBStartSelected);
    startSelectedLevelButt.size(300,100);
    startSelectedLevelButt.mouseOver(mouseOnButton);
    startSelectedLevelButt.mouseOut(mouseOutButton);
    startSelectedLevelButt.hide();

    selectP = createP("Select a level:");
    levelSelectButts.push(selectP);
    selectP.style("font-size","30px");
    selectP.size(200,100);
    selectP.style("text-align","center");
    selectP.hide();

    levelSelector = createSelect();
    levelSelectButts.push(levelSelector);
    for(var i = 1; i <= levelCount; i++){
        levelSelector.option(i);
    }
    levelSelector.size(100,50);
    levelSelector.style("font-size","20px");
    levelSelector.hide();

}

function setupMainMenu(){
    newGameButt = createButton("NEW GAME");
    menuButtons.push(newGameButt);
    newGameButt.mouseClicked(CBNewGame);
    newGameButt.size(300,100);
    newGameButt.mouseOver(mouseOnButton);
    newGameButt.mouseOut(mouseOutButton);
    
    continueButt = createButton("CONTINUE");
    menuButtons.push(continueButt);
    continueButt.mouseClicked(CBContinue);
    continueButt.size(300,100);
    continueButt.mouseOver(mouseOnButton);
    continueButt.mouseOut(mouseOutButton);
    
    levelSelectButt = createButton("SELECT LEVEL");
    menuButtons.push(levelSelectButt);
    levelSelectButt.mouseClicked(CBLevelSelect);
    levelSelectButt.size(300,100);
    levelSelectButt.mouseOver(mouseOnButton);
    levelSelectButt.mouseOut(mouseOutButton);
}

function windowResized(){
    print("valami");
    setPositions();
}

function setPositions(){
	canvasX = myCanvas.position().x;
	canvasY = myCanvas.position().y;
    levelP.position(canvasX + 10, canvasY - 5);
    deathsP.position(canvasX + width - 100, canvasY - 5);
    mainMenuButt.position(canvasX + width/2 - 50, canvasY + height - 30);
    startSelectedLevelButt.position(canvasX + width/2 - 150, canvasY + height/5*3);
    selectP.position(canvasX + width/2 - 100, canvasY + height/3 - 50);
    levelSelector.position(canvasX + width/2 - 50, canvasY + height/2 - 25);
    newGameButt.position(canvasX + width/2 - 150, canvasY + 100);
    continueButt.position(canvasX + width/2 - 150, canvasY + 220);
    levelSelectButt.position(canvasX + width/2 - 150, canvasY + 340);
}



function mouseOutButton(){
    this.style("color","black");
}
function mouseOnButton(){
    this.style("color","red");
}

function switchGameState(gs){
    gameState = gs;

	switch(gameState){
		case gameStateEnum.MainMenu:
            showMain();
            hideSelectLevel();
            mainMenuButt.hide();
			break;
		case gameStateEnum.LevelSelect:
            hideMain();
            showSelectLevel();
            mainMenuButt.show();
			break;
		case gameStateEnum.Running:
            hideMain();
            hideSelectLevel();
            mainMenuButt.show();
			break;
	}
}
function hideMain(){
    for(let butt of menuButtons){
        butt.hide();
    }
}
function showMain(){
    for(let butt of menuButtons){
        butt.show();
    }
}
function hideSelectLevel(){
    for(let butt of levelSelectButts){
        butt.hide();
    }
}
function showSelectLevel(){
    for(let butt of levelSelectButts){
        butt.show();
    }
    levelSelector.value("1");
}





function CBNewGame(){
    switchGameState(gameStateEnum.Running);
    currentLevel = 1;
	levelP.html('LVL ' + currentLevel);
    deaths = 0;
    deathsP.html("Deaths: " + deaths);
    hasWon = false;
    isLevelLoading = true;
    loadLevel(currentLevel);
}

function CBContinue(){
    switchGameState(gameStateEnum.Running);
    isLevelLoading = true;
    loadLevel(currentLevel);
}

function CBLevelSelect(){
    switchGameState(gameStateEnum.LevelSelect);
}

function CBMainMenu(){
    switchGameState(gameStateEnum.MainMenu);
    running = false;
}
function CBStartSelected(){
    currentLevel = int(levelSelector.value());
	levelP.html('LVL ' + currentLevel);
    deaths = 0;
    deathsP.html("Deaths: " + deaths);
    hasWon = false;
    CBContinue();
}