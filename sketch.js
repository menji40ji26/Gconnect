"use strict"

/*

To get you started, I have provided code that does the following:

    setup():
    Sets up a 6x6 array to store your data and initializes all values to the string "empty". I don't do anything
    else with the data, as this is your main challenge. HINT: You will need to add at least one more variable to
    this program that keeps track of the "state" of the game. You will probably want to make this additional a 
    global that is declared before setup(), as I declared grid, even though I initialized grid's value within 
    setup().
        
    mouseClicked():
    Calls functions to figure out which grid intersection is closest to the 
    mouse click and calls function to draw a stone at that intersection. 
    HINT: This function is one of two places where you have access to the 
    coordinates that would be handy for filling in your Array. You will 
    probably want to add other logic to this function, but you can also 
    add the logic elsewhere in the program. There is no "right" answer as 
    long as it works and as long as you can explain it!
    
    findNearestIndex(pt):
    Takes one Number as an argument. Returns one Number that represents the closest grid intersection. NOTE: Designed to only work for exactly this grid size and position. You don't have to change it to be more flexible this week, but think about how you might do it! You do not need to change this function at all.
    
    drawStone(x,y):
    Takes two Numbers between 0 and 5 as arguments. Converts these numbers to the corresponding x,y coordinate for that grid position and draws a w 50-pixel-diameter circle centered on the converted point. HINT: I have only written this to draw a w stone, but you also need to be able to draw a b stone. While there are a few ways to do this, and any method that you can explain is fine, I recommend adding a third argument to this function and using that argument and some conditional logic to figure out which color of stone to draw.
    
    clearAndDrawBoard():
    Clears the canvas and draws the grid lines for the board. HINT: Although you can get through the first parts of this assignment without calling this function again, you will likely need to call it once you reach the part of the assignment where stones get removed from the board upon capture! And of course once the board is cleared, you will need to redraw all of the pieces...but by this point, you should have some idea of how to loop through the Array to get each piece and redraw it!

*/

let grid;
let rows;
let cols;
//Add a state machine;
let whosTurn;
let winner;
let bKoList;
let wKoList;

//Testing
let wStones;
let wDead;


function setup() {
    restart();
}

function draw() {
    // TIP: you can probably leave the draw function empty for this assignment!
}

function mouseClicked() {


    if(!winner){
        let x = findNearestIndex(mouseX);
        let y = findNearestIndex(mouseY);

        //Check ko list
        if(whosTurn == "b"){
            for (let i = 0; i < bKoList.length; i++) {
                if(x == bKoList[i].x && y == bKoList[i].y){
                    showWarnning();
                    return;
                }
            }
        }
    
        //mission 1 Track which intersections are occupied
        if(grid[x][y] == "empty") {
    
            //SetStoneFaction
            grid[x][y] = whosTurn;
    
            //findLiberty();
            //clearGroup();
            //removeDead();

            //Testing
            findStoneGroup();
            clearAndDrawBoard();
            drawStone();
            checkWin();

            //refresh ko List
            if(whosTurn=="b"){

            }
    
            //mission 2 Track whose turn it is
            //Set next player
            if(whosTurn == "b")
                whosTurn = "w";
            else whosTurn = "b";
        } else {
            console.log(grid[x][y]);
        }
    } else {
        restart();
    }

    showHint();
 

}

//mission 3 (lite) Detect a vertical or horizontal win
function checkWin() {

    let bStones;
    let wStones;

    //Check vertical
    for (let i = 0; i < grid.length; i++) {
        bStones = 0;
        wStones = 0;
        for (let j = 0; j < grid.length; j++) {

            if(grid[i][j] == "b"){
                bStones ++;
                if(bStones == rows){
                    console.log("Black Won");
                    winner = "black";
                }
            } else if(grid[i][j] == "w"){
                wStones ++;
                if(wStones == rows){
                    console.log("White Won");
                    winner = "white";
                }
            }
        } 
    }


    //Check horizontal
    for (let i = 0; i < grid.length; i++) {
        bStones = 0;
        wStones = 0;
        for (let j = 0; j < grid.length; j++) {

            if(grid[j][i] == "b"){
                bStones ++;
                if(bStones == cols){
                    console.log("Black Won");
                    winner = "black";
                }
            } else if(grid[j][i] == "w"){
                wStones ++;
                if(wStones == cols){
                    console.log("White Won");
                    winner = "white";
                }
            }
        } 
    }
}

//mission 4 Add "game over" and "game restart" states
function restart() {
    rows = 6;
    cols = 6;
    grid = [];
    whosTurn = "b";
    winner = null;
    bKoList = [];
    wKoList = [];

    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = "empty";
        }
    }
    createCanvas(600, 700);
    clearAndDrawBoard();
    showHint();
}

//Trying on full "Detect Captures"
//Try using object
function stone(x, y, f) {
    this.x = x;
    this.y = y;
    this.faction = f;
}

function findStoneGroup() {
    wStones = [];
    wDead = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j] == "w"){
                wStones.push(new stone(i,j, "w"));
                wDead.push(new stone(i,j, "w"));
            }
        }
    }

    for (let i = 0; i < wStones.length; i++) {
        if(grid[wStones[i].x][wStones[i].y - 1] == "empty"
        || grid[wStones[i].x][wStones[i].y + 1] == "empty"
        || grid[wStones[i].x - 1][wStones[i].y] == "empty"
        || grid[wStones[i].x + 1][wStones[i].y] == "empty" ){
            wDead.pop(wStones[i]);
        }
    }
    console.log(wDead.length);
}

