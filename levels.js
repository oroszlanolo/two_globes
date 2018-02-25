function loadLevel(num){
    if(num > levelData.levels.length){
        return;
    }
    num--;
    var sPoint = levelData.levels[num].start;
    myStart = new startingPoint(sPoint.x,sPoint.y,sPoint.r);
	myGlobe.reset(myStart.x,myStart.y);

    var ePoint = levelData.levels[num].end;
    myEnd = new EndPoint(ePoint.x,ePoint.y,ePoint.r);

    var obs = levelData.levels[num].objects;
    level = [];
    for(var i = 0; i < obs.length; i++){
        switch(obs[i].type){
            case "line":
            loadLine(obs[i]);
            break;
            case "rectangle":
            loadRect(obs[i]);
            break;
        }
    }
    addBorder();
}

function loadLine(ln){
    var tmpLine = new Line(ln.x1,ln.y1,ln.x2,ln.y2,ln.color);
    level.push(tmpLine);
}
function loadRect(rt){
    var tmpRect = new Rectangle(rt.x1,rt.y1,rt.x2,rt.y2,rt.color);
    level.push(tmpRect);
}

function addBorder(){
    level.push(new Line(0,0,0,HEIGHT));
    level.push(new Line(0,0,WIDTH,0));
    level.push(new Line(WIDTH,0,WIDTH,HEIGHT));
    level.push(new Line(0,HEIGHT,WIDTH,HEIGHT));
}