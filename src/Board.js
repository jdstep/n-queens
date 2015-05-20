// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // linear time with respect to the length of the row
    hasRowConflictAt: function(rowIndex) {

      var alreadyFound = false;
      var rowConflictFound = false;
      var currentRow = this.get(rowIndex);

      // iterate over the array that represents the row
      for (var i = 0; i < currentRow.length; i++) {
        // if there is a given piece on there
        if (currentRow[i] === 1) {
          // and a piece was already found in this row, report the conflict
          if (alreadyFound) {
            rowConflictFound = true;
          }
          alreadyFound = true;
        }
      }

      return rowConflictFound;
    },

    // test if any rows on this board contain conflicts
    // n^2 time with respect to length of board
    hasAnyRowConflicts: function() {
      var numCols = this.get('n');
      var rowConflictFound = false;

      // passes in each row of the board into hasRowConflictAt
      for (var i = 0; i < numCols; i++) {
        if (this.hasRowConflictAt(i)) {
          rowConflictFound = true;
        }
      }

      return rowConflictFound;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // linear with respect to length of board
    hasColConflictAt: function(colIndex) {
      var numRows = this.get('n');
      var alreadyFound = false;
      var colConflictFound = false;
      var currentRow;

      // iterates over the rows
      for (var i = 0; i < numRows; i++) {
        // looks at current row
        currentRow = this.get(i);
        // if the given column has more than one piece, report a conflict was found
        if (currentRow[colIndex] === 1) {
          if (alreadyFound) {
            colConflictFound = true;
          }
          alreadyFound = true;
        }
      }

      return colConflictFound;
    },

    // test if any columns on this board contain conflicts
    // linear with respect to length of board
    hasAnyColConflicts: function() {

    // get number of columns
    var numColumns = this.get('n');
    var colConflictFound = false;

    // iterate over columns
    for (var i = 0; i < numColumns; i++){
      if (this.hasColConflictAt(i)) {
        colConflictFound = true;
      }
    }

      return colConflictFound;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(pieceRow, pieceColumn) {
      var numRows = this.get('n');
      // holds the current row in the iteration loop
      var currentRow;
      var columnToCheck;
      var pieceColumn;
      var columnDifference;

      // finds the absolute value between two given numbers
      var findDifference = function(a, b){
        return Math.abs(a-b);
      };

      for (var i = 0; i < numRows; i++) {

        currentRow = this.get(i);

        // calculates the difference between the original piece's column, and the column
        // that a potential conflict piece is on
        columnDifference = findDifference(pieceRow, i);

        if (i === pieceRow) {
          continue;
        }

        // if the current row is above pieceRow
        if (i < pieceRow) {
          // col to check is pieceColumn - findDiff
          columnToCheck = pieceColumn - columnDifference;
        }

        if (i > pieceRow) {
          // col to check is pieceColumn + findDiff
          columnToCheck = pieceColumn + columnDifference;
            // note: might return undefined for possible error
        }

        if (currentRow[columnToCheck] === 1) {
          return true;
        }

      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    // n^2 with respect to length of board
    hasAnyMajorDiagonalConflicts: function() {
      var conflictFound = false;
      var numRows = this.get('n');
      var currentRow;

      // look over the rows with a double for loop for any  (possible constant time access here later)
      for (var i = 0; i < numRows; i++){
        // look at the current row
        currentRow = this.get(i);
        // check each column
        for (var j=0; j < currentRow.length; j++) {
          // if there is a piece
          if (currentRow[j] === 1){
            // check to see if it has any diagnol conflicts
            // by passing in row and column and row of the found piece
            if (this.hasMajorDiagonalConflictAt(i, j)) {
              conflictFound = true;
            }
          }
        }
      }

      return conflictFound;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // linear with respect to length of board
    hasMinorDiagonalConflictAt: function(pieceRow, pieceColumn) {

      var numRows = this.get('n');
      // holds the current row in the iteration loop
      var currentRow;
      var columnToCheck;
      var pieceColumn;
      var columnDifference;

      // finds the absolute value between two given numbers
      var findDifference = function(a, b){
        return Math.abs(a-b);
      };

      for (var i = 0; i < numRows; i++) {

        currentRow = this.get(i);

        // calculates the difference between the original piece's column, and the column
        // that a potential conflict piece is on
        columnDifference = findDifference(pieceRow, i);

        // debugger;

        if (i === pieceRow) {
          continue;
        }

        // if the current row is above pieceRow
        if (i < pieceRow) {
          // col to check is pieceColumn - findDiff
          columnToCheck = pieceColumn + columnDifference;
        }
        // if the current row is below pieceRow
        if (i > pieceRow) {
          // col to check is pieceColumn + findDiff
          columnToCheck = pieceColumn - columnDifference;
            // note: might return undefined for possible error
        }

        if (currentRow[columnToCheck] === 1) {
          return true;
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    // n^2 time with respect to the length of the board
    hasAnyMinorDiagonalConflicts: function() {
      var conflictFound = false;
      var numRows = this.get('n');
      var currentRow;

      // look over the rows with a double for loop for any  (possible constant time access here later)
      for (var i = 0; i < numRows; i++){
        // look at the current row
        currentRow = this.get(i);
        // check each column
        for (var j=0; j < currentRow.length; j++) {
          // if there is a piece
          if (currentRow[j] === 1){
            // check to see if it has any diagnol conflicts
            // by passing in row and column and row of the found piece
            if (this.hasMinorDiagonalConflictAt(i, j)) {
              conflictFound = true;
            }
          }
        }
      }

      return conflictFound;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
