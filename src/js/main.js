var playerMoves = 0;
var winningCombos = [
    [0,1,2], //1st horizontal
    [3,4,5], //2nd horizontal
    [6,7,8], //3rd horizontal
    [0,3,6], //1st vertical
    [1,4,7], //2nd vertical
    [2,5,8], //3rd vertical
    [0,4,8], //diagonal - top left to bottom right
    [2,4,6]  //diagonal - top right to bottom left
];

// 0 => default, 1 => player, 2 => computer
var grid = [
    0,0,0,
    0,0,0,
    0,0,0
];

function computerPlay() {
    switch (playerMoves) {
        case 1:
            //Choose randomly
            var randomCell = getRandomCell();
            grid[randomCell] = 2;
            $('.grid__cell[data-cell="' + randomCell + '"]').addClass('grid__cell--o');
            break;

        case 2:
            //Either defend if user has a chance  
            //or compete if not
            var usersWinningCombo = getWinningComboFromPlayer(1);

            //Defend if the user has a chance to win
            if (usersWinningCombo > -1) {
                var defendingCell = getDefendingCell( usersWinningCombo );
                grid[defendingCell] = 2;
                $('.grid__cell[data-cell="' + defendingCell + '"]').addClass('grid__cell--o');
            }
            //Otherwise try to compete
            else {
                //random!!!!!
                var randomCell = getRandomCell();
                grid[randomCell] = 2;
                $('.grid__cell[data-cell="' + randomCell + '"]').addClass('grid__cell--o');
            }

            break;

        default:
            //random or compete
            //random!!!!!
            var randomCell = getRandomCell();
            grid[randomCell] = 2;
            $('.grid__cell[data-cell="' + randomCell + '"]').addClass('grid__cell--o');
    }

    //if player has only played once
        //choose random location
    //if player has played twice
        //and it's lined up
            //defend
        //otherwise
            //try to win
    //if player has played more than twice
        //either choose to win or defend


    // for (let row = 0; row < grid.length; row++) {
    //     for (let col = 0; col < grid[row].length; col++) {

    //     }
    // }
}

function getRandomCell() {
    var cellIndex;

    //Choose a random cell that's empty
    while (grid[cellIndex] != 0) {
        cellIndex = Math.floor(Math.random() * grid.length);
    }

    return cellIndex;
}

function getDefendingCell(combo) {
    var winningCombo = winningCombos[combo];

    //Find the empty cell in the winning combo
    for (var i = 0; i < winningCombo.length; i++) {
        if (grid[ winningCombo[i] ] == 0) {
            return winningCombo[i];
        }
    }
}

function getWinningComboFromPlayer(player) {
    var playerCells = [];
    
    //Check which cells belong to the player
    for (var i = 0; i < grid.length; i++) {
        if (grid[i] == player) {
            playerCells.push(i);
        }
    }

    //Loop through each winning combo...
    for (var i = 0; i < winningCombos.length; i++) {

        var correct = 0;

        //...and look at each number in that winning combo
        for (var ii = 0; ii < winningCombos[i].length; ii++) {

            //...and compare that with the player's numbers
            for (var iii = 0; iii < playerCells.length; iii++) {

                if (winningCombos[i][ii] == playerCells[iii]) {
                    correct++;
                }

                //If 2 are correct, that means the player has a chance to win
                if (correct > 1) {
                    console.log(i);
                    return i;
                }
            }
        }

    }

    console.log(-1);
    return -1;
}


$(function() {

    $('.grid__cell').click(function() {
        var $el = $(this);
        var cell = $el.attr('data-cell');
        
        if (grid[cell] == 0) {
            $el.addClass('grid__cell--x');
            grid[cell] = 1;
            playerMoves++;

            //getWinningComboFromPlayer(1);
            computerPlay();
        }
    });

});