function findLiberty() {

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j] == "w" || grid[i][j] == "wGroup" ) {

                if(j>0) {
                    if(grid[i][j-1] == "w") {
                        grid[i][j-1] = "wGroup";
                        grid[i][j] = "wGroup";
                    }
                }
                if(j<5) {
                    if(grid[i][j+1] == "w") {
                        grid[i][j+1] = "wGroup";
                        grid[i][j] = "wGroup";
                    }
                }
                    
                if(i>0) {
                    if(grid[i-1][j] == "w") {
                        grid[i-1][j] = "wGroup";
                        grid[i][j] = "wGroup";
                    }
                }
                   
                if(i<5) {
                    if(grid[i+1][j] == "w") {
                        grid[i+1][j] = "wGroup";
                        grid[i][j] = "wGroup";
                    }
                }
                    
            }
        }
    }
    


}

function clearGroup(){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j] != "empty"){
                if(i > 0 && i < cols - 1 && j > 0 && j < rows - 1) {
                    if(grid[i][j-1] == "empty"
                    || grid[i][j+1] == "empty"
                    || grid[i-1][j] == "empty"
                    || grid[i+1][j] == "empty" ){

                        if(grid[i][j] == "wGroup" || grid[i][j] == "w"){
                            if(j>0)
                                if(grid[i][j-1] == "wGroup" || grid[i][j-1] == "w") {
                                    grid[i][j-1] = "w";
                                    grid[i][j] = "w";
                                }
                            if(j<5)
                                if(grid[i][j+1] == "wGroup" || grid[i][j+1] == "w") {
                                    grid[i][j+1] = "w";
                                    grid[i][j] = "w";
                                }
                            if(i>0)
                                if(grid[i-1][j] == "wGroup" || grid[i-1][j] == "w") {
                                    grid[i-1][j] = "w";
                                    grid[i][j] = "w";
                                }
                            if(i<5)
                                if(grid[i+1][j] == "wGroup" || grid[i+1][j] == "w") {
                                    grid[i+1][j] = "w";
                                    grid[i][j] = "w";
                                }
                        }
                    }
                        

                } 
            }
        }
    }
}

function removeDead(){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j] == "wGroup") {
                grid[i][j] = "empty";
            }
        }
    }
}

//mission 5 (lite) Detect captures
function checkLiberty(x, y) {

    // for (let i = 0; i < grid.length; i++) {
    //     for (let j = 0; j < grid[i].length; j++) {
    //         //this can only remove a piece of stone when it is surrounded by 4 opponent's stones
    //         if(whosTurn == "w"
    //         && grid[i][j] == "b"
    //         && i > 0 && i < 5 && j > 0 && j < 5
    //         && grid[i][j-1] == "w"
    //         && grid[i][j+1] == "w"
    //         && grid[i-1][j] == "w"
    //         && grid[i+1][j] == "w" ){

    //             //removeStone
    //             grid[i][j] = "empty";

    //             bKoList.push(new koStone(i, j));
    //             console.log(bKoList.length);

    //         } else if (whosTurn == "b" 
    //         && grid[i][j] == "w"
    //         && i > 0 && i < 5 && j > 0 && j < 5
    //         && grid[i][j-1] == "b"
    //         && grid[i][j+1] == "b"
    //         && grid[i-1][j] == "b"
    //         && grid[i+1][j] == "b" ){

    //             //removeStone
    //             grid[i][j] = "empty";
    //             wKoList.push(new koStone(i, j));

    //         }
    //     }
    // }
}

function koStone(x, y) {
    this.x = x;
    this.y = y;
}

function findNearestIndex(pt) {
    let nearest = Math.round(pt / 100 - 0.5);
    return nearest;
}

function drawStone() {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] != "empty"){

                //mission 2
                let stoneColor;
                //Check whos turn
                if(grid[i][j] == "b"){
                    stoneColor = 20;
                }
                else if(grid[i][j] == "w") {
                    stoneColor = 230;
                }
            
                fill(120, 100, 30, 100);
                ellipse(((i + .5) * 100) - 5, ((j + .5) * 100) + 5, 65, 65);
                fill(stoneColor);
                ellipse((i + .5) * 100, (j + .5) * 100, 65, 65);


            }
        }
    }
}

function clearAndDrawBoard() {
    background(180, 130, 70);
    stroke(100, 100, 80, 160);
    strokeWeight(3);
    for (let i = 0; i < 6; i++) {
        line((i + .5) * 100, 50, (i + .5) * 100, 550);
        line(50, (i + .5) * 100, 550, (i + .5) * 100);
    }

    noStroke();


}

//mission 6 Enforce "ko" rule
function showWarnning() {
    fill(150,60,10);
    textSize(18);
    text("* KO! Invalid Move! \n Can't Place on Where Your Chess Was Just Being Captured. \n Please Place on Another Intersection. *", 55,285);
}

function showHint() {

    fill(255);
    textSize(18);
    if(whosTurn == "b" && !winner)
        text("Black's turn. Click a grid intersection.", 50,610);
    else if(whosTurn == "w" && !winner) 
        text("White's turn. Click a grid intersection.", 50,610);
    
    if(winner == "black")
        text("Black Won! Click to restart...", 50,610);
    else if(winner == "white")
        text("White Won! Click to restart...", 50,610);

}
