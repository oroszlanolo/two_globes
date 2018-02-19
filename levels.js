function addLevel(num){
    switch(num){
        case 1:
            addLevel1();
            break;
        case 2:
            addLevel2();
            break;
        case 3:
            addLevel3();
            break;
        case 4:
            addLevel4();
            break;
        default:
            print("Level " + num + " not found.");
            break;
    }
    addBorder();
}

function addLevel1(){
	myStart = new startingPoint(200,HEIGHT/2,15);
	myGlobe.reset(myStart.x,myStart.y);
    myEnd = new EndPoint(600,300,60);
    
    level = [];
}

function addLevel4(){
	myStart = new startingPoint(75,75,15);
	myGlobe.reset(myStart.x,myStart.y);
    myEnd = new EndPoint(700,300,50);
    
    level = [];
	level.push(new Line(150,0,150,450));
	level.push(new Line(150,450,300,450,1));
	level.push(new Line(300,450,450,450,0));
	level.push(new Line(450,300,450,600));
    level.push(new Line(200,300,450,300));
}
function addLevel3(){
	myStart = new startingPoint(WIDTH/2,HEIGHT/4,20);
	myGlobe.reset(myStart.x,myStart.y);
    myEnd = new EndPoint(WIDTH/2,HEIGHT/4*3,40);
    
    level = [];
    level.push(new Rectangle(65,240,WIDTH-65,360));
}

function addLevel2(){
    myStart = new startingPoint(97,94,12.041594578792296);
	myGlobe.reset(myStart.x,myStart.y);
    myEnd = new EndPoint(683,512,58.034472514187634);
    level = [];
    level.push(new Line(2,202,601,201));
    level.push(new Line(799,404,190,401));
}

function addBorder(){
    level.push(new Line(0,0,0,HEIGHT));
    level.push(new Line(0,0,WIDTH,0));
    level.push(new Line(WIDTH,0,WIDTH,HEIGHT));
    level.push(new Line(0,HEIGHT,WIDTH,HEIGHT));
}