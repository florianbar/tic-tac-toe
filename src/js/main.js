class TicTacToe {
    
    constructor() {
        this.playerMoves = 0;
        this.winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        this.grid = [0,0,0,0,0,0,0,0,0]; // 0 => default, 1 => player, 2 => computer
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        $('.grid__cell').click((e) => {
            let $el = $(e.currentTarget);
            let cell = $el.attr('data-cell');

            if (this.grid[cell] == 0) {
                this.updateGrid(1, cell);
                this.playerMoves++;
                this.computerPlay();
            }
        });

        $('#restart').click(() => {
            this.resetGame();
        }); 
    };

    computerPlay() {

        if (this.playerMoves == 1) 
        {
            //Randomly select a cell
            var cell = this.getRandomCell();
            this.updateGrid(2, cell);
        }
        else if (this.playerMoves == 2) 
        {
            var usersWinningCombo = this.getWinningComboForPlayer(1);

            //Defend if the user has a chance to win
            if (usersWinningCombo > -1) 
            {
                var cell = this.getDefendingCell( usersWinningCombo );
                this.updateGrid(2, cell);
            } 
            //Otherwise compete
            else 
            {
                var computerWinningCombo = this.getWinningComboForPlayer(2);

                if (computerWinningCombo > -1) 
                {
                    var cell = this.getDefendingCell( computerWinningCombo );
                    this.updateGrid(2, cell); 
                }
                else
                {
                    //Random
                    var cell = this.getRandomCell();
                    this.updateGrid(2, cell);
                }
            }
        }
        else 
        {
            //Randomize the strategy for the next move
            // 0 => defend, 1 => compete, 2 => random
            var strategy = Math.floor(Math.random() * 3);

            switch (strategy) 
            {
                //Defend
                case 0:
                    var usersWinningCombo = this.getWinningComboForPlayer(1);

                    if (usersWinningCombo > -1) 
                    {
                        var cell = this.getDefendingCell( usersWinningCombo );
                        this.updateGrid(2, cell);
                    } 
                    else 
                    {
                        //If computer can't defend, randomize strategy again
                        this.computerPlay();
                    }

                    break;

                //Compete
                case 1:
                    var computerWinningCombo = this.getWinningComboForPlayer(2);

                    if (computerWinningCombo > -1) 
                    {
                        var cell = this.getDefendingCell( computerWinningCombo );
                        this.updateGrid(2, cell);
                    }
                    else 
                    {
                        //If computer can't compete, randomize strategy again
                        this.computerPlay();
                    }

                    break;

                //Random
                default:
                    var cell = this.getRandomCell();
                    this.updateGrid(2, cell);
            }
        }
    }

    getEmptyCells() {
        var emptyCells = [];

        for (var i = 0; i < this.grid.length; i++) {
            if (this.grid[i] == 0) {
                emptyCells.push(i);
            }
        }

        return emptyCells;
    }

    getRandomCell() {
        var emptyCells = this.getEmptyCells();

        //Check if there are any empty cells
        if (emptyCells.length > 0) {
            var cellIndex;

            //Choose a random cell that's empty
            while (this.grid[cellIndex] != 0) {
                cellIndex = Math.floor(Math.random() * this.grid.length);
            }

            return cellIndex;
        }
    }

    getDefendingCell(combo) {
        var winningCombo = this.winningCombos[combo];

        //Find the empty cell in the winning combo
        for (var i = 0; i < winningCombo.length; i++) {
            if (this.grid[ winningCombo[i] ] == 0) {
                return winningCombo[i];
            }
        }

        return -1;
    }

    getWinningComboForPlayer(player) {
        var playerCells = this.getPlayerCells(player);

        //Loop through each winning combo...
        for (var i = 0; i < this.winningCombos.length; i++) {

            var correct = 0;

            //...and look at each number in that winning combo
            for (var ii = 0; ii < this.winningCombos[i].length; ii++) {

                //...and compare that with the player's numbers
                for (var iii = 0; iii < playerCells.length; iii++) {

                    if (this.winningCombos[i][ii] == playerCells[iii]) {
                        correct++;
                    }

                    //If 2 are correct, that means the player has a chance to win
                    if (correct == 2) {
                        var otherPlayerCells = this.getOtherPlayerCellsFromCombo(player, this.winningCombos[i]);

                        if (otherPlayerCells.length == 0) {
                            return i;
                        }
                    }
                }
            }

        }

        return -1;
    }

    getOtherPlayerCellsFromCombo(player,combo) {
        var cells = [];

        for (var i = 0; i < combo.length; i++) {
            var cell = this.grid[combo[i]];

            if (cell != 0 && cell != player) {
                cells.push(combo[i]);
            }
        }

        return cells;
    }

    getPlayerCells(player) {
        var cells = [];

        //Check which cells belong to the player
        for (var i = 0; i < this.grid.length; i++) {
            if (this.grid[i] == player) {
                cells.push(i);
            }
        }

        return cells;
    }

    resetGame() {
        this.playerMoves = 0;
        this.grid = [0,0,0,0,0,0,0,0,0];

        $('.grid__cell')
            .removeClass('grid__cell--x')
            .removeClass('grid__cell--o');
    }

    updateGrid(player, cell) {
        this.grid[cell] = player;
        var className = (player == 1)? 'grid__cell--x' : 'grid__cell--o';
        $('.grid__cell[data-cell="' + cell + '"]').addClass(className);
    }

}


$(() => {

    let ticTacToe = new TicTacToe();

});