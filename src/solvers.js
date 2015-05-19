/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  var columnToPlace;

  // debugger;

  // must pass in a row and column that is not currently occupied
  // tests if current passed in row and column has any rook conflicts
  var rookConflicts = function(rowIndex, columnIndex) {
    solution.togglePiece(rowIndex, columnIndex);

    if (solution.hasAnyRowConflicts() ||
        solution.hasAnyColConflicts()) {
      solution.togglePiece(rowIndex, columnIndex);
      return true;
    } else {
      solution.togglePiece(rowIndex, columnIndex);
      return false;
    }
  };

  // finds an empty column given a board and rowIndex
  // pass in entire row
  // check if has any conflicts && horizontal && and vertical
  // ASSUME THE ROW IS EMPTY
  var findEmptyColumn = function(rowIndex) {
    // iterate over each column
    for (var j = 0; j < n; j++) {
      if (rookConflicts(rowIndex, j) === false) {
        // returns column index that does not cause conflicts
        return j;
      }
    }
  };



  // iterates over each row to find a conflict-free place to put a rook
  var placeRooks = function() {
    for (var i = 0; i < n; i++) {
      columnToPlace = findEmptyColumn(i);
      solution.togglePiece(i, columnToPlace);
    }
  };

  placeRooks();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  // returns an array of arrays of the solution board object
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  // for now, store an array of each row and column that has been tried
  // on each row, check if the current value has already been implemented with the current previous rows
  //   WHILE CHECKING FOR CONFLICTS
  //    how to end the checks? some sort of null or undefined?
  // pass in the data object containing what was already tried into find n rooks solution (add parameters)

  // generate all possible boards, then check which ones pass?

  var solution = new Board({n: n});


  var rookConflicts = function(rowIndex, columnIndex) {
    solution.togglePiece(rowIndex, columnIndex);

    if (solution.hasAnyRowConflicts() ||
        solution.hasAnyColConflicts()) {
      solution.togglePiece(rowIndex, columnIndex);
      return true;
    } else {
      solution.togglePiece(rowIndex, columnIndex);
      return false;
    }
  };


  // recursive solution
  // if we hit the end of a row, we have all of the possible solutions for the row state above the current row
  // work from the bottom up, stepping towards the end of the row
  // separate the problem into smaller pieces after creating the diagonal solution

  var workingBoard = new Board(findNRooksSolution(n));


  var makeBoard = function(row, column){
    // broken, probably increments count when off the board
    if ( solution.hasAnyRowConflicts() === false &&
          solution.hasAnyColConflicts() === false) {
      solutionCount++;
    }

    if (column === n) {
      row++;
      column = 0;
    }
    if (row === n) {

    }
    if (rookConflicts(row, column) === false) {
      solution.togglePiece(row, column);
    }
  };


  // clears all rows below current row
  var clearLowerRows = function(currentRow) {
    for (var i = currentRow; i < n; i++) {
      for (var j = 0; j < currentRow.length; j++) {
        if (solution.get(i)[j] === 1) {
          solution.togglePiece(i, j);
        }
      }
    }
  };




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
