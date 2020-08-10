//global variable
//accesible to all functions
var sol =
    [[0, 7, 0, 2, 3, 8, 0, 0, 0],
    [0, 0, 0, 7, 4, 0, 8, 0, 9],
    [0, 6, 8, 1, 0, 9, 0, 0, 2],
    [0, 3, 5, 4, 0, 0, 0, 0, 8],
    [6, 0, 7, 8, 0, 2, 5, 0, 1],
    [8, 0, 0, 0, 0, 5, 7, 6, 0],
    [2, 0, 0, 6, 0, 3, 1, 9, 0],
    [7, 0, 9, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 9, 7, 4, 0, 8, 0]];
//this function prints the board
var matches = document.querySelectorAll("td");

var newPuzzle = () => {
    var request = new XMLHttpRequest();
    request.open("GET", "https://sugoku.herokuapp.com/board?difficulty=random" , true);
    request.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data.board);
        sol = data.board;
        printBoard();
    }
    request.send();
}

var clickButton = () => {
    solve();
    printBoard();
}

var printBoard = function () {
    let i = 0;
    let j = 0;
    let sudokuSpaceCount = 0;
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            matches[sudokuSpaceCount].innerHTML = sol[i][j];
            sudokuSpaceCount++;
        }
    }

};

var solve = function() {
    var row = 0;
    var col = 0;
    var number = 0;
    for(row = 0; row < 9; row++){
        for(col = 0; col < 9; col++){
            if(sol[row][col] == 0){
                for(number = 1; number <= 9; number++){
                    if(isOk(row, col, number)){
                        sol[row][col] = number;

                        if(solve()){
                            return true;
                        }
                        else{
                            sol[row][col] = 0;
                        }
                    }
                }
                return false;
            }      
        }
    }
    return true;
};

var isInRow = (row , number) => {
    let i =0;
    for(i = 0; i < 9; i++){
        if(sol[row][i] == number){
            return true;
        }
    }
    return false;
}

var isInCol = (col , number) => {
    let i =0;
    for(i = 0; i < 9; i++){
        if(sol[i][col] == number){
            return true;
        }
    }
    return false;
}

var isInBox = (row , col, number) => {
    let r = Math.floor(row / 3) * 3;
    let c = Math.floor(col /3) * 3;

    let i = 0; 
    let j = 0;
    for(i = r; i < r + 3; i++){
        for(j = c; j < c + 3; j++){
            if(sol[i][j] == number){
                return true;
            }
        }
    }

    return false;
}

var isOk = (row , col, number) => {
    return !isInRow(row, number) && !isInCol(col, number) && !isInBox(row, col, number);
}


printBoard();
console.log(sol);
