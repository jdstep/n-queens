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
  var solutionCount = undefined; //fixme




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
